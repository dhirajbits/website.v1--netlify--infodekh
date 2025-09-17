import { UICmpt } from "../../utility/ui_cmpt/UICmpt.js";
import { createAsideCmpt } from "./aside.js";
import { createFrontCmpt } from "./front.js";


export function createFrontAsideHolderCmpt({view, viewbox, panel}) {
   const cmpt = new UICmpt({
      name: "frontAsideHolder",
      tagname: "div"
   });

   cmpt.html = ``;

   cmpt.css = `
   #----- {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: red;
   }
   `;

   cmpt.addHook({
      name: "self",
      selector: "#-----",
      type: UICmpt.HOOKTYPE.CMPT_LIST,
   });

   handleChildren({cmpt, viewbox, view, panel});

   return cmpt;
}


function handleChildren({cmpt, viewbox, view, panel}) {
   const frontCmpt = createFrontCmpt({viewbox, view, panel});
   const asideCmpt = createAsideCmpt({viewbox, view, panel});

   cmpt.hook("self").attach(frontCmpt);
   cmpt.hook("self").attach(asideCmpt);
}