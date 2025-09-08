import { HookStyle } from "../../style/HookStyle.js";
import { CmptHook1__withTmptHook } from "./CmptHook1__withTmptHook.js";


export class CmptHook2__withStyle extends CmptHook1__withTmptHook {
    constructor ({styleDeclerationDict, tmptHook, elmt, id, idLikeClassName, base}) {
        super({
            tmptHook: tmptHook,
            elmt: elmt,
            id: id,
            idLikeClassName: idLikeClassName,
            base: base
        });

        this.style = null;

        // Assigning properties 
        this.style = this._getCmptHookStyleObject({
            declerationDict: styleDeclerationDict
        });
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        geneDict["styleDeclerationDict"] = this.style.configurations;
        return geneDict;
    }

    _getCmptHookStyleObject ({declerationDict}) {
        return new HookStyle({
            idLikeClassName: this.idLikeClassName,
            declerations: declerationDict
        });
    }
}