const test = require('ava')
const abortController = require('../main')

const intervaler = (time, ac, fn) => new Promise((resolve) => {
    const clear = setInterval(fn, time)
    ac.onAbort(() => {
        clearInterval(clear)
        resolve()
    })
})

test('test abort', async (t) => {
    let counter = 0
    const ac = abortController()
    intervaler(1000, ac, () => counter++)

    const run = () => new Promise((resolve) => {
        setTimeout(() => {
            ac.abort()
            resolve()
        }, 3000)
    })

    await run()
    t.is(counter, 2)
    t.deepEqual(ac.state, {
        aborted: true
        , reason: null
    })
})

test('test abort whit reason', async (t) => {
    const ac = abortController()
    ac.onAbort(Function)
    ac.abort('foo')
    t.is(ac.state.reason, 'foo')
})

test('test define onAbort whitout pass a parameter', async (t) => {
    const ac = abortController()
    const err = t.throws(ac.onAbort)
    t.is(err.name, 'Param is required')
    t.is(err.message, 'Param handler is required')
})

test('test define onAbort whitout pass a function', async (t) => {
    const ac = abortController()
    const err = t.throws(() => ac.onAbort(1))
    t.is(err.name, 'Param is not a function')
    t.is(err.message, 'Param handler must be function')
})

test('test abort whitout define before the handler', async (t) => {
    const ac = abortController()
    const err = t.throws(ac.abort)
    t.is(err.name, 'Abort handler not defined')
    t.is(err.message, 'The abort handler, must be defined before call abort')
})

test('test abort after invoke abort', async (t) => {
    const ac = abortController()
    ac.onAbort(Function)
    ac.abort()
    const err = t.throws(ac.abort)
    t.is(err.name, 'Operation abort')
    t.is(err.message, 'The operation has already been aborted')
})
