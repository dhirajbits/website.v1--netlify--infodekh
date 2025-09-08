import { UICmpt } from "../../utility/ui_cmpt/UICmpt.js";
import { createEmptyPageCanvasCmpt } from "./front/emptyPageCanvas.js";

export function createFrontCmpt({view, parentCmpt, panel}) {
   const cmpt = new UICmpt({
      name: "front",
      tagname: "div"
   });

   cmpt.html = `
      <div class="pageCanvas"> </div>
   `;

   cmpt.css = `
      #----- {
         background-color: var(--COLOR--primary);
         width: 100%;
         height: 100%;
         display: flex;
         justify-content: center;
         align-items: center;
         padding: 1rem;
         display: flex;
         align-items: center;
         justify-content: center;
      }

      #----- .pageCanvas {
         background-color: var(--COLOR--primary--dark);
         max-width: 1024px;
         min-width: 120px;
         height: 100%;
         border: 1px solid #333;
         box-shadow: 0px 0px 50px var(--COLOR--primary--dark);
         flex-grow: 1;
         flex-shrink: 0;
      }
   `;
   
   cmpt.addHook({
      name: "pageCanvas",
      selector: "#----- .pageCanvas",
      type: UICmpt.HOOKTYPE.CMPT,
   });

   handleChildren({cmpt, view, panel});

   return cmpt;
}

function handleChildren({cmpt, view, panel}) {
   const emptyPageCanvasCmpt = createEmptyPageCanvasCmpt({view, panel});
   cmpt.hook("pageCanvas").attach(emptyPageCanvasCmpt);
}