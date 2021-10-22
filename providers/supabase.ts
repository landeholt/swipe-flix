import AsyncStorage from "@react-native-async-storage/async-storage"
import {createClient} from "@supabase/supabase-js"

function init() {
    const backend = process.env.REST_BACKEND
    const secret = process.env.REST_SECRET

    if (!backend || !secret) {
        throw new Error("Invalid environment")
    }
    return createClient(backend, secret, {
        localStorage: AsyncStorage
    })
}

export default init()