import sb from "./supabase";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dev } from "../utils/guard";
import { AuthContext } from "../components/Auth";
import kthRegistry from "./kthRegistry";

interface Result {
  user: User | null;
  error: Error | null;
  session?: Session | null;
}

export function useAuth() {
  return useContext(AuthContext);
}

type ReturnSignIn = [Result | null, (email: string, password: string) => void];

export function useSignIn(): ReturnSignIn {
  const [state, setState] = useState<Result | null>(null);

  const callback = useCallback(
    async function (email: string, password: string) {
      const { error, user, session } = await sb.auth.signIn({
        email,
        password,
      });
      setState({ error, user, session });
    },
    [sb]
  );

  return [state, callback];
}

type ReturnSignOut = [Error | null, () => void];

export function useSignOut(): ReturnSignOut {
  const [state, setState] = useState<Error | null>(null);

  const callback = useCallback(
    async function () {
      const { error } = await sb.auth.signOut();
      setState(error);
    },
    [sb]
  );

  return [state, callback];
}
type ReturnSignUp = [Result | null, (email: string, password: string) => void];

export function useSignUp(): ReturnSignUp {
  const [state, setState] = useState<Result | null>(null);

  const callback = useCallback(
    async function (email: string, password: string) {
      const name = await kthRegistry(email);
      const { error, session, user } = await sb.auth.signUp(
        {
          email: email.toLowerCase() + "@kth.se",
          password,
        },
        {
          data: {
            name,
          },
        }
      );
      setState({ error, session, user });
    },
    [sb]
  );
  return [state, callback];
}
