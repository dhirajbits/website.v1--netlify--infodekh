import { UnitHWD } from "./UnitHWD.js";



export class CmptSetHWD extends UnitHWD{
    constructor ({dirFetchUrl}) {
        super({dirFetchUrl: dirFetchUrl});
        this.cmptSetNameToDirFetchUrl = {}
        this.isBasicLoaded = false;
    }

    async basicLoad () {

    }

    get ({name}) {

    }

    getDefinitionBlob ({name}) {
        
    }
}