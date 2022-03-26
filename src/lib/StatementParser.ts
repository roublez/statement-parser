import { InvalidDataTransferError } from '../errors/InvalidDataTransferError';
import { UnsupportedFileTypeError } from '../errors/UnsupportedFileTypeError';
import FileFacade from '../file/FileFacade';
import ParsableFile, { SupportedFileType } from '../file/ParsableFile';
import CSVParsableFile from './CSVParsableFile';
import PDFParsableFile from './PDFParsableFile';

/**
 * The entity type of the files to parse.
 */
export enum EntityType {
    bankStatement,
    portfolioActivity
}

/**
 * The statement parser is responsible for preparing the and managing the files that need to be parsed.
 */
export default class StatementParser {

    /**
     * The entity type of the files to parse.
     */
    private entityType: EntityType

    /**
     * The assumed locale of the files to parse.
     */
    private assumedLocale: string|null = null;

    /**
     * Constructs a new statement parser.
     * @param entityType The document type of the files to parse.
     */
    constructor (entityType: EntityType) {
        this.entityType = entityType;
        console.log(this.entityType === EntityType.bankStatement);
    }

    /**
     * Sets the assumed locale
     * @param locale The assumed locale
     */
    public setAssumedLocale (locale: string) {
        this.assumedLocale = locale;
    }

    /**
     * Gets the assumed locale
     * @returns The assumed locale
     */
    public getAssumedLocale () : string|null {
        return this.assumedLocale;
    }

    public parse (dataTransfer: DataTransfer) : Array<ParsableFile> {
        if (! dataTransfer.items) {
            throw new InvalidDataTransferError('The data transfer is missing the "items" property.', dataTransfer);
        }

        const files: Array<FileFacade> = [];
        for (var fileIndex = 0; fileIndex < dataTransfer.items.length; fileIndex++) {
            if (dataTransfer.items[fileIndex].kind !== 'file') {
                continue;
            }

            const file = dataTransfer.items[fileIndex].getAsFile() as File;
            files.push(new FileFacade(file));
        }

        const parsableFiles = files.map(file => this.dedicatedParsableFile(file));

        return parsableFiles;
    }

    /**
     * Gets the dedicated parsable file for the transfer file
     * @param file The original transfer file
     * @returns The parsable file object
     */
    private dedicatedParsableFile (file: FileFacade) : ParsableFile {
        if (file.mimeType() === SupportedFileType.csv) {
            return new CSVParsableFile(file);
        } else if (file.mimeType() === SupportedFileType.pdf) {
            return new PDFParsableFile(file);
        } else {
            throw new UnsupportedFileTypeError(`The file type [${ file.mimeType() }] is not supported.`, file);
        }
    }
}
