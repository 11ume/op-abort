const isFunction = (pram, name) => {
    if (!(pram instanceof Function)) {
        throw new Error(`param ${name} must be function`)
    }
}

const isRequired = (name) => {
    throw new Error(`param ${name} is required`)
}

const createError = (msg, name) => {
    const err = new Error(msg)
    err.name = name
    return err
}

module.exports = {
    isFunction
    , isRequired
    , createError
}