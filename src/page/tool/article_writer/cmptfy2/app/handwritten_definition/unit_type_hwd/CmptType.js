import { UnitHWD } from "./UnitHWD.js";



export class CmptHWD extends UnitHWD{
    constructor ({dirFetchUrl}) {
        super({dirFetchUrl: dirFetchUrl});
        this.cmptNameToFileFetchUrl = {}
        this.isBasicLoaded = false;
    }

    async basicLoad () {

    }

    get ({name}) {

    }

    getDefinitionBlob ({name}) {
        
    }
}