import { Page } from "../page/Page2.js";
import { CmptCanvas } from "../cmptcanvas/CmptCanvas2.js";
import { TmptHub } from "../tmpthub/TmptHub.js";


const tmpthub = new TmptHub({
    dirFetchUrl: "./app/template"
});
await tmpthub.zInit();


const page = new Page({
    pageType: "movie_update_article",
    tmptSetNames: ["movie_update_article"],
    tmpthub: tmpthub
});
await page.zInit();




const cmptcanvas = new CmptCanvas({
    page: page
});

cmptcanvas.addAllCmptOfCmptpool();

console.log(cmptcanvas);