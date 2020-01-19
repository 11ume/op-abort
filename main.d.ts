type State = {
    aborted: boolean
    , reason: string
}

type Oa = {
    abort: (reason?: string) => void
    , onAbort: (fn: (...args: any[]) => any) => void
    , state: State
}

declare function oa(): Oa
export = oa
