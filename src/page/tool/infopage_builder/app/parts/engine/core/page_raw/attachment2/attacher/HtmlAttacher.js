import { RawAttacher } from "./RawAttacher.js";


export class HtmlAttacher extends RawAttacher {

   static fromGeneDict({geneDict, location, relationalUnitRefRegister}) {
      return new HtmlAttacher({
         location: location,
         relationalUnitRefRegister: relationalUnitRefRegister,
         geneDict: geneDict,
      });
   }
   
   constructor({location, relationalUnitRefRegister, geneDict}) {
      super({
         location: location,
         relationalUnitRefRegister: relationalUnitRefRegister,
         geneDict: geneDict,
      });

      this.attacherType = "HTML"; //STRING
      this.attachedHtml = ""; //String

      if (geneDict) {
         this.attachedHtml = geneDict.attachedHtml;
      }
   }

   attach(html) {
      if (typeof html !== "string") return;
      this._updateAttachment({html: html});
   }

   detach(html) {
      if (this.attachedHtml !== html) return;
      this._resetAttachment();
   }

   detachFromAny() {
      this._resetAttachment();
   }

   reset() {
      return this._resetAttachment();
   }

   _updateAttachment({html}) {
      this.attachedHtml = html;
      super._updateAttachment(true);
   }

   _resetAttachment() {
      this.attachedHtml = "";
      super._resetAttachment();
   }

   toGeneDict() {
      const geneDict = super.toGeneDict();
      geneDict["attachedHtml"] = this.attachedHtml;
      return geneDict;
   }
}