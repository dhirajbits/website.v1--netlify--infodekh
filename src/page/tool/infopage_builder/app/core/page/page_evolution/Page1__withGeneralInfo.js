import { Page0 } from "./Page0.js";
import { PageGeneralInfo } from "../page_component/PageGeneralInfo.js";


export class Page1__withGeneralInfo extends Page0 {
    
    constructor ({pageGeneralInfoDefDict, id, refId}) {
        // Default params
        if (!pageGeneralInfoDefDict) {pageGeneralInfoDefDict = {}}
        
        super({
            id: id,
            refId: refId
        });

        this.generalInfo = new PageGeneralInfo({
            definitionDict: pageGeneralInfoDefDict
        });
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        geneDict["pageGeneralInfoDefDict"] = this.generalInfo.toDefinitionDict();
        return geneDict;
    }
}