type State = {
    aborted: boolean
    , reason: string
}

type AbortController = {
    abort: (reason?: string) => void
    , onAbort: (fn: (...args: any[]) => any) => void
    , state: State
}

declare function abortController(): AbortController
export = abortController
