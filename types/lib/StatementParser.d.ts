import Parsable from '../parsers/Parsable';
import EntityType from '../enums/EntityType';
/**
 * The statement parser is responsible for preparing the and managing the files that need to be parsed.
 */
export default class StatementParser {
    /**
     * The entity type of the files to parse.
     */
    private entityType;
    /**
     * The assumed locale of the files to parse.
     */
    private assumedLocale;
    /**
     * Constructs a new statement parser.
     * @param entityType The document type of the files to parse.
     */
    constructor(entityType: EntityType);
    /**
     * Sets the assumed locale
     * @param locale The assumed locale
     */
    setAssumedLocale(locale: string): void;
    /**
     * Gets the assumed locale
     * @returns The assumed locale
     */
    getAssumedLocale(): string | null;
    /**
     * Parses all files in the transfer
     * @param dataTransfer The data transfer object
     * @returns The list of the parsed files
     */
    parse(dataTransfer: DataTransfer): Array<Parsable>;
    /**
     * Gets the dedicated parsable file for the transfer file
     * @param file The original transfer file
     * @returns The parsable file object
     */
    private dedicatedParsable;
}
