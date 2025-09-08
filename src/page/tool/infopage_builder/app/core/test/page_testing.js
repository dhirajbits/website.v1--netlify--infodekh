import { Page } from "../page/Page.js";
import { TmptHub } from "../tmpthub/TmptHub.js";


const tmpthub = new TmptHub({
    dirFetchUrl: "./app/template"
});

await tmpthub.basicLoad();

const page = Page.fromGeneDict({
    geneDict: {},
    tmpthub: tmpthub
});
await page.init();

await page.cmptpool.createAndAddCmpt ({
    tmptRefId: "movie_update_article..helloworld"
})


console.log(page);

