import _ from "lodash";
import { AuthInterface } from "../types/supabase";

export function getProfileId(auth: AuthInterface | null): string | null {
  return _.get(auth, "session.user.user_metadata.profile_id", null);
}
