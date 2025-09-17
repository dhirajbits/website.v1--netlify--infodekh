import { Cmpt } from "./Cmpt.js";
import { UICmpt } from "./ui_cmpt/UICmpt.js";
import { NotImplementedError } from "../../../error/NotImplementedError.js";


export class View {
   constructor({viewbox, panel}) {
      this.viewbox = viewbox; //Viewbox
      this.panel = panel; //Panel
      this.bodyCmpt = null; //Cmpt
      this.bodyCmptRootHook = null; //CmptHook
      
      this.title = ""; //String
      this.bodyElmt = null; //:HtmlElmt
      this.styleElmt = null; //:HtmlElmt

      // ASSIGNING PROPERTIES
      this._reset();

   }

   _createBodyCmpt() {
      const cmpt = new UICmpt({
         name: "View-Root",
         tagname: "div",
      });

      cmpt.html = ``;
      
      cmpt.css = `
         #----- {
            width: 100%;
            height: 100%;
            min-height: 100vh;
            max-height: 100vh;
            // overflow: hidden;
         }
      `;

      cmpt.addHook({
         name: "cmpts",
         selector: "#-----",
         type: UICmpt.HOOKTYPE.CMPT_LIST,
      });

      return cmpt;
   }

   _reset() {
      this.title = ""; //String
      this.bodyCmpt = this._createBodyCmpt();
      this.bodyCmptRootHook = this.bodyCmpt.hook("cmpts");
      this.bodyElmt = this.bodyCmpt.bodyElmt;
      this.styleElmt = this.bodyCmpt.style.bodyElmt;
   }


   build() {
      throw new NotImplementedError("'build' method of 'View' is not implemented by inheritor.");
   }
}