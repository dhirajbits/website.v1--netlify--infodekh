import { CmptStyle } from "../../style/CmptStyle.js";
import { Cmpt1__withTmpt } from "./Cmpt1__withTmpt.js";



export class Cmpt2__withStyle extends Cmpt1__withTmpt {
    constructor ({styleDeclerationDict, tmpt, tmptRefId, tmptpool, id, refId, styleId, idLikeClassName, nickname}) {
        // Setting default params value
        if (!styleDeclerationDict) {styleDeclerationDict = {}}

        super({
            tmpt: tmpt,
            tmptRefId: tmptRefId,
            tmptpool: tmptpool,
            id: id,
            refId: refId,
            styleId: styleId,
            idLikeClassName: idLikeClassName,
            nickname: nickname
        });

        this.style = null;

        // Assigning properties
        this.style = this._createAndGetStyle({
            styleDeclerationDict: styleDeclerationDict
        });
        
    }

    async zInit () {
        return await this.load();
    }

    async load () {
        return await super.load();
    }

    toDICT () {
        const dict = super.toDICT();
        dict["styleDeclerationDict"] = this.style.configurations;
        return dict;
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        geneDict["styleDeclerationDict"] = this.style.configurations;
        return geneDict;
    }


    _createAndGetStyle ({styleDeclerationDict}) {
        const styleObj = new CmptStyle({
            idLikeClassName: this.idLikeClassName,
            declerations: styleDeclerationDict
        });
        return styleObj;
    }

    
}