import { fetchRegisterEntries } from "../utility/file_fetcher.js";
import { pathLastNode } from "../../utility/path.js";
import { TmptSetHWD } from "../unit_hwd/TmptSetHWD.js";



export class TmptSetType {
    constructor ({dirFetchUrl}) {
        this.dirFetchUrl = dirFetchUrl;
        this.tmptsetNameToDirFetchUrl = {}
        this.tmptsetNameToTmtpSetHWD = {}
        this.isLoaded = false;
    }

    async load () {
        if (this.isLoaded) {return}
        // Get fileFetchUrls from _register file
        const fileFetchUrls = await fetchRegisterEntries({
            dirFetchUrl: this.dirFetchUrl
        });

        for (let fetchUrl of fileFetchUrls) {
            const tmptName = pathLastNode({path: fetchUrl});
            this.tmptsetNameToDirFetchUrl[tmptName] = fetchUrl
        }
        this.isLoaded = true;
    }

    get ({name}) {

    }
}