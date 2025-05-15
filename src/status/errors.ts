export class LocalError extends Error {
    constructor() {
        super()
    }
}

export class NotFoundError extends LocalError {
    constructor(public message = "Not Found", public name = "NotFound") {
        super()
    }
}