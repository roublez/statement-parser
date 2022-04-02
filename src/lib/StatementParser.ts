import InvalidDataTransferError from '../errors/InvalidDataTransferError';
import UnsupportedFileTypeError from '../errors/UnsupportedFileTypeError';
import FileFacade from './FileFacade';
import Parsable from '../contracts/Parsable';
import CsvParsableFile from '../parsers/CsvParsableFile';
import PdfParsableFile from '../parsers/PdfParsableFile';
import SupportedFileType from '../enums/SupportedFileType';
import EntityType from '../enums/EntityType';
import Converter from '../contracts/Converter';
import { bankStatementCsvConverters, bankStatementPdfConverters } from '../converters';
import InvalidConverterMatchingError from '../errors/InvalidConverterMatchingError';
import BaseConverter from '../converters/BaseConverter';

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
    public async parse (dataTransfer: DataTransfer) : Promise<Array<Converter<any>>> {

        //
        // Check if the data transfer object has an items property to read the files from
        if (! dataTransfer.items) {
            throw new InvalidDataTransferError('The data transfer is missing the "items" property.', dataTransfer);
        }

        //
        // Create a list of the files to check for further parsing
        const files: Array<FileFacade> = [];
        for (var fileIndex = 0; fileIndex < dataTransfer.items.length; fileIndex++) {
            if (dataTransfer.items[fileIndex].kind !== 'file') {
                continue;
            }

            const file = dataTransfer.items[fileIndex].getAsFile() as File;
            files.push(new FileFacade(file));
        }

        let converters: Array<Converter<any>> = [];
        const parsables = files.map(file => this.dedicatedParsable(file));

        for (const parsable of parsables) {
            const parsed = await parsable.parse();
            converters.push(this.matchConverter(parsed, this.entityType));
        }

        return converters;
    }

    /**
     * Gets the dedicated parsable file for the transfer file
     * @param file The original transfer file
     * @returns The parsable file object
     */
    private dedicatedParsable (file: FileFacade) : Parsable {
        switch (file.mimeType()) {
            case SupportedFileType.csv: return new CsvParsableFile(file, this);
            case SupportedFileType.pdf: return new PdfParsableFile(file, this);
            default: throw new UnsupportedFileTypeError(`The file type [${ file.mimeType() }] is not supported.`, file);
        }
    }

    /**
     * Gets the file converter for the parsable file
     * @param parsable The parsable file
     * @param entityType The entity type of the parsable file
     * @returns The matched converter
     */
     public matchConverter (parsable: Parsable, entityType: EntityType) : Converter<any> {
        let converterTypes: Array<any> = [];

        if (parsable instanceof CsvParsableFile) {
            switch (entityType) {
                case EntityType.bankStatement: converterTypes = bankStatementCsvConverters; break;
            }
        } else if (parsable instanceof PdfParsableFile) {
            switch (entityType) {
                case EntityType.bankStatement: converterTypes = bankStatementPdfConverters; break;
            }
        }

        let converters = converterTypes.map(converterType => new converterType(parsable)) as Array<BaseConverter<Parsable, any, any>>;
        converters = converters.filter(converter => converter.canConvert());

        if (converters.length === 0) {
            throw new InvalidConverterMatchingError('No converter found for the given entity type');
        }

        if (converters.length > 1) {
            throw new InvalidConverterMatchingError('Multiple converters found for the given entity type');
        }

        return converters[0];
    }
}
