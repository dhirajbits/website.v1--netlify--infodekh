import { DocAttacher } from "./DocAttacher.js";


export class TextAttacher extends DocAttacher {
   constructor({seed_attacher, location, relationalUnitRefRegister}) {
      super({
         seed_rawAttacher: seed_attacher,
         location: location,
         relationalUnitRefRegister: relationalUnitRefRegister,
      });

      this.seed_textAttacher = seed_attacher; //PageRaw:TextAttacher
      // if (this.isAttached) this.updateHtmlDoc();
   }

   get attacherType() {
      return this.seed_textAttacher.attacherType;
   }

   get attachedText() {
      return this.seed_textAttacher.attachedText;
   }

   attach(text) {
      const error = this.seed_textAttacher.attach(text);
      if(!error) this.updateHtmlDoc();
   }

   detach(text) {
      const error = this.seed_textAttacher.detach(text)
      if (!error) this.updateHtmlDoc();
   }

   detachFromAny() {
      const error = this.seed_textAttacher.detachFromAny();
      if (!error) this.updateHtmlDoc();
   }

   updateHtmlDoc() {
      this.location.cmptHookDoc.bodyElmt.innerHTML = this.attachedText.replaceAll(
         "\n",
         "<br>"
      );
   }
}