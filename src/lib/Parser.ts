import { InvalidDataTransferError } from '../errors/InvalidDataTransferError';
import { UnsupportedFileTypeError } from '../errors/UnsupportedFileTypeError';
import FileFacade from '../file/FileFacade';
import ParsableFile, { SupportedFileType } from '../file/ParsableFile';
import CSVParsableFile from './CSVParsableFile';
import PDFParsableFile from './PDFParsableFile';

export default class Parser {

    public static parseAll (dataTransfer: DataTransfer) : Array<ParsableFile> {
        if (! dataTransfer.items) {
            throw new InvalidDataTransferError('The data transfer is missing the "items" property.', dataTransfer);
        }

        const files: Array<FileFacade> = [];
        for (var fileIndex = 0; fileIndex < dataTransfer.items.length; fileIndex++) {
            if (dataTransfer.items[fileIndex].kind !== 'file') {
                continue;
            }

            const file = dataTransfer.items[fileIndex].getAsFile();
            if (file) {
                files.push(new FileFacade(file));
            }
        }

        const parsableFiles = files.map(file => Parser.dedicatedParsableFile(file));
        console.log(parsableFiles);
        return parsableFiles;
    }

    /**
     * Gets the dedicated parsable file for the transfer file
     * @param file The original transfer file
     * @returns The parsable file object
     */
    public static dedicatedParsableFile (file: FileFacade) : ParsableFile {
        if (file.mimeType() === SupportedFileType.csv) {
            return new CSVParsableFile(file);
        } else if (file.mimeType() === SupportedFileType.pdf) {
            return new PDFParsableFile(file);
        } else {
            throw new UnsupportedFileTypeError(`The file type [${ file.mimeType() }] is not supported.`, file);
        }
    }
}
