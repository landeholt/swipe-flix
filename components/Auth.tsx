import {
  AuthChangeEvent,
  Session,
  SupabaseClient,
} from "@supabase/supabase-js";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import sb from "../providers/supabase";
import { AuthInterface } from "../types/supabase";
import { dev } from "../utils/guard";

interface Props {
  children: React.ReactChild;
}
interface IAuthContext {
  session: Session | null;
  user: boolean | null;
  loading: boolean | null;
}

const Auth = createContext<AuthInterface | null>(null);
Auth.displayName = "AuthProvider";

export function AuthProvider(props: Props) {
  const { children } = props;
  const [user, setUser] = useState<null | boolean>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [_event, setEvent] = useState<AuthChangeEvent | null>(null);

  const loading = useMemo(() => (user === null ? true : false), [user]);

  useEffect(() => {
    const session = sb.auth.session();

    setSession(session);
    setUser(session ? true : false);

    const { data: authListener } = sb.auth.onAuthStateChange(async function (
      event,
      session
    ) {
      dev.log(`Supabase auth event: ${event}`);
      setSession(session);
      setEvent(event);
      setUser(session ? true : false);
    });

    return () => {
      authListener!.unsubscribe();
    };
  }, [user]);

  return (
    <Auth.Provider value={{ session, user, loading, event: _event }}>
      {children}
    </Auth.Provider>
  );
}

export const AuthContext = Auth;
