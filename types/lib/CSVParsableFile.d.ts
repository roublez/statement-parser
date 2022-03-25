import FileFacade from "../file/FileFacade";
import ParsableFile from "../file/ParsableFile";
export default class CSVParsableFile implements ParsableFile {
    /**
     * The original data transfer file
     */
    readonly file: FileFacade;
    /**
     * Constructs the CSVTransferFile object
     * @param file The original data transfer file
     */
    constructor(file: File | FileFacade);
    data(): object;
}
