import { Tmpt } from "../tmpt/Tmpt.js";
import { TmptSet } from "../tmpt/TmptSet.js";

import { Cmpt } from "../cmpt/Cmpt.js";
import { CmptSet } from "../cmpt/CmptSet.js";
import { assethub } from "../activity/load_asset_hub.js";


class cmptfy {
    static Tmpt = Tmpt;
    static TmptSet = TmptSet;
    static Cmpt = Cmpt;
    static CmptSet = CmptSet;
    static assethub = assethub;
}


if (!globalThis.ns){
    globalThis.ns = {}
}


globalThis.ns.cmptfy = cmptfy;