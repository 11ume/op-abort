const { isRequired, isFunction, createError } = require('./utils')

const isAborted = (state) => {
    if (state.aborted) {
        throw createError('Operation aborted', 'The operation has already been aborted')
    }
}

const isHandlerNotDefined = (state) => {
    if (!state.handler) {
        throw createError('Handler not defined', 'The abort handler, must be defined before call abort')
    }
}

const abort = (state) => (reason = null) => {
    isAborted(state)
    isHandlerNotDefined(state)

    state.handler()
    state.aborted = true
    state.reason = reason
}

const onAbort = (state) => (handler = isRequired('handler')) => {
    isAborted(state)
    isFunction(handler, 'handler')
    state.handler = handler
}

const createAbortController = () => {
    const state = {
        aborted: false
        , reason: null
        , handler: null
    }

    return {
        abort: abort(state)
        , onAbort: onAbort(state)
        , get state() {
            return {
                aborted: state.aborted
                , reason: state.reason
            }
        }
    }
}

module.exports = createAbortController