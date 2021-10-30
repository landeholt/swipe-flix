import { Session, User } from "@supabase/supabase-js";
import { nanoid } from "nanoid/non-secure";

export const USERS = [
  {
    id: 0,
    name: "John Landeholt",
    email: "johnlan@kth.se",
    birth: "",
    profileId: "0",
    interests: [
      {
        label: "Netflix",
        value: "netlifx",
      },
    ],
    image: {
      src: require("../assets/viktor_morsell.jpg"),
    },
    about: "en 26 åring programmerare",
  },
  {
    id: 1,
    name: "Viktor Mörsell",
    email: "morsell@kth.se",
    birth: "",
    profileId: "1",

    interests: [
      {
        label: "HBO",
        value: "hbo",
      },
    ],
    image: {
      src: require("../assets/viktor_morsell.jpg"),
    },
    about: "Du borde flytta upp med mig till Skellefteå",
  },
];

export function getSession(id: number): Session {
  return {
    provider_token: nanoid(),
    access_token: nanoid(),
    refresh_token: nanoid(),
    token_type: "fake",
    user: getUser(id),
  };
}

export function getUser(id: number): User {
  const { id: _id, ...user_metadata } = USERS[id];

  return {
    id: id.toString(),
    app_metadata: {
      provider: "fake",
    },
    user_metadata,
    aud: "authenticated",
    confirmation_sent_at: "never",
    recovery_sent_at: "never",
    action_link: "none",
    email: user_metadata.email,
    phone: "",
    created_at: new Date().toString(),
    confirmed_at: "never",
    email_confirmed_at: "never",
    phone_confirmed_at: "never",
    last_sign_in_at: "never",
    role: "authenticated",
    updated_at: "never",
  };
}

export function getOtherUsers(id: number) {
  return USERS.filter((p) => p.id !== id);
}
