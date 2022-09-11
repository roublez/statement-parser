import InvalidDataTransferError from '../errors/InvalidDataTransferError';
import UnsupportedFileTypeError from '../errors/UnsupportedFileTypeError';
import InvalidEntityTypeError from '../errors/InvalidEntityTypeError';
import FileFacade from './FileFacade';
import ParsableFile from '../contracts/ParsableFile';
import CSVParsableFile from '../parsers/CSVParsableFile';
import PDFParsableFile from '../parsers/PDFParsableFile';
import Converter from '../contracts/Converter';
import { bankStatementCsvConverters, bankStatementPdfConverters } from '../converters';
import InvalidConverterMatchingError from '../errors/InvalidConverterMatchingError';
import BaseConverter from '../converters/BaseConverter';

const entityTypes = [
    'bankStatement',
    'portfolioActivity'
];

/**
 * The statement parser is responsible for preparing the and managing the files that need to be parsed.
 */
export default class StatementParser {

    /**
     * The entity type of the files to parse.
     */
    private entityType: string;

    /**
     * The assumed locale of the files to parse.
     */
    private assumedLocale: string|null = null;

    /**
     * Constructs a new statement parser.
     * @param entityType The document type of the files to parse.
     * @param assumedLocale The assumed locale for the document
     */
    constructor (entityType: string, assumedLocale: string|null) {
        this.entityType = entityType;
        this.assumedLocale = assumedLocale;

        if (! entityTypes.includes(this.entityType)) {
            throw new InvalidEntityTypeError(this.entityType);
        }
    }

    /**
     * Parses all files in the transfer
     * @param dataTransfer The data transfer object
     * @returns The list of the parsed files
     */
    public async parse (dataTransfer: DataTransfer) : Promise<Array<BaseConverter<ParsableFile, any, any>>> {

        //
        // Check if the data transfer object has an items property to read the files from
        if (! dataTransfer.items) {
            throw new InvalidDataTransferError('The data transfer is missing the "items" property.', dataTransfer);
        }

        //
        // Create a list of files that are supported for parsing
        const parsableFiles: Array<ParsableFile> = [];
        for (var fileIndex = 0; fileIndex < dataTransfer.items.length; fileIndex++) {

            //
            // Skip data transfer items that are not of the kind "file"
            if (dataTransfer.items[fileIndex].kind !== 'file') {
                continue;
            }

            //
            // Get the file facade wrapper
            const file = new FileFacade(dataTransfer.items[fileIndex].getAsFile() as File);

            //
            // Add the file to the list
            switch (file.mimeType()) {
                case 'text/csv': parsableFiles.push(new CSVParsableFile(file, this)); break;
                case 'application/pdf': parsableFiles.push(new PDFParsableFile(file, this)); break;
                default: throw new UnsupportedFileTypeError(`The file type [${ file.mimeType() }] is not supported.`, file);
            }
        }

        let converters: Array<BaseConverter<ParsableFile, any, any>> = [];
        for (const parsableFile of parsableFiles) {
            await parsableFile.parse();
            converters.push(this.matchConverter(parsableFile, this.entityType));
        }

        return converters;
    }

    /**
     * Gets the file converter for the parsable file
     * @param parsable The parsable file
     * @param entityType The entity type of the parsable file
     * @returns The matched converter
     */
     public matchConverter (parsable: ParsableFile, entityType: string) : BaseConverter<ParsableFile, any, any> {
        let converterTypes: Array<typeof BaseConverter> = [];

        if (parsable instanceof CSVParsableFile) {
            switch (entityType) {
                case 'bankStatement': converterTypes = bankStatementCsvConverters; break;
            }
        } else if (parsable instanceof PDFParsableFile) {
            switch (entityType) {
                case 'bankStatement': converterTypes = bankStatementPdfConverters; break;
            }
        }

        let converters = converterTypes
            .map(converterType => new converterType(parsable))
            .filter(converter => converter.canConvert());

        if (converters.length === 0 || converters.length > 1) {
            throw new InvalidConverterMatchingError(converters);
        }

        converters[0].convert();
        return converters[0];
    }
}
