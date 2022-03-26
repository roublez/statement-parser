import ParsableFile from '../file/ParsableFile';
/**
 * The entity type of the files to parse.
 */
export declare enum EntityType {
    bankStatement = 0,
    portfolioActivity = 1
}
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
    parse(dataTransfer: DataTransfer): Array<ParsableFile>;
    /**
     * Gets the dedicated parsable file for the transfer file
     * @param file The original transfer file
     * @returns The parsable file object
     */
    private dedicatedParsableFile;
}
