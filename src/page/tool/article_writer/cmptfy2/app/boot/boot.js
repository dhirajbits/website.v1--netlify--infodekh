// Importing Units
import { Tmpt } from "../unit/tmpt/Tmpt.js";
import { TmptSet } from "../unit/tmptset/TmptSet.js";
import { Cmpt } from "../unit/cmpt/Cmpt.js";
import { CmptSet } from "../unit/cmptset/CmptSet.js";


class cmptfy {
    static unit = {
        Tmpt,
        TmptSet,
        Cmpt,
        CmptSet
    }
    static assethub = assethub;
}


if (!globalThis.ns){
    globalThis.ns = {}
}


globalThis.ns.cmptfy = cmptfy;