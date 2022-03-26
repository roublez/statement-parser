import FileFacade from "../lib/FileFacade";
import Parsable from "../contracts/Parsable";
import { StatementParser } from "../parser";
export default class CsvParsableFile implements Parsable {
    /**
     * The original data transfer file
     */
    readonly file: FileFacade;
    /**
     * A reference to the statement parser
     */
    readonly parser: StatementParser;
    /**
     * The csv data
     */
    private rows;
    /**
     * Constructs the CSVTransferFile object
     * @param file The original data transfer file
     * @param parser The statement parser
     */
    constructor(file: File | FileFacade, parser: StatementParser);
    /**
     * Parses the CSV file and puts the data into the rows property
     */
    parse(): Promise<Parsable>;
    /**
     * Gets the parsed rows
     * @returns The parsed rows
     */
    getRows(): Array<Array<string>>;
}
