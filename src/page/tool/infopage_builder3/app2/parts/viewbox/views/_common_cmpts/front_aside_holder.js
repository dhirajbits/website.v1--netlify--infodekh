import { UICmpt } from "../../utility/ui_cmpt/UICmpt.js";
import { createAsideCmpt } from "./aside.js";
import { createFrontCmpt } from "./front.js";


export function createFrontAsideHolderCmpt({Cmpt, view, viewbox, panel}) {
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

   handleChildren({cmpt, view, panel});

   return cmpt;
}


function handleChildren({cmpt, view, panel}) {
   const frontCmpt = createFrontCmpt({view, panel});
   const asideCmpt = createAsideCmpt({});

   cmpt.hook("self").attach(frontCmpt);
   cmpt.hook("self").attach(asideCmpt);
}