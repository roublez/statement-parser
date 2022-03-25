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
     * Gets the file's client extension
     * @returns The file's client extension
     */
    clientExtension(): string;
}
