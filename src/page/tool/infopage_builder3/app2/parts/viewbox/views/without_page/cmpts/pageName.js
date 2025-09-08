import { Cmpt } from "../../../utility/Cmpt.js";


export function createPageNameCmpt() {
   const cmpt = new Cmpt({tagname: "div"});

   cmpt.html = `
   <p>Untitled<p/>
   <div data-hook="something"><div>
   `;

   cmpt.cssDict = {
      
   }
}