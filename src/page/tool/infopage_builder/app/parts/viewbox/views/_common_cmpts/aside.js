import { UICmpt } from "../../utility/ui_cmpt/UICmpt.js";
import { createActionBtnsStripCmpt } from "./aside/action_btns_strip.js";
import { createCmptConfigCatNavStripCmpt } from "./aside/cmpt_config_cat_nav_strip.js";
import { createPageDetailsStripCmpt } from "./aside/page_details_strip.js";

export function createAsideCmpt({view, viewbox, panel}) {
   const cmpt = new UICmpt({
      name: "aside",
      tagname: "div"
   });

   cmpt.html = "";

   cmpt.css = `
      #----- {
         background-color: var(--COLOR--dark--light);
         max-width: 300px;
         border-left: 2px solid #333;
         width: 350px;
         height: 100%;
         flex-grow: 0;
         flex-shrink: 0;
         
      }
   `;

   cmpt.addHook({
      name: "self",
      selector: "#-----",
      type: UICmpt.HOOKTYPE.CMPT_LIST,
   });

   handleChildren({view, viewbox, panel, cmpt})

   return cmpt;


}


function handleChildren ({view, viewbox, panel, cmpt}) {
   const pageDetailsStripCmpt = createPageDetailsStripCmpt({view, viewbox, panel});
   const actionBtnStripCmpt = createActionBtnsStripCmpt({view, viewbox, panel});
   const cmptConfigCatNavStripCmpt = createCmptConfigCatNavStripCmpt({view, viewbox, panel});

   cmpt.hook("self").attach(pageDetailsStripCmpt);
   cmpt.hook("self").attach(actionBtnStripCmpt);
   cmpt.hook("self").attach(cmptConfigCatNavStripCmpt);
}
