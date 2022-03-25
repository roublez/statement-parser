import FileFacade from './FileFacade';

export enum SupportedFileType {
    csv = 'text/csv',
    pdf = 'application/pdf'
}

export default interface ParsableFile {

    /**
     * The original data transfer file
     */
    readonly file: FileFacade;

    /**
     * Gets the parsed data of the file
     */
    data () : object;
}
