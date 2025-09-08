import { 
    articleTypeBadge,
    pageNameStrip,
    actionBtnsStrip,
    cmptConfigCatNavStrip,
} 
from "./load_cmpts.js";
import { ELMT } from "./ELMT.js";


// article_type_badge component
const articleTypeBadgeCmpt = articleTypeBadge();
articleTypeBadgeCmpt.hooks["articleType"].value = "Movie Update";
// articleTypeBadgeCmpt.fitInsideElmt({elmt: document.querySelector("#aside")})


// page_name_strip component
const pageNameStripCmpt = pageNameStrip();
pageNameStripCmpt.hooks["pageName"].value = "cinema review";
pageNameStripCmpt.hooks["articleTypeBadge"].attachTo({
    cmpt: articleTypeBadgeCmpt
});
pageNameStripCmpt.fitInsideElmt({elmt: ELMT.aside})


// action buttons strip
const actionBtnsStripCmpt = actionBtnsStrip();
actionBtnsStripCmpt.fitInsideElmt({elmt: ELMT.aside});


// cmpt config catagory nav strip
const cmptConfigCatNavStripCmpt = cmptConfigCatNavStrip();
cmptConfigCatNavStripCmpt.fitInsideElmt({elmt: ELMT.aside});