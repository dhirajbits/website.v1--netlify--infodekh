import { DocAttacher } from "./DocAttacher.js";


export class HtmlAttacher extends DocAttacher {
   constructor({seed_attacher, location, relationalUnitRefRegister}) {
      super({
         seed_rawAttacher: seed_attacher,
         location: location,
         relationalUnitRefRegister: relationalUnitRefRegister,
      });

      this.seed_htmlAttacher = seed_attacher; //PageRaw:HtmlAttacher
      // this.updateHtmlDoc();
   }

   get attacherType() {
      return this.seed_htmlAttacher.attacherType;
   }

   get attachedHtml() {
      return this.seed_htmlAttacher.attachedHtml;
   }

   attach(html) {
      const error = this.seed_htmlAttacher.attach(html);
      if(!error) this.updateHtmlDoc();
   }

   detach(html) {
      const error = this.seed_htmlAttacher.detach(html)
      if (!error) this.updateHtmlDoc();
   }

   detachFromAny() {
      const error = this.seed_htmlAttacher.detachFromAny();
      if (!error) this.updateHtmlDoc();
   }

   updateHtmlDoc() {
      this.location.cmptHookDoc.bodyElmt.innerHTML = this.attachedHtml;
   }
}