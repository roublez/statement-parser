import FileFacade from '../lib/FileFacade';
export default interface Parsable {
    /**
     * The original data transfer file
     */
    readonly file: FileFacade;
    /**
     * Parses the file to an exchangeable format
     */
    parse(): Promise<Parsable>;
    /**
     * Gets the parsed data of the file
     */
    data(): object;
}
