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

##API

### Is invoked when u want cancel the operation
```ts
abort(reason?: string): void
```

### Is defined and invoekd before of abort any operation
```ts
onAbort(fn: (...args: any[]) => any): void
```

### Shows the state of current operation controller 
```ts
state: {
    aborted: boolean // default false, state of abort operation
    , reason: string // default null, reason of abortion
}
```

