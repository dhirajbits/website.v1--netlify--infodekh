import { pathLastNodeWithoutExtension } from "../../utility/path.js";
import { TmptType } from "../unit_type_hwd/TmptType.js";
import { fetchRegisterEntries } from "../utility/file_fetcher.js";
import { TmptHWD } from "./TmptHWD";
import { TmptSetDefinitionBlob } from "../../definition_blob/tmptset/TmptSetDefinitionBlob.js";



export class TmptSetHWD extends TmptType{
    constructor ({dirFetchUrl}) {
        this.dirFetchUrl = dirFetchUrl;
        this.tmptNameToFileFetchUrl = {};
        this.tmptNameToTmptHWD = {};
        this.definitionBlob = null;
        this.isLoaded = false;
    }

    async load () {
        if (this.isLoaded) {return}
        await this._loadRegister();
        for (let tmptName of this.tmptNameToFileFetchUrl) {
            const tmptHWD = new TmptHWD({
                fileFetchUrl: this.tmptNameToFileFetchUrl[tmptName]
            });
            this.tmptNameToTmptHWD[tmptName] = tmptHWD;
        }
        this._createDefinitionBlob();
        this.isLoaded = true;
    }

    toDefinitionBlob () {
        return this.definitionBlob;
    }

    async _loadRegister () {
        if (this.isLoaded) {return}
        const registerEntries = await fetchRegisterEntries({
            dirFetchUrl: this.dirFetchUrl
        });

        for (let fileUrl of registerEntries) {
            const tmptName = pathLastNodeWithoutExtension({
                path: fileUrl
            });
            this.tmptNameToFileFetchUrl[tmptName] = fileUrl;
        }
        this.isLoaded = true;
    }

    _createDefinitionBlob () {
        const tmptNameToDefinitionBlob = {}
        for (let tmptName in this.tmptNameToTmptHWD) {
            tmptNameToDefinitionBlob[tmptName] = this.tmptNameToTmptHWD[tmptName].definitionBlob;
        }

        this.definitionBlob = new TmptSetDefinitionBlob({
            nameToTmptDefinitionBlob: tmptNameToDefinitionBlob
        });
    }
}