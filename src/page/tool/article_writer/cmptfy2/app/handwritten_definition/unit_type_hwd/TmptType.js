import { fetchRegisterEntries } from "../utility/file_fetcher.js";
import { pathLastNodeWithoutExtension } from "../../utility/path.js";
import { TmptHWD } from "../unit_hwd/TmptHWD.js";



export class TmptType {
    constructor ({dirFetchUrl}) {
        this.dirFetchUrl = dirFetchUrl;
        this.tmptNameToFileFetchUrl = {};
        this.tmptNameToTmptHWD = {};
        this.isLoaded = false;
    }

    async load () {
        if (this.isLoaded) {return}
        // Get fileFetchUrls from _register file
        const fileFetchUrls = await fetchRegisterEntries({
            dirFetchUrl: this.dirFetchUrl
        });

        for (let fetchUrl of fileFetchUrls) {
            const tmptName = pathLastNodeWithoutExtension({path: fetchUrl});
            this.tmptNameToFileFetchUrl[tmptName] = fetchUrl
        }
        this.isLoaded = true;
    }

    async get ({name}) {
        if (name in this.tmptNameToFileFetchUrl) {
            if (name in this.tmptNameToTmptHWD) {
                return this.tmptNameToTmptHWD[name];
            }
            this.tmptNameToTmptHWD[name] = new TmptHWD({
                fileFetchUrl: this.tmptNameToFileFetchUrl[name]
            });
            await this.tmptNameToTmptHWD[name].load()

            return this.tmptNameToTmptHWD[name];

        }

        else {
            console.error(`tmpt: '${name}' not found.`)
        }
        return null;
    }

    getDefinitionBlob ({name}) {
        return this.get({name}).defintionBlob;
    }

}