/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  readonly VITE_BREVO_API_KEY: string;
  readonly VITE_BREVO_SENDER_EMAIL: string;
  readonly VITE_BREVO_SENDER_NAME: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_APP_URL: string;
  readonly VITE_STORAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
