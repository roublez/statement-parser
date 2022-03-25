export class InvalidDataTransferError extends Error {

    /**
     * The referenced data transfer
     */
    public readonly dataTransfer: DataTransfer;

    /**
     * Constructs the error message
     * @param message The error message
     * @param dataTransfer The referenced data transfer
     */
    constructor (message: string, dataTransfer: DataTransfer) {
        super(message)
        this.dataTransfer = dataTransfer
    }
}
