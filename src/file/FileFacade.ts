export default class FileFacade {

    /**
     * The original file reference
     */
    public readonly originalFile: File;

    /**
     * Constructs ths file helper
     * @param originalFile The original file reference
     */
    constructor (originalFile: File) {
        this.originalFile = originalFile;
    }

    /**
     * Ensures that the file is a file facade
     * @param file The file to check
     * @returns The file facade
     */
    static ensure (file: File|FileFacade) : FileFacade {
        return file instanceof FileFacade ? file : new FileFacade(file);
    }

    /**
     * Gets the file's client extension
     * @returns The file's client extension
     */
    public extension () : string {
        const lastComponent = this.originalFile.name.split('.').pop();
        if (! lastComponent) {
            return this.originalFile.name.toLowerCase();
        }

        return lastComponent.toLowerCase();
    }

    /**
     * Gets the file's mime type
     * @returns The file's mime type
     */
    public mimeType () : string {
        return this.originalFile.type;
    }
}
