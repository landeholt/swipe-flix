import _ from "lodash";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import * as chat from "../models/chat";
import { getUser } from "../models/user";

interface RegisterInterface {
  id: string | null;
  validated: boolean | null;
  email: string | null;
  otp: string | null; // EXTREMELY BAD PRACTICE!!!
}

interface IConversation {
  content: string;
  sent_by: number;
  sent_at: Date;
}
interface IChat {
  id: number;
  owners: number[];
  conversation: IConversation[];
}

export interface IMatch {
  id: string;
  matchId: number;
  isFresh: boolean;
  matched_at: Date;
}
interface UserInterface {
  id: null | string;
  chats: IChat[];
  matches: IMatch[];
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
    chats: [],
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

export interface ExtendedMatch extends IMatch {
  name: string;
  image: {
    src: any;
  };
}

export const matchStore = selector<ExtendedMatch[]>({
  key: "SELECTOR/MATCHES",
  get: ({ get }) => {
    const user = get(userStore);
    return user.matches.map(matchMapper);
  },
  set: ({ set }, newMatches) => {
    const _newMatches = newMatches as ExtendedMatch[];
    const matches = _newMatches.map((p) => _.omit(p, ["image", "name"]));
    set(userStore, (state) => ({ ...state, matches }));
  },
});

export const chatStore = selector({
  key: "SELECTOR/CHATS",
  get: ({ get }) => {
    const user = get(userStore);
    return user.chats.map((p) => {
      const [otherUser] = p.owners.filter((o) => o.toString() !== user.id);
      return {
        ...p,
        recipient: getUser(otherUser),
      };
    });
  },
});

export const chatMetaStore = selector({
  key: "SELECTOR/CHATMETA",
  get: ({ get }) => {
    const chats = get(chatStore);
    return chats.map((p) => {
      const lastConversation = _.last(p.conversation);

      return {
        id: p.id,
        message: lastConversation?.content,
        sent_at: lastConversation?.sent_at,
        recipient: p.recipient,
      };
    });
  },
});

export const navigationStore = atom({
  key: "ATOM/NAVIGATION",
  default: {
    showBottomTab: true,
  },
});
