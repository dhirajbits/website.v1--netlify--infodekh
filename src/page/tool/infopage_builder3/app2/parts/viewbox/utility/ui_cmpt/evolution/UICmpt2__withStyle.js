import { UICmpt1__withHtml } from "./UICmpt1__withHtml.js";

export class UICmpt2__withStyle extends UICmpt1__withHtml {
   constructor({tagname, name}) {
      super({tagname, name});

      this.styleElmt = document.createElement("style");
      this.style = new UICmptStyle({uiCmptStyleElmt: this.styleElmt});
      this._rawCSS = ""; //String
   }

   get css() {
      return this._rawCSS;
   };

   set css(code) {
      if (typeof code !== "string") return;
      
      const cmptBodyElmtSelector = "." + this.idLikeClassName;
      code = code.replaceAll("#-----", cmptBodyElmtSelector);
      
      this._rawCSS += "\n" + code;
      this.updateStyleElmt();
   }

   resetCSS() {
      this._rawCSS = "";
      this.updateStyleElmt();
   }

   updateStyleElmt() {
      this.styleElmt.innerHTML = this._rawCSS;
   }

}



class UICmptStyle {
   constructor({uiCmptStyleElmt}) {
      this.uiCmptStyleElmt = uiCmptStyleElmt;
      this.bodyElmt = document.createElement("div");
      this.bodyElmt.classList.add("--UI-CMPT-STYLE--");
      
      this.bodyElmt.appendChild(uiCmptStyleElmt);
      this.update();
   }

   update() {
      this.bodyElmt.innerHTML = "";

      this.bodyElmt.appendChild(this.uiCmptStyleElmt);
   }
}