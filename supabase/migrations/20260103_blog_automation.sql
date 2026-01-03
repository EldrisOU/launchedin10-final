
-- Migration: Blog Automation Infrastructure
-- Created at: 2026-01-03

-- 1. Setup Storage Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Create RPC Function to call Edge Function
CREATE OR REPLACE FUNCTION public.trigger_persistence_and_rebuild()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  -- POST request to Supabase Edge Function
  -- verify_jwt is false, so no complex headers needed
  perform net.http_post(
    url := 'https://acheexsffdcuzidpiwbh.supabase.co/functions/v1/persist-blog-assets',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object('record', to_jsonb(new))
  );
  return new;
end;
$function$;

-- 3. Setup Trigger on li10_posts
DROP TRIGGER IF EXISTS on_post_change ON li10_posts;

CREATE TRIGGER on_post_change
AFTER INSERT OR UPDATE ON li10_posts
FOR EACH ROW EXECUTE FUNCTION trigger_persistence_and_rebuild();
