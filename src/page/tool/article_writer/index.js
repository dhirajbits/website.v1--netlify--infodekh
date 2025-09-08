const rootpath = "../../";
import (rootpath + "public/component/navbar/navbar.js");

import { ELMT } from "./ELMT.js";
import "./cmptfy/app/boot/boot.js";


const assethub = globalThis.ns.cmptfy.assethub;
const Cmpt = globalThis.ns.cmptfy.Cmpt;
const Tmpt = globalThis.ns.cmptfy.Tmpt;


console.log(await assethub.cmpt.getAssetDefBlob({
    assetDefSetName: "webpage",
    assetName: "typographyBox"
}));

console.log(await assethub.tmpt.getAssetDefBlob({
    assetDefSetName: "webpage",
    assetName: "typography_box"
}));

const tmpt = new Tmpt({
    tmptDefinitionBlob: assethub.tmpt.getAssetDefBlob({
        assetDefSetName: "webpage",
        assetName: "typography_box"
    })
});

const cmpt = new Cmpt({
    tmpt: tmpt,
    name: "typobox"
});

console.log(tmpt)
cmpt.fitInsideElmt({
    elmt: ELMT.main
});





