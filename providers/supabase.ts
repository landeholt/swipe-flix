import AsyncStorage from "@react-native-async-storage/async-storage"
import {createClient} from "@supabase/supabase-js"
import {REST_BACKEND, REST_SECRET} from "@env";

function init() {
    const backend = REST_BACKEND
    const secret = REST_SECRET

    if (!backend || !secret) {
        throw new Error("Invalid environment")
    }
    return createClient(backend, secret, {
        localStorage: AsyncStorage
    })
}

export default init()