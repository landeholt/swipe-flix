import sb from './supabase'
import { Session } from '@supabase/supabase-js'
import { useEffect, useMemo, useState } from 'react'
import { dev } from '../utils/guard'



export function useSession() {
    const [session, setSession] = useState<Session | null>(null)
    const user = useMemo(() => session ? true : false, [session])
    const loading = useMemo(() => user === null ? true : false, [user])
    
    useEffect(() => {
        const session = sb.auth.session()
        
        setSession(session)

        const {data: authListener } = sb.auth.onAuthStateChange(async function (event, session) {
            dev.log(`Supabase auth event: ${event}`)
            setSession(session)
        })
        
        return () => {
            authListener!.unsubscribe();
        }
    }, [user])

    return {
        loading,
        user,
        session
    }

}