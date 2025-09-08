import { CmptStyleConfig } from "../../style_config/CmptStyleConfig.js";
import { CmptHook2__withStyle } from "./CmptHook2__withStyle.js";


export class CmptHook3__withStyleConfig extends CmptHook2__withStyle {
    constructor ({styleConfigDict, styleDeclerationDict, tmptHook, elmt, id, idLikeClassName, base}) {
        super({
            styleDeclerationDict: styleDeclerationDict,
            tmptHook: tmptHook,
            elmt: elmt,
            id: id,
            idLikeClassName: idLikeClassName,
            base: base
        });

        this.styleConfig = null;

        // Assigning properties
        this.styleConfig = this._getCmptHookStyleConfigObject({
            configurationDict: styleConfigDict
        });
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        // geneDict["styleConfigDict"] = this.styleConfig.getConfigurationDict();
        return geneDict;
    }

    _getCmptHookStyleConfigObject ({configurationDict}) {
        // return new CmptHookStyleConfig({
        //     tmptHookStyleConfig: this.tmptHook.styleConfig,
        //     cmptHookIdLikeClassName: this.idLikeClassName,
        //     configurationDict: configurationDict
        // });
    }
}