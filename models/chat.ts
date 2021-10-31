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

const CHATS = [
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

export function getAllChatIDs(id: number) {
  return _.chain(CHATS)
    .filter((p) => p.owners.includes(id))
    .map("id")
    .value();
}

export function getAllChats(owner: number) {
  return _.filter(CHATS, (p) => p.owners.includes(owner));
}

export function getChatMetadata(owner: number) {
  const ids = getAllChatIDs(owner);
  return _.chain(ids)
    .reduce((acc: IChat[], it: number) => {
      const chat: IChat | undefined = _.find(CHATS, (p) =>
        p.owners.includes(it)
      );
      if (chat) {
        return [...acc, chat];
      }
      return acc;
    }, [] as IChat[])
    .map((p) => {
      const lastConversation = _.last(p.conversation);
      const otherOwner = p.owners.find((o) => o !== owner);

      const recipient = getUser(otherOwner || 0);
      return {
        id: p.id,
        message: lastConversation?.content ?? null,
        sent_at: lastConversation?.sent_at ?? null,
        recipient,
      };
    })
    .value();
}

export function getChat(id: number) {
  return CHATS.find((p) => p.id === id);
}
