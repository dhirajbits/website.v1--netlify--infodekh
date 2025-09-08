import { tmptset } from "../template/loadset_webpage.js";


export const cmptset = new globalThis.ns.cmptfy.CmptSet({
    name: "webpage"
});

await cmptset.loadSet({
    dirUrl: "./js/asset/component/set.webpage",
    tmptset: tmptset,
});
