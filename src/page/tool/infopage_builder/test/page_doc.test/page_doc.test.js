import { appTmptHub } from "../../app/exports/appTmptHub.js";
import { PageRaw } from "../../app/exports/main.js";
import { PageDoc } from "../../app/core/page_doc/@page_doc/PageDoc.js";

const pageRaw = new PageRaw({
	tmptHub: appTmptHub,
});


console.log(pageRaw);

// ====================================================================

const pageDoc = new PageDoc({
	seed_pageRaw: pageRaw,
});


const cmpt1 = await pageDoc.CmptDoc.zCreateAndAdd({
	tmptRefId: "for_testing..cmpt_1",
});

const cmpt2 = await pageDoc.CmptDoc.zCreateAndAdd({
	tmptRefId: "for_testing..cmpt_1",
});

const cmpt3 = await pageDoc.CmptDoc.zCreateAndAdd({
   tmptRefId: "for_testing..cmpt_1"
});



cmpt1.fillInsideElmt({elmt: document.querySelector("body")});
document.querySelector("body").appendChild(cmpt1.tmpt.style.bodyElmt);
cmpt1.seed_cmptRaw.nickname = "english";
cmpt1.getHook({hookName: "subarticles"}).attacher.attach(cmpt2.attachingPoint);