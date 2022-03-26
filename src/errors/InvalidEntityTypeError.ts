export default class InvalidEntityTypeError extends Error {

    /**
     * Constructs the error message
     * @param message The error message
     */
    constructor (message: string) {
        super(message)
    }
}
