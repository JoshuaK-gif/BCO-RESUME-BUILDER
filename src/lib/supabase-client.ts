import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url === 'http://localhost:54321') {
    // Return a minimal client stub during build/SSG when env vars are unavailable
    return createBrowserClient(
      url || 'http://localhost:54321',
      key || 'placeholder-anon-key'
    );
  }

  return createBrowserClient(url, key);
}
