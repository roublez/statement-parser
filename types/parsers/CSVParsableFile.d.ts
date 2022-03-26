import FileFacade from "../lib/FileFacade";
import Parsable from "../contracts/Parsable";
export default class CSVParsableFile implements Parsable {
    /**
     * The original data transfer file
     */
    readonly file: FileFacade;
    /**
     * The csv data
     */
    private rows;
    /**
     * Constructs the CSVTransferFile object
     * @param file The original data transfer file
     */
    constructor(file: File | FileFacade);
    /**
     * Parses the CSV file and puts the data into the rows property
     */
    parse(): Promise<Parsable>;
    data(): object;
}
