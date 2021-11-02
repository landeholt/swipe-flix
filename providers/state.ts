import { User } from "@supabase/supabase-js";
import set from "date-fns/set";
import _ from "lodash";
import { nanoid } from "nanoid/non-secure";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import * as chat from "../models/chat";
import { generateQueue } from "../models/profile";
import { getUser } from "../models/user";
import { upsert } from "../utils/array";

interface RegisterInterface {
  id: string | null;
  validated: boolean | null;
  email: string | null;
  otp: string | null; // EXTREMELY BAD PRACTICE!!!
}

export interface IConversation {
  message: string;
  sent_by: number;
  sent_at: Date;
}
export interface IChat {
  id: string;
  owner: number[];
  content: IConversation[];
}

export interface IMatch {
  id: string;
  matchId: number;
  isFresh: boolean;
  matched_at: Date;
}
interface UserInterface {
  id: null | string;
  matches: ExtendedMatch[];
}

export const userIdStore = atom({
  key: "ATOM/USERID",
  default: 0,
});

/**
 * Atom for register flow
 */
export const registerState = atom<RegisterInterface>({
  key: "ATOM/REGISTERFLOW",
  default: {
    id: null,
    validated: false,
    email: null,
    otp: null,
  },
});

export const userStore = atom<UserInterface>({
  key: "ATOM/USER",
  default: {
    id: null,
    matches: [],
  },
});

function matchMapper(p: IMatch) {
  const otherUser = getUser(p.matchId);
  return {
    id: p.id,
    isFresh: p.isFresh,
    matched_at: p.matched_at,
    matchId: p.matchId,
    name: otherUser.user_metadata.name,
    image: { src: otherUser.user_metadata.image.src },
  };
}

export const queueStore = atom<Profile[]>({
  key: "ATOM/QUEUE",
  default: generateQueue(),
});

export interface Profile {
  id: number;
  willLike: boolean;
  name: string;
  image: {
    src: string;
  };
  likedMovies: {
    id: number;
    title: string;
    year: string;
    runtime: string;
    genres: string[];
    director: string;
    actors: string;
    plot: string;
    posterUrl: string;
  }[];
  uniqueGenres: string[];
  statistics: {
    genres: Record<string, number>;
    directors: Record<string, number>;
    actors: Record<string, number>;
  };
  state: "UNDETERMINED" | "LIKED" | "DISLIKED";
}

export interface ExtendedMatch extends Profile {
  owner: number[];
  isFresh: boolean;
  matched_at: Date;
  conversation: IChat | null;
}

function convertToMatch(profiles: Profile[], userId: number): ExtendedMatch[] {
  return _.map(profiles, (p) => ({
    ...p,
    owner: [p.id, userId],
    isFresh: true,
    matched_at: new Date(),
    conversation: null,
  }));
}

export const matchStore = selector<ExtendedMatch[]>({
  key: "SELECTOR/MATCHES",
  get: ({ get }) => {
    const user = get(userStore);
    const savedMatches = user.matches;
    const potentialMatches = get(queueStore) as Profile[];
    const matches = potentialMatches.filter(
      (p) => p.state === "LIKED" && p.willLike
    );
    return [
      ...savedMatches,
      ...convertToMatch(matches, parseInt(user.id || "0")),
    ];
  },
  set: ({ set }, newMatches) => {
    const matches = newMatches as ExtendedMatch[];
    set(userStore, (state) => ({ ...state, matches }));
  },
});

export const chatStore = selector({
  key: "SELECTOR/CHATS",
  get: ({ get }) => {
    const matches = get(matchStore);
    const matchesWithConversations = matches.filter((p) => p.conversation);
    return matchesWithConversations;
    /*
    return user.chats.map((p) => {
      const [otherUser] = p.owners.filter((o) => o.toString() !== user.id);
      return {
        ...p,
        recipient: getUser(otherUser),
      };
    });
    */
  },
});

interface ExtendedChat extends IChat {
  recipient: User;
}

export const chatSelector = selectorFamily<ExtendedMatch | undefined, number>({
  key: "SELECTORFAMILY/CHAT",
  get:
    (id: number) =>
    ({ get }) => {
      const chats = get(chatStore);
      const selectedChat = chats.find((p) => p.id === id);
      return selectedChat;
    },
  set:
    (id: number) =>
    ({ set }, chat) => {
      set(userStore, (state) => {
        return {
          ...state,
          matches: state.matches.reduce((acc, it) => {
            if (it.id === id) {
              return [...acc, chat as ExtendedMatch];
            }
            return [...acc];
          }, [] as ExtendedMatch[]),
        };
      });
    },
});

export const chatMetaStore = selector({
  key: "SELECTOR/CHATMETA",
  get: ({ get }) => {
    const chats = get(chatStore);
    const userId = get(userIdStore);
    return chats.reduce((acc, p) => {
      if (p.conversation) {
        const lastMessage = _.last(p.conversation.content);
        const recipient = p.owner.find((o) => o !== userId);
        return [
          ...acc,
          {
            id: p.id,
            name: p.name,
            image: {
              src: p.image.src,
            },
            message: lastMessage?.message,
            sent_at: lastMessage?.sent_at,
            recipient,
          },
        ];
      }
      return [...acc];
    }, [] as any[]);
  },
});

export const navigationStore = atom({
  key: "ATOM/NAVIGATION",
  default: {
    showBottomTab: true,
  },
});

export const notificationStore = selector({
  key: "SELECTOR/NOTIFICATION",
  get: ({ get }) => {
    const matches = get(matchStore);
    const newMatches = matches.some((p) => p.isFresh);
    return {
      newMatches,
    };
  },
});

interface MatchModal {
  profile: Profile | null;
}

export const matchModalStore = atom<MatchModal>({
  key: "ATOM/MATCHMODAL",
  default: {
    profile: null,
  },
});
