import { subDays } from "date-fns";
import _ from "lodash";
import { nanoid } from "nanoid/non-secure";

const now = new Date();

interface DefaultMatch {
  id: string;
  owner: number[];
  isFresh: Record<number, boolean>;
  matched_at: Date;
}

const MATCHES: DefaultMatch[] = [
  {
    id: nanoid(),
    owner: [0, 1],
    isFresh: {
      0: true,
      1: false,
    },
    matched_at: subDays(now, 1),
  },
  {
    id: nanoid(),
    owner: [0, 1],
    isFresh: {
      0: false,
      1: true,
    },
    matched_at: subDays(now, 3),
  },
  {
    id: nanoid(),
    owner: [0, 1],
    isFresh: {
      0: true,
      1: false,
    },
    matched_at: subDays(now, 10),
  },
];

export function getAllMatches(owner: number) {
  return _.filter(MATCHES, (p) => p.owner.includes(owner));
}
