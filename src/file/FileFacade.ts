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
     * Gets the file's client extension
     * @returns The file's client extension
     */
    public clientExtension () : string {
        const lastComponent = this.originalFile.name.split('.').pop();
        if (! lastComponent) {
            return this.originalFile.name.toLowerCase();
        }

        return lastComponent.toLowerCase();
    }
}
