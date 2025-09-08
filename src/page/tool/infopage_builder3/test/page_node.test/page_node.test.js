import { PageRaw } from "../../app/exports.js";
import { PageNode } from "../../app/exports.js";
import { appTmptHub } from "../appTmptHub.js";


const pageRaw = new PageRaw({
   tmptHub: appTmptHub
});

await pageRaw.zCreateAndAddCmptRaw({
   tmptRefId: "movie_update..main_heading"
})

console.log("PageRaw--> ", pageRaw);


const pageNode = new PageNode({
   seed_pageRaw: pageRaw
});

console.log("PageNode--> ", pageNode);


