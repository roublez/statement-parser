import FileFacade from "../file/FileFacade";
import ParsableFile from "../file/ParsableFile";

export default class CSVParsableFile implements ParsableFile {

    /**
     * The original data transfer file
     */
    public readonly file: FileFacade;

    /**
     * Constructs the CSVTransferFile object
     * @param file The original data transfer file
     */
    public constructor (file: File|FileFacade) {
        this.file = FileFacade.ensure(file);
    }

    public data (): object {
        return this.file;
    }
}
