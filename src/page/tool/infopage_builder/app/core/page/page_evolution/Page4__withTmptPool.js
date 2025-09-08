import { TmptPool } from "../page_component/TmptPool.js";
import { Page3__withTmptHub } from "./Page3__withTmptHub.js";


export class Page4__withTmptPool extends Page3__withTmptHub {
    
    constructor ({tmptPoolDefDict, tmpthub, pageMetaDefDict, pageGeneralInfoDefDict, id, refId}) {
        // Default params
        if (!tmptPoolDefDict) {tmptPoolDefDict = {}}
        tmptPoolDefDict = {"tmptsets": ["movie_update_article"]}

        super({
            tmpthub: tmpthub,
            pageMetaDefDict: pageMetaDefDict,
            pageGeneralInfoDefDict: pageGeneralInfoDefDict,
            id: id,
            refId: refId
        });
        this.tmptpool = TmptPool.fromDICT({
            tmptPoolDict: tmptPoolDefDict,
            tmpthub: tmpthub
        });
    }

    async init () {
        return null;
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        geneDict["tmptPoolDefDict"] = this.tmptpool.toDICT();
        return geneDict;
    }
}