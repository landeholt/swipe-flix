import sb from "./supabase";
import * as Linking from "expo-linking";
import {
  Session,
  SupabaseClient,
  User,
  UserAttributes,
} from "@supabase/supabase-js";
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
import { nanoid } from "nanoid/non-secure";
import { defaultUserMetadata } from "../types/supabase";

interface Result {
  user: User | null;
  error: Error | null;
  session?: Session | null;
  otp?: string;
}

export function useAuth() {
  return useContext(AuthContext);
}
// Partial<defaultUserMetadata>
export function useSetMetadata() {
  return (metadata: Record<string, unknown>) => {
    try {
      sb.auth.update({ data: metadata });
    } catch (error) {}
  };
}

type ReturnSignIn = [Result | null, (email: string, password: string) => void];

export function useSignIn(): ReturnSignIn {
  const [state, setState] = useState<Result | null>(null);

  const callback = useCallback(
    async function (email: string, password: string) {
      const { error, user, session } = await sb.auth.signIn({
        email: email.toLowerCase() + "@kth.se",
        password,
      });
      setState({ error, user, session });
    },
    // when I had sb as dependency, react said I had to unsubcribe, but to what effect?
    []
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
      email = email.toLowerCase();

      const name = await kthRegistry(email);
      const redirectTo = Linking.createURL("create-profile");
      const otp = nanoid();
      console.log(otp);
      const { error, session, user } = await sb.auth.signUp(
        {
          email: email + "@kth.se",
          password: otp,
        },
        {
          redirectTo,
          data: {
            name,
          },
        }
      );
      setState({ error, session, user, otp });
    },
    [sb]
  );
  return [state, callback];
}
