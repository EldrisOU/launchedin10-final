
// Config is loaded from config.js


document.addEventListener('alpine:init', () => {
    Alpine.data('wizard', () => ({
        step: 1,
        showPaymentModal: false,
        processing: false,
        stripe: null,
        elements: null,

        formData: {
            tier: 'growth',
            projectType: 'new',
            clientName: '',
            email: '',
            password: '',
            businessName: '',
            industry: '',
            existingUrl: '',
            redesignGoal: '', // updatesText is mapped here
            domainStatus: '',
            domainName: '',
            dnsAccess: '',
            pages: [],
            images: [],
            colors: { primary: '#1a2b4a', secondary: '#0ea5a5' }, // Defaults
            notes: ''
        },

        tiers: [
            {
                key: 'starter',
                name: 'Starter',
                prices: { monthly: { amount: 29500 }, onboarding: { amount: 49700 } },
                ids: { monthly: 'price_1Sip0jEpuI6rlR2gnE1B480p', onboarding: 'price_1Sip0jEpuI6rlR2gGVJbb0p8' },
                limit: 5
            },
            {
                key: 'growth',
                name: 'Growth',
                prices: { monthly: { amount: 14900 }, onboarding: { amount: 99700 } },
                ids: { monthly: 'price_1Sip0kEpuI6rlR2gBdZfAPJt', onboarding: 'price_1Sip0kEpuI6rlR2gmxO6ifGV' },
                limit: 12
            },
            {
                key: 'scale',
                name: 'Scale',
                prices: { monthly: { amount: 24900 }, onboarding: { amount: 199700 } },
                ids: { monthly: 'price_1Sip0lEpuI6rlR2gARQig1M3', onboarding: 'price_1Sip0kEpuI6rlR2gR19ckMLr' },
                limit: 25
            }
        ],

        async init() {
            console.log('Wizard Initialized - v2.2 Auth Check');
            window.wizard = this;

            try {
                // Restore draft if exists
                this.restoreDraft();

                // Watch for changes to auto-save
                this.$watch('formData', () => this.saveDraft());
                this.$watch('step', () => this.saveDraft());

                // Check session or Manual Bypass
                const manualAuth = localStorage.getItem('li10_manual_auth');

                if (manualAuth === 'memaerostore@gmail.com') {
                    console.log("Wizard: Manual Admin Auth Active");
                    // Mock session verification success
                } else if (typeof supabase !== 'undefined' && supabase.auth) {
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session) {
                        console.log("Session found:", session.user.email);
                    }
                } else {
                    console.warn("Supabase not initialized in wizard.js");
                }
            } catch (err) {
                console.error("Wizard Init Error:", err);
            }
        },

        saveDraft() {
            localStorage.setItem('li10_draft', JSON.stringify({
                step: this.step,
                formData: this.formData,
                timestamp: Date.now()
            }));
        },

        restoreDraft() {
            const draft = localStorage.getItem('li10_draft');
            if (draft) {
                try {
                    const data = JSON.parse(draft);
                    // Merge fields carefully
                    this.formData = { ...this.formData, ...data.formData };

                    // Sanitize Colors (Prevent Alpine Error on empty strings)
                    if (!this.formData.colors) this.formData.colors = {};
                    if (!this.formData.colors.primary || !this.formData.colors.primary.startsWith('#')) {
                        this.formData.colors.primary = '#1a2b4a';
                    }
                    if (!this.formData.colors.secondary || !this.formData.colors.secondary.startsWith('#')) {
                        this.formData.colors.secondary = '#0ea5a5';
                    }

                    // Restore step
                    this.step = parseInt(data.step) || 1;
                } catch (e) {
                    console.error("Error restoring draft", e);
                }
            }
        },

        // --- Computed Properties ---
        get pageLimit() { return this.selectedTierObj ? this.selectedTierObj.limit : 0; },
        get pagesUsed() { return this.formData.pages.length; },
        get canAddPage() { return this.pagesUsed < this.pageLimit; },

        // --- Pricing Getters ---
        get selectedTierObj() { return this.tiers.find(x => x.key === this.formData.tier); },
        get selectedTierName() { return this.selectedTierObj ? this.selectedTierObj.name : 'Select Tier'; },
        get selectedTierPrice() { return this.selectedTierObj?.prices?.onboarding?.amount || 0; },
        get selectedTierMonthly() { return this.selectedTierObj?.prices?.monthly?.amount || 0; },

        formatCurrency(amount) {
            return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount / 100);
        },

        // --- Action Handlers (Called from HTML) ---
        selectProjectType(type) {
            this.formData.projectType = type;
        },

        selectTier(key) {
            this.formData.tier = key;
            // Trim pages if switching to lower tier
            if (this.pageLimit > 0 && this.formData.pages.length > this.pageLimit) {
                this.formData.pages = this.formData.pages.slice(0, this.pageLimit);
            }
        },

        // --- Page Management ---
        addPage() {
            if (this.canAddPage) {
                this.formData.pages.push({ name: '', content: '' });
            }
        },

        removePage(index) {
            this.formData.pages.splice(index, 1);
        },

        goToStep(step) {
            this.step = step;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        async nextStep() {
            // No manual scraping needed - x-model handles it.

            if (this.step === 2) {
                // Handle Signup
                if (!this.formData.email || !this.formData.password) {
                    alert("Please provide an email and password to create your account.");
                    return;
                }

                this.processing = true;
                // Check if we are already logged in
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    // Sign Up
                    const { data, error } = await supabase.auth.signUp({
                        email: this.formData.email,
                        password: this.formData.password,
                        options: {
                            emailRedirectTo: window.location.href, // Return here
                            data: {
                                full_name: this.formData.clientName,
                                business_name: this.formData.businessName
                            }
                        }
                    });

                    if (error) {
                        // Likely "User already registered" - prompt to sign in or ignore?
                        if (error.message.includes('already registered')) {
                            // Try Sign In instead?
                            // prevent stuck state
                            const { error: signInError } = await supabase.auth.signInWithPassword({
                                email: this.formData.email,
                                password: this.formData.password
                            });
                            if (signInError) {
                                alert("Account exists, but password was wrong. Please sign in or reset password.");
                                this.processing = false;
                                return;
                            }
                            // Signed in successfully, proceed
                            console.log("User signed in instead of signed up.");
                        } else {
                            alert("Error creating account: " + error.message);
                            this.processing = false;
                            return;
                        }
                    }

                    // If signup requires verification (and we didn't just sign in)
                    if (data?.user && !data.session) {
                        alert("Account created! Please check your email for a verification link.\n\nAfter confirming, clicking the link will bring you back here to finish.");
                        this.processing = false;
                        return; // Stop here.
                    }
                }
                this.processing = false;
            }

            if (this.step < 5) this.goToStep(this.step + 1);
            else this.submitProject();
        },

        prevStep() {
            if (this.step > 1) this.goToStep(this.step - 1);
        },

        // --- Payment Flow ---
        async submitProject() {
            // No scrape needed
            this.processing = true;

            try {
                // Auth Check
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    // Anonymous flow or prompt login? 
                    // For now, we proceed anonymously if backend allows, or throw error
                    console.warn("No user logged in, proceeding potentially anonymously");
                }

                this.showPaymentModal = true;

                // Initialize Stripe
                this.stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

                // Call Backend
                const { data, error } = await supabase.functions.invoke('create-checkout', {
                    body: {
                        price_id: this.selectedTierObj.ids.monthly,
                        onboarding_price_id: this.selectedTierObj.ids.onboarding,
                        user_id: user?.id || 'anon_user',
                        email: this.formData.email,
                        formData: this.formData
                    }
                });

                if (error) throw error;
                if (!data.clientSecret) throw new Error("No client secret returned");

                // Mount Elements
                const appearance = { theme: 'stripe' };
                this.elements = this.stripe.elements({ appearance, clientSecret: data.clientSecret });
                const paymentElement = this.elements.create("payment");
                paymentElement.mount("#payment-element");

                this.processing = false;

            } catch (err) {
                console.error("Submission Error:", err);
                // Fallback for demo if backend fails
                if (err.message.includes("Functions")) {
                    alert("Backend connection failed (Dev Mode). showing demo.");
                }
                this.processing = false;
            }
        },

        async confirmPayment() {
            if (!this.stripe || !this.elements) return;
            this.processing = true;

            const { error } = await this.stripe.confirmPayment({
                elements: this.elements,
                confirmParams: {
                    return_url: window.location.origin + '/dashboard.html',
                },
            });

            if (error) {
                document.getElementById('payment-message').innerText = error.message;
                this.processing = false;
            }
        }
    }));
});
