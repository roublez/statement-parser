export default class FileFacade {
    /**
     * The original file reference
     */
    readonly originalFile: File;
    /**
     * Constructs ths file helper
     * @param originalFile The original file reference
     */
    constructor(originalFile: File);
    /**
     * Ensures that the file is a file facade
     * @param file The file to check
     * @returns The file facade
     */
    static ensure(file: File | FileFacade): FileFacade;
    /**
     * Gets the original file's name
     * @returns The original file's name
     */
    name(): string;
    /**
     * Gets the file's client extension
     * @returns The file's client extension
     */
    extension(): string;
    /**
     * Gets the file's mime type
     * @returns The file's mime type
     */
    mimeType(): string;
}
