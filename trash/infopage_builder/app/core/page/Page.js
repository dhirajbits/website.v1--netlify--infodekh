import { insertItemAtIndexInArray } from "../utility/array.js";
import { Page5__withCmptPool } from "./page_evolution/Page5__withCmptPool.js";


export class Page extends Page5__withCmptPool {
    static fromGeneDict ({geneDict, tmpthub}) {
        if (!geneDict) {geneDict = {}}
        const initDict = geneDict;
        initDict["tmpthub"] = tmpthub;

        return new Page(initDict);
    }

    constructor ({cmptPoolDefDict, tmptPoolDefDict, tmpthub, pageMetaDefDict, pageGeneralInfoDefDict, id, refId}) {
        super({
            cmptPoolDefDict: cmptPoolDefDict,
            tmptpoolDefDict: tmptPoolDefDict,
            tmpthub: tmpthub,
            pageMetaDefDict: pageMetaDefDict,
            pageGeneralInfoDefDict: pageGeneralInfoDefDict,
            id: id,
            refId: refId
        });
    }

    async init () {
        return await super.init();
    }

    async zInit() {
        return await this.init();
    }

    toGeneDict () {
        return super.toGeneDict();
    }
}