const { isRequired, isFunction, createError } = require('./utils')

const isAborted = (state) => {
    if (state.aborted) {
        throw createError('Operation aborted', 'The operation has already been aborted')
    }
}

const abort = (state) => (reason = null) => {
    isAborted()

    if (!state.handler) {
        throw createError('Handler not defined', 'The operation aborted handler must be defined frist')
    }

    state.handler()
    state.aborted = true
    state.reason = reason
}

const onAbort = (state) => (handler = isRequired('handler')) => {
    isAborted()
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