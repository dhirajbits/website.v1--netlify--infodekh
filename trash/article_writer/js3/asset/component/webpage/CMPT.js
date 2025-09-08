import { TmptLoader } from "../../../utility/TmptLoader.js";
import { btn1 } from "./btn1.js";


export const CMPT = {
    btn1: null,
};


const webpageTmptMngr = await TmptLoader.loadTemplates({
    groups: ["webpage"]
});




// btn1
CMPT.btn1 = btn1({
    pageStyle: null,
    tmptMngr: webpageTmptMngr,
})

