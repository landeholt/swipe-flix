import { atom } from "recoil";

interface RegisterInterface {
  id: string | null;
  validated: boolean | null;
  email: string | null;
  otp: string | null; // EXTREMELY BAD PRACTICE!!!
}

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
