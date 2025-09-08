import { CmptHook5__withCCUProperties } from "./cmpthook_evolution/CmptHook5__withCCUProperties.js";


export class CmptHook extends CmptHook5__withCCUProperties {
    static fromGeneDict ({geneDict, tmptHook, elmt, base}) {
        const initDict = geneDict;
        initDict["tmptHook"] = tmptHook;
        initDict["elmt"] = elmt;
        initDict["base"] = base;

        return new CmptHook(initDict);
    }

    constructor ({attachmentsDict, styleConfigDict, styleDeclerationDict, tmptHook, elmt, id, idLikeClassName, base}) {
        super({
            attachmentsDict: attachmentsDict,
            styleConfigDict: styleConfigDict,
            styleDeclerationDict: styleDeclerationDict,
            tmptHook: tmptHook,
            elmt: elmt,
            id: id,
            idLikeClassName: idLikeClassName,
            base: base
        });
    }

    toGeneDict () {
        return super.toGeneDict();
    }
}