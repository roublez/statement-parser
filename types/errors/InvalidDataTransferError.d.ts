export default class InvalidDataTransferError extends Error {
    /**
     * The referenced data transfer
     */
    readonly dataTransfer: DataTransfer;
    /**
     * Constructs the error message
     * @param message The error message
     * @param dataTransfer The referenced data transfer
     */
    constructor(message: string, dataTransfer: DataTransfer);
}
