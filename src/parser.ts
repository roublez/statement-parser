import EntityType from "./enums/EntityType";
import StatementParser from "./lib/StatementParser";
import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');

export { StatementParser, EntityType };
