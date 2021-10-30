import { SupabaseRealtimePayload } from "@supabase/supabase-js";
import sb from "../providers/supabase";
import { dev } from "../utils/guard";

// extremly bad practice to allow everyone to listen to all messages!!

const chat = sb.from("chat");

export function findAll(ownerId: string) {
  return chat
    .select("*")
    .or(`parent_left.eq.${ownerId},parent_right.eq.${ownerId}`);
}

type SubscribeCallback = (payload: SupabaseRealtimePayload<any>) => void;

export function subscribe(cb?: SubscribeCallback) {
  return sb
    .from("*")
    .on("*", (payload) => {
      console.log("inside", payload);
      //cb(payload);
    })
    .subscribe(dev.log);
}
