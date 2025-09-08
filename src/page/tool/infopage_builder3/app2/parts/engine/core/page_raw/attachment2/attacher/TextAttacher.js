import { RawAttacher } from "./RawAttacher.js";


export class TextAttacher extends RawAttacher {

   static fromGeneDict ({geneDict, location, relationalUnitRefRegister}) {
      return new TextAttacher({
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

      this.attacherType = "TEXT"; //STRING
      this.attachedText = ""; //String

      if (geneDict) {
         this.attachedText = geneDict.attachedText;
      }
   }

   attach(text) {
      if (typeof text !== "string") return;
      this._updateAttachment({text: text});
   }

   detach(text) {
      if (this.attachedText !== text) return;
      this._resetAttachment();
   }

   detachFromAny() {
      this._resetAttachment();
   }

   reset() {
      return this._resetAttachment();
   }

   _updateAttachment({text}) {
      this.attachedText = text;
      super._updateAttachment(true);
   }

   _resetAttachment() {
      this.attachedText = "";
      super._resetAttachment();
   }

   toGeneDict() {
      const geneDict = super.toGeneDict();
      geneDict["attachedText"] = this.attachedText;
      return geneDict;
   }
}