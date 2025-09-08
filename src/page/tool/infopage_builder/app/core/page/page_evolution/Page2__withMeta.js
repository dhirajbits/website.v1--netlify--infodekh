import { PageMeta } from "../page_component/PageMeta.js";
import { Page1__withGeneralInfo } from "./Page1__withGeneralInfo.js";


export class Page2__withMeta extends Page1__withGeneralInfo {
    
    constructor ({pageMetaDefDict, pageGeneralInfoDefDict, id, refId}) {
        // Default params
        if (!pageMetaDefDict) {pageMetaDefDict = {}}

        super({
            pageGeneralInfoDefDict: pageGeneralInfoDefDict,
            id: id,
            refId: refId
        });

        this.meta = new PageMeta({
            definitionDict: pageMetaDefDict 
        });
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        geneDict["pageMetaDefDict"] = this.meta.toDefinitionDict();
        return geneDict;
    }
}