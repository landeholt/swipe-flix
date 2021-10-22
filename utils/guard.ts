type Env = 'PRODUCTION' | 'DEVELOPMENT'
type Level = 'debug' | 'info' | 'log' | 'warn' | 'error'
type ReturnProp = (msg: any) => void
interface IConsole {
    debug: ReturnProp
    info: ReturnProp
    log: ReturnProp
    warn: ReturnProp
    error: ReturnProp
}

function msgIf (env: Env, level: Level): ReturnProp {
    return (msg: any) => {
        if (process.env.NODE_ENV === env) {
            console[level](msg)
        }
    }
    
}
const devEnv = 'DEVELOPMENT'
const prodEnv = 'PRODUCTION'
export const dev: IConsole = {
    debug: msgIf(devEnv, 'debug'),
    info: msgIf(devEnv, 'info'),
    log: msgIf(devEnv, 'log'),
    warn: msgIf(devEnv, 'warn'),
    error: msgIf(devEnv, 'error'),
}

export const prod: IConsole = {
    debug: msgIf(prodEnv, 'debug'),
    info: msgIf(prodEnv, 'info'),
    log: msgIf(prodEnv, 'log'),
    warn: msgIf(prodEnv, 'warn'),
    error: msgIf(prodEnv, 'error'),
}