import { subMinutes } from "date-fns";
import _ from "lodash";
import { nanoid } from "nanoid/non-secure";
import { getUserId } from "../utils/user";
import { getOtherUsers, getUser } from "./user";

const now = new Date();

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

/*const CHATS = [
  {
    id: 0,
    owners: [0, 1],
    conversation: [
      {
        id: nanoid(),
        content: "Hej",
        sent_by: 0,
        sent_at: subMinutes(now, 63),
      },
      {
        id: nanoid(),
        content: "Tja!",
        sent_by: 1,
        sent_at: subMinutes(now, 34),
      },
      {
        id: nanoid(),
        content: "Så vi verkar tycka om romcoms, vilken är din favorit?",
        sent_by: 1,
        sent_at: subMinutes(now, 19),
      },
      {
        id: nanoid(),
        content: "Vad som helst som Julia Roberts är med i!",
        sent_by: 0,
        sent_at: subMinutes(now, 2),
      },
      {
        id: nanoid(),
        content: "HON ÄR BÄST!!",
        sent_by: 1,
        sent_at: subMinutes(now, 1),
      },
    ],
  },
];
*/

export function generateConversation(me: number, other: number) {
  return {
    id: nanoid(),
    owner: [me, other],
    content: [
      {
        id: nanoid(),
        message: "Hej",
        sent_by: me,
        sent_at: subMinutes(now, 63),
      },
      {
        id: nanoid(),
        message: "Tja!",
        sent_by: other,
        sent_at: subMinutes(now, 34),
      },
      {
        id: nanoid(),
        message: "Så vi verkar tycka om romcoms, vilken är din favorit?",
        sent_by: other,
        sent_at: subMinutes(now, 19),
      },
      {
        id: nanoid(),
        message: "Vad som helst som Julia Roberts är med i!",
        sent_by: me,
        sent_at: subMinutes(now, 2),
      },
      {
        id: nanoid(),
        message: "HON ÄR BÄST!!",
        sent_by: other,
        sent_at: subMinutes(now, 1),
      },
    ],
  };
}
