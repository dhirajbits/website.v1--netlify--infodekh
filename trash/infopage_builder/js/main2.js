import { InfopageBuilderApp } from "../app/exports.js";
import { CmptCanvas } from "../app/exports.js";


const app = new InfopageBuilderApp();
await app.zInit()


const page = app.createNewPage({pageType:"MovieUpdate"})
await page.zInit();


await page.cmptPool.zCreateAndAddCmpt({
    tmptRefId: "movie_update..main_heading"
});


console.log(page)


const infopageCanvasElmt = document.querySelector("#infopage");
const canvas = new CmptCanvas({
    page: page
});
await canvas.zInit();


await canvas.zAddAllCmptOfCmptpool();
canvas.fillInsideElmt({elmt: infopageCanvasElmt});
// infopageCanvasElmt.appendChild(canvas.canvasStructure.bodyElmt)
console.log(canvas)