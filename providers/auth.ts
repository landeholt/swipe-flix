import sb from './supabase'
import { Session, User } from '@supabase/supabase-js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { dev } from '../utils/guard'

interface Result {
    user: User | null;
    error: Error | null;
    session?: Session | null;
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

type ReturnSignIn = [Result | null, (email: string, password: string) => void]

export function useSignIn (): ReturnSignIn {
    const [state, setState] = useState<Result | null>(null)

    const callback = useCallback(async function(email: string, password: string) {
        const {error, user, session} = await sb.auth.signIn({
            email,
            password
        })
        setState({error, user, session})
    }, [sb])

    return [state, callback]

}

type ReturnSignOut = [Error | null, () => void]


export function useSignOut (): ReturnSignOut {

    const [state, setState] = useState<Error | null>(null)

    const callback = useCallback(async function () {
        const {error} = await sb.auth.signOut()
        setState(error)
    }, [sb])

    return [state, callback]
}
type ReturnSignUp = [Result | null, (email: string, password: string) => void]

export function useSignUp (): ReturnSignUp {

    const [state, setState] = useState<Result | null>(null)

    const callback = useCallback(
        async function (email: string, password: string) {
            const {error, session, user} = await sb.auth.signUp({
                email,
                password
            })
            setState({error, session, user})
        },
        [sb],
    )
    return [state, callback]
}