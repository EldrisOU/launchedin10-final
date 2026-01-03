// Configuration for LaunchedIn10 Portal

const SUPABASE_URL = 'https://acheexsffdcuzidpiwbh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjaGVleHNmZmRjdXppZHBpd2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMjU3MDAsImV4cCI6MjA4MjYwMTcwMH0._RH5vbfRy-v8iHzZkir1oS-aw-uzmmC7dUfgt8Bae1I';
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51RO11WEpuI6rlR2gRiShesN3FavaCulPn6c8FVdx6gVxBZMXzBDPNGEeyG1TmyHgvngktY4fYFw4Fb6qBJOdwF9m00xGiHi6t3';

// Initialize Supabase Client
let client;
if (typeof createClient !== 'undefined') {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else if (window.supabase && window.supabase.createClient) {
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Global Assignment (overwriting library namespace with client instance)
if (client) {
    window.supabase = client;
    window.sb = client;
    console.log("Supabase Client Initialized:", !!client);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_PUBLISHABLE_KEY, supabase: client };
}
