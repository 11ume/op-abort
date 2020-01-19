<h1> Simple and pretty utility to abort operations

## Install

```
$ npm install
```

## Usage
<br>

> Create a promise that can be canceled

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