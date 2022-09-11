import StatementParser from "./lib/StatementParser";
import InvalidConverterMatchingError from "./errors/InvalidConverterMatchingError";
import InvalidDataTransferError from "./errors/InvalidDataTransferError";
import UnsupportedFileTypeError from "./errors/UnsupportedFileTypeError";

import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');

export {
    StatementParser,

    //
    // Errors
    InvalidConverterMatchingError,
    InvalidDataTransferError,
    UnsupportedFileTypeError
};
