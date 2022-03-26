import FileFacade from "../lib/FileFacade";
import Parsable from "./Parsable";

export default class PDFParsableFile implements Parsable {

    /**
     * The original data transfer file
     */
    public readonly file: FileFacade;

    /**
     * Constructs the PDFTransferFile object
     * @param file The original data transfer file
     */
    public constructor (file: File|FileFacade) {
        this.file = FileFacade.ensure(file);
    }

    public parse (): Promise<Parsable> {
        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }

    public data (): object {
        return this.file;
    }
}
