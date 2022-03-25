import ParsableFile from '../file/ParsableFile';
export default class Parser {
    static parseAll(dataTransfer: DataTransfer): Array<ParsableFile>;
    /**
     * Gets the dedicated parsable file for the transfer file
     * @param file The original transfer file
     * @returns The parsable file object
     */
    static dedicatedParsableFile(file: File): ParsableFile;
}
