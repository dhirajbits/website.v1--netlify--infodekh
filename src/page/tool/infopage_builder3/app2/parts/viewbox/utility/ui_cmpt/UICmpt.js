import { UICmpt3__withHook } from "./evolution/UiCmpt3__withHook.js";


export class UICmpt extends UICmpt3__withHook {
   constructor({name, tagname}) {
      super({name, tagname});
   }

   putInsideElmtWithStyle({elmt}) {
      elmt.appendChild(this.bodyElmt);
      elmt.appendChild(this.style.bodyElmt);
   }

   pullFromElmtWithStyle({elmt}) {
      elmt.removeChild(this.bodyElmt);
      elmt.removeChild(this.style.bodyElmt);
   }
}