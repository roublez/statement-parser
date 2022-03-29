import EntityType from '../enums/EntityType';
import FileFacade from '../lib/FileFacade';
import { StatementParser } from '../parser';
import Converter from './Converter';

export default interface Parsable {

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
    parse () : Promise<Parsable>;

    /**
     * Gets the parsed data
     */
    data () : any;
}
