import { subDays } from "date-fns";
import _ from "lodash";
import { nanoid } from "nanoid/non-secure";
import { IChat } from "../providers/state";
import { generateConversation } from "./chat";
import { createProfile } from "./profile";

const now = new Date();

interface DefaultMatch {
  id: string;
  owner: number[];
  isFresh: Record<number, boolean>;
  matched_at: Date;
}

function generateMatchesFromProfiles(n: number) {
  return _.times(n, createProfile).map((p) => {
    const other = _.random(0, 1);
    const owner = [p.id, other];
    return {
      ...p,
      owner,
      isFresh: true,
      conversation:
        _.random(0, 10) > 7 ? generateConversation(p.id, other) : null,
      matched_at: subDays(now, _.random(2, 8)),
    };
  });
}

export function getAllMatches(owner: number) {
  const matches = generateMatchesFromProfiles(8);
  const correctMatches = _.filter(matches, (p) => p.owner.includes(owner));
  return correctMatches;
}
