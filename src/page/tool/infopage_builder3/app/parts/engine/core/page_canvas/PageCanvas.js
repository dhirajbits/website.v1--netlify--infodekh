import { CmptBUSHCanvas } from "./component/CmptBUSHCanvas.js";

export class PageCanvas {
   constructor({pageDoc}) {
      this.pageDoc = pageDoc; //PageDoc
      this.cmptBUSHCanvas = new CmptBUSHCanvas();
      this.CmptOnPage = null;
      this.editCmpt = null;
      this.editCmptHook = null;
      // this.editCmptStyle = null;
      // this.editCmptHookStyle = null;
      // this.editCmptStyleConfig = null;
      // this.editCmptHookStyleConfig = null;
      this.editCmptPosition = null;
      this.editPageMeta = null;
      this.editPageGeneralInfo = null;
   }

   fitAtTopInsideElmt(){}
   fitAtBottomInsideElmt() {}
   fitInsideElmt({elmt}, top=false) {}
   fillInsideElmt({elmt}) {}
}



/* 
FEATURES--------------------------------------

add cmpt
create cmpt
create and add cmpt
remove cmpt
remove cmpt by refid


*/