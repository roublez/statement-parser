import InvalidDataTransferError from '../errors/InvalidDataTransferError';
import UnsupportedFileTypeError from '../errors/UnsupportedFileTypeError';
import FileFacade from './FileFacade';
import Parsable from '../contracts/Parsable';
import CSVParsableFile from '../parsers/CSVParsableFile';
import PDFParsableFile from '../parsers/PDFParsableFile';
import SupportedFileType from '../enums/SupportedFileType';
import EntityType from '../enums/EntityType';

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

    /**
     * Parses all files in the transfer
     * @param dataTransfer The data transfer object
     * @returns The list of the parsed files
     */
    public parse (dataTransfer: DataTransfer) : Array<Parsable> {

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

        const parsables = files.map(file => this.dedicatedParsable(file));

        return parsables;
    }

    /**
     * Gets the dedicated parsable file for the transfer file
     * @param file The original transfer file
     * @returns The parsable file object
     */
    private dedicatedParsable (file: FileFacade) : Parsable {
        switch (file.mimeType()) {
            case SupportedFileType.csv: return new CSVParsableFile(file);
            case SupportedFileType.pdf: return new PDFParsableFile(file);
            default: throw new UnsupportedFileTypeError(`The file type [${ file.mimeType() }] is not supported.`, file);
        }
    }
}
