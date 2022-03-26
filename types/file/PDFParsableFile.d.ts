import FileFacade from "../file/FileFacade";
import ParsableFile from "../file/ParsableFile";
export default class PDFParsableFile implements ParsableFile {
    /**
     * The original data transfer file
     */
    readonly file: FileFacade;
    /**
     * Constructs the PDFTransferFile object
     * @param file The original data transfer file
     */
    constructor(file: File | FileFacade);
    parse(): Promise<ParsableFile>;
    data(): object;
}
