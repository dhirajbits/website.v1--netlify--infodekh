// import { CmptCanvas } from "../page_component/CmptCanvas.js";
// import { Page5__withCmptPool } from "./Page5__withCmptPool.js";


// export class Page6__withCmptCanvas extends Page5__withCmptPool {
//     constructor ({cmptPoolDefDict, tmptPoolDefDict, tmpthub, pageMetaDefDict, pageGeneralInfoDefDict, id, refId}) {
//         super({
//             cmptPoolDefDict: cmptPoolDefDict,
//             tmptpoolDefDict: tmptPoolDefDict,
//             tmpthub: tmpthub,
//             pageMetaDefDict: pageMetaDefDict,
//             pageGeneralInfoDefDict: pageGeneralInfoDefDict,
//             id: id,
//             refId: refId
//         });

//         this.cmptcanvas = null;
//     }

//     async init () {
//         await super.init();
//         this.cmptcanvas = new CmptCanvas({
//             cmptpool: this.cmptpool
//         });
//     }

//     toGeneDict () {
//         return super.toGeneDict();
//     }
// }