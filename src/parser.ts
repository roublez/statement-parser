import StatementParser from "./lib/StatementParser";
import InvalidConverterMatchingError from "./errors/InvalidConverterMatchingError";
import InvalidDataTransferError from "./errors/InvalidDataTransferError";
import InvalidEntityTypeError from "./errors/InvalidEntityTypeError";
import UnsupportedFileTypeError from "./errors/UnsupportedFileTypeError";

import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');

export {
    StatementParser,

    //
    // Errors
    InvalidConverterMatchingError,
    InvalidDataTransferError,
    InvalidEntityTypeError,
    UnsupportedFileTypeError
};
