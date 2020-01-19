const abortController = require('./main')
const delay = (time, ac, fn) => new Promise((resolve) => {
    const clear = setInterval(fn, time)
    ac.onAbort(() => {
        clearInterval(clear)
        resolve()
    })
})

const ac = abortController()
delay(1000, ac, () => console.log('foo'))
setTimeout(() => {
    ac.abort('p[or que si')
    console.log(ac.state)
}, 4000)