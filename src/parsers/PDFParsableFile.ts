import FileFacade from "../lib/FileFacade";
import ParsableFile from "../contracts/ParsableFile";
import StatementParser from "../lib/StatementParser";
import { getDocument as getPdfDocument } from "pdfjs-dist";
import { TextItem } from "pdfjs-dist/types/src/display/api";

/**
 * Defines the parsed type of a pdf page
 */
type PageContent = {

    /**
     * The page number
     */
    pageNumber: number,

    /**
     * The contents of the page
     */
    contents: Array<TextItem>
};

export default class PDFParsableFile implements ParsableFile {

    /**
     * The original data transfer file
     */
    public readonly file: FileFacade;

    /**
     * A reference to the statement parser
     */
    readonly parser: StatementParser;

    /**
     * The pdf page contents
     */
    private pages: Array<PageContent> = [];

    /**
     * Constructs the PDFTransferFile object
     * @param file The original data transfer file
     * @param parser The statement parser
     */
    public constructor (file: File|FileFacade, parser: StatementParser) {
        this.file = FileFacade.ensure(file);
        this.parser = parser;
    }

    /**
     * Parses the PDF file and puts the data into the pagesw property
     */
    public async parse (): Promise<ParsableFile> {

        //
        // Clear the parsed data
        this.pages = [];

        //
        // Retrieve the pdf document proxy
        const buffer = await this.file.originalFile.arrayBuffer();
        const document = await getPdfDocument(new Uint8Array(buffer)).promise;

        //
        // Handle all pages and push the data to the parsed pages array
        for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber++) {
            const page = await document.getPage(pageNumber);
            const contents = await page.getTextContent();

            this.pages.push({
                pageNumber,
                contents: (contents.items as Array<TextItem>)
                    .map(item => {
                        item.str = item.str.trim()
                        return item;
                    })
            });
        }

        return this;
    }

    /**
     * Gets the parsed pages
     * @returns The parsed pages
     */
    public data () : Array<PageContent> {
        return this.pages;
    }
}
