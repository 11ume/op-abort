type State = {
    aborted: boolean
    , reason: string
}

export type OperationAbort = {
    abort: (reason?: string) => void
    , onAbort: (fn: (...args: any[]) => any) => void
    , state: State
}

declare function createOperationAbort(): OperationAbort
export default OperationAbortController
