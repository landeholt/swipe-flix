import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export interface defaultUserMetadata {
  name: string | null;
  profile_id: string;
}
/*
export interface UserInterface {
  app_metadata: Record<string, unknown>;
  aud: "authenticated" | string | null;
  confirmation_sent_at: Date | string;
  confirmed_at: Date | string | null;
  created_at: Date | string;
  email: string;
  email_change_confirm_status: 0;
  email_confirmed_at: Date | string;
  id: string;
  last_sign_in_at: Date | string;
  phone: string | null;
  role: "authenticated" | string | null;
  updated_at: Date | string;
  user_metadata: defaultUserMetadata;
}

export interface SessionInterface {
  access_token: string;
  expires_at: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: UserInterface | null;
}*/

export interface AuthInterface {
  loading: boolean | null;
  session: Session | null;
  user: boolean | null;
  event: AuthChangeEvent | null;
}
