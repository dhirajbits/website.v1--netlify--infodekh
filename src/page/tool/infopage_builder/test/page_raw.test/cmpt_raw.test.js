import { CmptRaw } from "../../app/core/page_raw/cmpt_raw/CmptRaw.js";
import { TmptHub } from "../../app/core/tmpthub/TmptHub.js";


const tmptHub = new TmptHub({
   dirFetchUrl: "./app/template"
});
await tmptHub.basicLoad();


const tmpt = await tmptHub.getTmptByRefId({
   tmptRefId: "movie_update..plateform"
});

console.log(tmpt)

const cmptRaw = new CmptRaw({
   tmpt: tmpt
});

console.log(cmptRaw);

const cmptGeneDict = cmptRaw.toGeneDict();
console.log(cmptGeneDict);


const cmptRawClone = CmptRaw.fromGeneDict({
   geneDict: cmptGeneDict,
   tmpt: tmpt
});

console.log(cmptRawClone);