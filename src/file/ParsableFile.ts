import FileFacade from './FileFacade';

export default interface ParsableFile {

    /**
     * The original data transfer file
     */
    readonly file: FileFacade;
}
