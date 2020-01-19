<h1> Simple pretty utility to abort operations like promises
<h2> Examples:

> Create a promise that can be canceled

## Install

```
$ npm install
```

## Usage

```js
    const abortController = require('abortController')
    const display = (each, ac) => new Promise((resolve) => {
        const clear = setInterval(() => console.log('foo'), each)
        ac.onAbort(() => {
            clearInterval(clear)
            resolve()
        })
    })

    const ac = abortController()
    display(1000, ac)
    setTimeout(ac.abort, 4000)
```