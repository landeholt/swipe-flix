import sb from './supabase'
import { Session, User } from '@supabase/supabase-js'
import { useEffect, useMemo, useState } from 'react'
import { dev } from '../utils/guard'

interface Result {
    user: User | null;
    error: Error | null;
}

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

export function useSignIn (email: string, password: string) {
    const [loading, setLoading] = useState<boolean | null>(null)
    const [result, setResult] = useState<Result | null>(null)

    useEffect(() => {
        async function signIn() {
            try {
                setLoading(true)
                const {user, error} = await sb.auth.signIn({
                    email,
                    password
                })
                setResult({user, error})
                setLoading(false)
            } catch (error) {
                setLoading(null)
                dev.error(error)
            }
        }

        if (email && password) {
            signIn()
        }
        return () => {
            setLoading(null)
            setResult(null)
        }
    }, [email, password])

    return {
        loading,
        user: result?.user ?? null,
        error: result?.error ?? null
    }
}

export function useSignOut () {
    const {session, user} = useSession()

    useEffect(() => {

        async function signOut (user: boolean, session: Session) {
            try {
        
                if (!user) {
                    throw new Error("Invalid action")
                }
        
                if (session) {
                    const {error} = await sb.auth.signOut()
                    if (error) {
                        throw error
                    }
                }
            } catch (error) {
                dev.error(error)
            }
        }
        if (user && session) {
            signOut(user, session)
        }
    }, [user])
    

}