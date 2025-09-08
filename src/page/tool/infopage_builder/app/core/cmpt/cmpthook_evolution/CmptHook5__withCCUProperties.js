/* CCU => cmpt canvas utility */

import { CmptHook4__withAttachments } from "./CmptHook4__withAttachments.js";


export class CmptHook5__withCCUProperties extends CmptHook4__withAttachments {

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

        // Cmpt Canvas Utility Add Cmpt
        this.CCUHookFillerCmpt = null;

    }

    toGeneDict () {
        return super.toGeneDict();
    }
}