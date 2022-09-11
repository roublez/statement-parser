import FileFacade from '../lib/FileFacade';
import StatementParser from '../lib/StatementParser';

export default interface ParsableFile {

    /**
     * The original data transfer file
     */
    readonly file: FileFacade;

    /**
     * A reference to the statement parser
     */
    readonly parser: StatementParser;

    /**
     * Parses the file to an exchangeable format
     */
    parse () : Promise<ParsableFile>;

    /**
     * Gets the parsed data
     */
    data () : any;
}
