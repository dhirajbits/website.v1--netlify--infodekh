import { Cmpt3__withStyleConfig } from "./cmpt_evolution/Cmpt3__withStyleConfig.js";


export class Cmpt extends Cmpt3__withStyleConfig {

    static fromGeneDict ({geneDict, tmpt, tmptpool}) {
        const initDict = geneDict;
        initDict["tmpt"] = tmpt;
        initDict["tmptpool"] = tmptpool;
        return new Cmpt(initDict);
    }

    constructor ({attachedToCmptRefId, attachedToHookName, attachedToHookAtIndex, styleConfigDict, styleDeclerationDict, tmpt, tmptRefId, tmptpool, id, refId, styleId, idLikeClassName, nickname}) {
        super({
            styleConfigDict: styleConfigDict,
            styleDeclerationDict: styleDeclerationDict,
            tmpt: tmpt,
            tmptRefId: tmptRefId,
            tmptpool: tmptpool,
            id: id,
            refId: refId,
            styleId: styleId,
            idLikeClassName: idLikeClassName,
            nickname: nickname
        });

        this.attachedToCmptRefId = attachedToCmptRefId;
        this.attachedToHookName = attachedToHookName;
        this.attachedToHookAtIndex = attachedToHookAtIndex;
        
        this.attachedToCmpt = null; // Only use by cmptcanvas CCUCmpt(s).
        this.attachedToHook = null;
    }

    async zInit () {
        return await this.load();
    }
    
    async load () {
        return await super.load();
    }

    fitInsideElmt ({elmt}) {
        elmt.appendChild(this.bodyElmt);
    }

    fitInsideElmtWithCmptStyle ({elmt}) {
        this.fitInsideElmt({elmt: elmt});
        elmt.appendChild(this.styleConfig.bodyElmt);
        elmt.appendChild(this.style.bodyElmt);
    }

    fitInsideElmtWithCmptAndTmptStyle ({elmt}) {
        elmt.appendChild(this.tmpt.style.bodyElmt);
        this.fitInsideElmtWithCmptStyle({elmt: elmt});
    }

    fillInsideElmt ({elmt}) {
        elmt.innerHTML = "";
        this.fitInsideElmt({elmt: elmt});
    }

    fillInsideElmtWithCmptStyle ({elmt}) {
        elmt.innerHTML = "";
        this.fitInsideElmtWithCmptStyle({elmt: elmt});
    }

    fillInsideElmtWithCmptAndTmptStyle ({elmt}) {
        elmt.innerHTML = "";
        this.fitInsideElmtWithCmptAndTmptStyle({elmt: elmt});
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        geneDict["attachedToCmptRefId"] = this.attachedToCmptRefId;
        geneDict["attachedToHookName"] = this.attachedToHookName;
        geneDict["attachedToHookAtIndex"] = this.attachedToHookAtIndex;
        return geneDict;
    }
}