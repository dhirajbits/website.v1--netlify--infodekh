import { Viewbox0 } from "./Viewbox0.js";


export class Viewbox1__withHtmlDoc extends Viewbox0 {
   constructor({panel}) {
      super({panel});

      this.htmlDoc = document;

      this._titleElmt = this.htmlDoc.querySelector(".VIEWBOX--title"); //:HtmlElmt
      this._styleElmt = this.htmlDoc.querySelector(".VIEWBOX--style"); //:HtmlElmt
      this._bodyElmt = this.htmlDoc.querySelector(".VIEWBOX--body"); //:HtmlElmt

      if(!this._titleElmt) 
         throw new Error("'Viewbox' title element (in html document) not found.");

      if (!this._styleElmt)
         throw new Error("'Viewbox' style element (in html document) not found.")

      if (!this._bodyElmt) 
         throw new Error("'Viewbox' body element (in html document) not found.")
   }

   reset() {
      this._resetTitleElmt();
      this._resetBodyElmt();
   }

   _resetTitleElmt() {
      this._titleElmt.textContent = "";
   }

   _updateTitleElmt({title}) {
      this._titleElmt.textContent = title;
   }

   _resetStyleElmt() {
      this._styleElmt.innerHTML = "";
   }

   _updateStyleElmt({elmt}) {
      this._resetStyleElmt();
      this._styleElmt.appendChild(elmt);
   }

   _resetBodyElmt() {
      this._bodyElmt.innerHtml = "";
   }

   _updateBodyElmt({elmt}) {
      this._resetBodyElmt();
      this._bodyElmt.appendChild(elmt);
   }
}