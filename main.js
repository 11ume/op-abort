const { isRequired, isFunction, createError } = require('./utils')

const abort = (state) => (reason = null) => {
    if (state.aborted) {
        throw createError('Operation aborted', 'The operation has already been aborted')
    }

    if (!state.handler) {
        throw createError('Handler not defined', 'The operation aborted handler must be defined frist')
    }

    state.handler()
    state.aborted = true
    state.reason = reason
}

const onAbort = (state) => (handler = isRequired('handler')) => {
    isFunction(handler, 'handler')
    state.handler = handler
}

const createAbortController = () => {
    const state = {
        aborted: false
        , reason: null
        , handler: null
    }

    const controller = {
        abort: abort(state)
        , onAbort: onAbort(state)
        , get state() {
            return {
                aborted: state.aborted
                , reason: state.reason
            }
        }
    }

    return controller
}

module.exports = createAbortController