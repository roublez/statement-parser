import FileFacade from "../lib/FileFacade";
import Parsable from "../contracts/Parsable";
import { StatementParser } from "../parser";

export default class PdfParsableFile implements Parsable {

    /**
     * The original data transfer file
     */
    public readonly file: FileFacade;

    /**
     * A reference to the statement parser
     */
     readonly parser: StatementParser;

    /**
     * Constructs the PDFTransferFile object
     * @param file The original data transfer file
     * @param parser The statement parser
     */
    public constructor (file: File|FileFacade, parser: StatementParser) {
        this.file = FileFacade.ensure(file);
        this.parser = parser;
    }

    public parse (): Promise<Parsable> {
        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }

    public data () : any {
        return null;
    }
}
