import FileFacade from "../lib/FileFacade";
import Parsable from "./Parsable";
export default class PDFParsableFile implements Parsable {
    /**
     * The original data transfer file
     */
    readonly file: FileFacade;
    /**
     * Constructs the PDFTransferFile object
     * @param file The original data transfer file
     */
    constructor(file: File | FileFacade);
    parse(): Promise<Parsable>;
    data(): object;
}
