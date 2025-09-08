import { CmptPool } from "../page_component/CmptPool.js";
import { Page4__withTmptPool } from "./Page4__withTmptPool.js";


export class Page5__withCmptPool extends Page4__withTmptPool {
    
    constructor ({cmptPoolDefDict, tmptPoolDefDict, tmpthub, pageMetaDefDict, pageGeneralInfoDefDict, id, refId}) {
        // Default params
        if (!cmptPoolDefDict) {cmptPoolDefDict = {}}

        super({
            tmptpoolDefDict: tmptPoolDefDict,
            tmpthub: tmpthub,
            pageMetaDefDict: pageMetaDefDict,
            pageGeneralInfoDefDict: pageGeneralInfoDefDict,
            id: id,
            refId: refId
        });

        this.cmptpool = null;
        this.cmptPoolDefDict = cmptPoolDefDict;
    }

    async init () {
        await super.init();
        this.cmptpool = await CmptPool.fromGeneDict({
            geneDict: this.cmptPoolDefDict,
            tmptpool: this.tmptpool
        });
        delete this.cmptPoolDefDict;
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        geneDict["cmptPoolDefDict"] = this.cmptpool.toGeneDict();
        return geneDict;
    }
}