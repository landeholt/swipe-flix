import _ from "lodash";
import { AuthInterface, defaultUserMetadata } from "../types/supabase";

export function getUserId(auth: AuthInterface | null): string | null {
  return _.get(auth, "session.user.id", null);
}

export function getProfileId(auth: AuthInterface | null): string | null {
  return _.get(auth, "session.user.user_metadata.profileId", null);
}

export function getMetadata(auth: AuthInterface | null): defaultUserMetadata {
  return _.get(auth, "session.user.user_metadata", {});
}

export function getFirstName(name: string) {
  const [first, ...rest] = name.split(" ");
  return first;
}
