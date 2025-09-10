import { DocAttacher } from "./DocAttacher.js";

export class APAttacher extends DocAttacher {
	constructor({ seed_attacher, location, relationalUnitRefRegister }) {
		super({
			seed_rawAttacher: seed_attacher,
			location: location,
			relationalUnitRefRegister: relationalUnitRefRegister,
		});

      this.seed_apAttacher = seed_attacher
      // this.updateHtmlDoc();
	}

   get attachedAP() {
      return this.relationalUnitRefRegister.get({
         refId: this.seed_apAttacher.attachedAPRefId
      });
   }

   attach(attachingPoint) {
      // Updating seed
      const error = this.seed_apAttacher.attach(attachingPoint.seed_rawAttachingPoint)
      if (error) return;

      // Updating htmlDoc
      this.updateHtmlDoc();
   }

   detach(attachingPoint) {
      // Update seed
      const error = this.seed_apAttacher.detach(attachingPoint.seed_rawAttachingPoint);
      if (error) return;

      // Updating htmlDoc
      this.updateHtmlDoc();
   }

   detachFromAny() {
      // Update seed
      const error = this.seed_apAttacher.detachFromAny();

      // Update htmlDoc
      this.updateHtmlDoc();
   }
   
   updateHtmlDoc() {
      this.location.cmptHookDoc.bodyElmt.innerHTML = "";
      
      if (this.attachedAP) {
         this.attachedAP.location.cmptDoc.fitInsideElmt({
            elmt: this.location.cmptHookDoc.bodyElmt
         })
      }
   }
}
