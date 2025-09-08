import { Page } from "../page/Page2.js";
import { TmptHub } from "../tmpthub/TmptHub.js";

const tmpthub = new TmptHub({
    dirFetchUrl: "./app/template"
});
await tmpthub.zInit();


const page = new Page({
    pageType: "movie_update",
    tmptSetNames: ["movie_update_article"],
    tmpthub: tmpthub,
});
await page.zInit();

const cmpt = await page.cmptPool.zCreateAndAddCmpt({
    tmpt: await tmpthub.getTmptByRefId({
        tmptRefId: "movie_update_article..helloworld"
    })
});

console.log(page);


const geneDict = page.toGeneDict();


const page2 = Page.fromGeneDict({
    geneDict: geneDict,
    tmpthub: tmpthub
});

await page2.zInit();
console.log(page2)
