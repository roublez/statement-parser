import FileFacade from '../lib/FileFacade';
export declare enum SupportedFileType {
    csv = "text/csv",
    pdf = "application/pdf"
}
export default interface ParsableFile {
    /**
     * The original data transfer file
     */
    readonly file: FileFacade;
    /**
     * Parses the file to an exchangeable format
     */
    parse(): Promise<ParsableFile>;
    /**
     * Gets the parsed data of the file
     */
    data(): object;
}
