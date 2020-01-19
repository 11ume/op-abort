<br>

<h2> Simple and pretty utility to abort operations 🚏
<br>
<br>

## Install

```
$ npm install op-abort
```

## Usage
<br>

> Create a promise that can be canceled

```js
    const oa = require('op-abort')
    const display = (each, ac) => new Promise((resolve) => {
        const clear = setInterval(() => console.log('foo'), each)
        ac.onAbort(() => {
            clearInterval(clear)
            resolve()
        })
    })

    const ac = oa()
    display(1000, ac)
    setTimeout(ac.abort, 4000)
```

## API

### Function contructor of operation controller
```ts
function oa(): Oa // This returns the next methods and properties
```

### Is invoked when u want cancel the operation
```ts
function abort(reason?: string): void
```

### Is defined and invoekd before of abort any operation
```ts
function onAbort(fn: (...args: any[]) => any): void
```

### Shows the state of current operation controller 
```ts
state: {
    aborted: boolean // default false, state of abort operation
    , reason: string // default null, reason of abortion
}
```

