import { appTmptHub } from "../../app/exports/appTmptHub.js";
import { PageRaw } from "../../app/exports/main.js";



const pageRaw = new PageRaw({
   tmptHub: appTmptHub
});


const cmpt1 = await pageRaw.CmptRaw.zCreateAndAdd({
   tmptRefId: "for_testing..cmpt_1"
});

const cmpt2 = await pageRaw.CmptRaw.zCreateAndAdd({
   tmptRefId: "for_testing..cmpt_1"
});

console.log(pageRaw);

cmpt1.getHook({hookName: "main-sub-article"}).attacher.attach(cmpt2.attachingPoint)
// cmpt1.getHook({hookName: "main-sub-article"}).attacher.detachFromAny()

console.log(cmpt1.getHook({hookName: "main-sub-article"}))


cmpt1.getHook({hookName: "title"}).attacher.attach("Hello world");
console.log(cmpt1.getHook({hookName: "title"}))


const genedict = pageRaw.toGeneDict();
console.log(genedict);

const pageRaw2 = await PageRaw.zFromGeneDict({
   geneDict: genedict,
   tmptHub: appTmptHub
});

console.log("PageRaw2")
console.log(pageRaw2)