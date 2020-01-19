type State = {
    aborted: boolean
    , reason: string
}

export type Oa = {
    abort: (reason?: string) => void
    , onAbort: (fn: (...args: any[]) => any) => void
    , state: State
}

declare function oa(): Oa
export default oa
