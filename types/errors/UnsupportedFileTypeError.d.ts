import FileFacade from "../file/FileFacade";
export declare class UnsupportedFileTypeError extends Error {
    /**
     * The referenced file
     */
    readonly file: FileFacade;
    /**
     * Constructs the error message
     * @param message The error message
     * @param file The referenced file
     */
    constructor(message: string, file: File | FileFacade);
}
