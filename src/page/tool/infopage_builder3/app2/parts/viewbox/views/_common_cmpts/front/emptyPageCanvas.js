import { UICmpt } from "../../../utility/ui_cmpt/UICmpt.js";
import { createCreateOrLoadPageSOLCmpt } from "./create_or_load_page_sol.js";


export function createEmptyPageCanvasCmpt({view, panel}) {
   const cmpt = new UICmpt({
      name: "emptyPageCanvas",
      tagname: "div",
   });

   cmpt.html = `
      <div>Empty</div>
      <div class="little">click here Create or Load page</div>
   `;

   cmpt.css = `
      #----- {
         width: 100%;
         height: 100%;
         color: grey;
         font-size: 3rem;
         display: flex;
         flex-flow: column;
         align-items: center;
         justify-content: center;

         background: #000000;
         background-image: linear-gradient(90deg, #ffffff09, 50%, transparent 0),
            linear-gradient( #ffffff09, 50%, transparent 0);
         background-size: 10px 10px;
         cursor: default;
      }

      #----- .little {
         margin-top: 1rem;
         font-size: 1rem;
         text-shadow: 0px 0px 10px black;
      }
   `;

   cmpt.bodyElmt.onclick = (event) => {
      ClickHandler.emptyPageCanvas({event, emptyPageCanvasCmpt: cmpt, view, panel})
   }


   return cmpt;
}

class ClickHandler {
   static emptyPageCanvas({event, emptyPageCanvasCmpt, view, panel}) {
      // const soCmpt = createCreateOrLoadPageSOCmpt({view, panel});
      const soCmpt = createCreateOrLoadPageSOLCmpt({view, panel});
      soCmpt.putInsideElmtWithStyle({elmt: emptyPageCanvasCmpt.bodyElmt});
      
      soCmpt.bodyElmt.style.left = event.pageX + "px";
      soCmpt.bodyElmt.style.top = event.pageY + "px";

      event.stopPropagation();
      
      emptyPageCanvasCmpt.bodyElmt.onclick = null;
      
      document.body.onclick = () => {
         soCmpt.pullFromElmtWithStyle({elmt: emptyPageCanvasCmpt.bodyElmt});
         
         document.body.onclick = null;
         emptyPageCanvasCmpt.bodyElmt.onclick = (event) => {
            ClickHandler.emptyPageCanvas({event, emptyPageCanvasCmpt, view, panel})
         }
      }
   }
}