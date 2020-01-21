<br>
<br>
<br>

**Op** — Is a simple and pretty utility to abort operations 🚏

<br>
<br>
<br>

---

## Reason
<br>
It can be used to cancel all types of asynchronous operations, since the conventional mechanisms like promises, does not have a way to do it.

<br>

The other reason why you can use this small library is, for example [p-cancelable](https://github.com/sindresorhus/p-cancelable) is cool, but have a few problems when used in promises that return other promises, 
or in other espesific contexts. 
**ope-abort**, is totally agnostic to the logic of a promise and this makes it simpler to clearer and avoid side effects.

<br>
<br>

## Install

```
$ npm install ope-abort
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
function createOperationAbort(): OperationAbort // This returns the next methods and properties
```

### Is invoked when u want cancel the operation
```ts
function abort(reason?: string): void
```

### Is defined and invoked before of abort any operation
```ts
function onAbort(fn: (...args: any[]) => any): void
```

### Shows the state of current operation abort controller 
```ts
state: {
    aborted: boolean // default false, state of abort operation
    , reason: string // default null, reason of abortion
}
```

