import { Cmpt2__withStyle } from "./Cmpt2__withStyle.js";
import { CmptStyleConfig } from "../../style_config/CmptStyleConfig.js";


export class Cmpt3__withStyleConfig extends Cmpt2__withStyle {
    constructor ({styleConfigDict, styleDeclerationDict, tmpt, tmptRefId, tmptpool, id, refId, styleId, idLikeClassName, nickname}) {
        // Setting default param value
        if (!styleConfigDict) {styleConfigDict = {}}

        super({
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

        this.styleConfig = null;
        this.styleConfigDict = styleConfigDict;
    }

    async zInit () {
        return await this.load();
    }
    
    async load () {
        await super.load();
        this.styleConfig = this._createAndGetStyleConfig({
            styleConfigDict: this.styleConfigDict
        });
        delete this.styleConfigDict;
        
        return null;
    }

    toDICT () {
        const dict = super.toDICT();
        dict["styleConfigDict"] = this.styleConfig.getConfigurationDict();
        return dict;
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        geneDict["styleConfigDict"] = this.styleConfig.getConfigurationDict();
        return geneDict;
    }

    _createAndGetStyleConfig ({styleConfigDict}) {
        return new CmptStyleConfig({
            tmptStyleConfig: this.tmpt.styleConfig,
            cmptIdLikeClassName: this.idLikeClassName,
            configurationDict: styleConfigDict
        });
    }
}