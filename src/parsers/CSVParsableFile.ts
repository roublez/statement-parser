import FileFacade from "../lib/FileFacade";
import Parsable from "../contracts/Parsable";
import { parse } from "csv-parse/browser/esm";

export default class CSVParsableFile implements Parsable {

    /**
     * The original data transfer file
     */
    public readonly file: FileFacade;

    /**
     * The csv data
     */
    private rows: Array<Array<string>> = [];

    /**
     * Constructs the CSVTransferFile object
     * @param file The original data transfer file
     */
    public constructor (file: File|FileFacade) {
        this.file = FileFacade.ensure(file);
    }

    /**
     * Parses the CSV file and puts the data into the rows property
     */
    public parse () : Promise<Parsable> {

        //
        // Clear the parsed data
        this.rows = [];

        return new Promise((resolve, reject) => {
            this.file.originalFile.text().then(content => {
                const parser = parse(content);

                //
                // Push the new record to the rows array
                parser.on('readable', () => {
                    let row = null;
                    while ((row = parser.read()) !== null) {
                        this.rows.push(row);
                    }
                });

                //
                // Resolve the promise when the parsing was complete
                parser.on('end', () => {
                    resolve(this);
                });

                //
                // Reject when a parsing error occurs
                parser.on('error', error => {
                    reject(error);
                });
            });
        });
    }

    public data (): object {
        return {
            rows: this.rows
        };
    }
}
