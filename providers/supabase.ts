import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { REST_API, ANON_PUBLIC } from "@env";
import { dev } from "../utils/guard";

function init() {
  const restApiUrl = REST_API;
  const secret = ANON_PUBLIC;

  if (!restApiUrl || !secret) {
    throw new Error("Invalid environment");
  }
  const client = createClient(restApiUrl, secret, {
    localStorage: AsyncStorage,
  });
  dev.log("Supabase client initiated");
  return client;
}

export default init();
