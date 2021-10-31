import { atom, selector } from "recoil";
import * as chat from "../models/chat";

interface RegisterInterface {
  id: string | null;
  validated: boolean | null;
  email: string | null;
  otp: string | null; // EXTREMELY BAD PRACTICE!!!
}

interface UserInterface {
  id: null | string;
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
  },
});

export const matchStore = selector({
  key: "SELECTOR/MATCHES",
  get: async ({ get }) => {
    const user = get(userStore);
    if (user.id) {
    }
  },
});

/*
export const chatStore = selector({
  key: "SELECTOR/CHATS",
  get: async ({ get }) => {
    const user = get(userStore);
    if (user.id) {
      const chats = await chat.findAll(user.id);
      //const incomingChats = chat.subscribe();

      return chats;
    }
  },
});
*/

export const navigationStore = atom({
  key: "ATOM/NAVIGATION",
  default: {
    showBottomTab: true,
  },
});

/*
export const newNotificationStore = selector({
  key: "SELECTOR/NOTIFICATIONS",
  get: async ({get}) => {
    //const matches = get(matchStore)
    const chats = get(chatStore)
    return {
      chat: 
    }
  }
})
*/
