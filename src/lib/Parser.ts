import { InvalidDataTransferError } from '../errors/InvalidDataTransferError';
import ParsableFile from '../file/ParsableFile';
import CSVParsableFile from './CSVParsableFile';

export default class Parser {

    public static parseAll (dataTransfer: DataTransfer) : Array<ParsableFile> {
        if (! dataTransfer.items) {
            throw new InvalidDataTransferError('The data transfer is missing the "items" property.', dataTransfer);
        }

        const files: Array<ParsableFile> = [];
        for (var fileIndex = 0; fileIndex < dataTransfer.items.length; fileIndex++) {
            if (dataTransfer.items[fileIndex].kind !== 'file') {
                continue;
            }

            const file = dataTransfer.items[fileIndex].getAsFile();
            if (file) {
                files.push(Parser.dedicatedParsableFile(file));
            }
        }

        return files;
    }

    /**
     * Gets the dedicated parsable file for the transfer file
     * @param file The original transfer file
     * @returns The parsable file object
     */
    public static dedicatedParsableFile (file: File) : ParsableFile {
        return new CSVParsableFile(file);
    }
}
