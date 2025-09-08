import { DocAttacher } from "./DocAttacher.js";


export class MultiAPAttacher extends DocAttacher {
   constructor({seed_attacher, location, relationalUnitRefRegister}) {
      super({
         seed_rawAttacher: seed_attacher,
         location: location,
         relationalUnitRefRegister: relationalUnitRefRegister,
      });

      this.seed_multiAPAttacher = seed_attacher; //MultiAPAttacher
      this._updateHtmlDoc();
   }

   get attacherType() {
      return this.seed_multiAPAttacher.attacherType;
   }

   get attachedAPRefIdList() {
      return this.seed_multiAPAttacher.attachedAPRefIdList;
   }

   get attachedAPList() {
      const docAttachingPointList = [];
      
      for (let refId of this.attachedAPRefIdList) {
         const docAttachingPoint = this.relationalUnitRefRegister.get({
            refId: refId
         });
         docAttachingPointList.push(docAttachingPoint);
      }
      return docAttachingPointList;
   }

   attach(attachingPoint) {
      const error = this.seed_multiAPAttacher.attach(
         attachingPoint.seed_rawAttachingPoint
      );
      if (!error) this._updateHtmlDoc();
   }

   detach(attachingPoint) {
      const error = this.seed_multiAPAttacher.detach(
         attachingPoint.seed_docAttachingPoint
      );
      if (!error) this._updateHtmlDoc();
   }

   detachFromAny() {
      const error = this.seed_multiAPAttacher.detachFromAny();
      if (!error) this._updateHtmlDoc();
   }

   _updateHtmlDoc() {
      this.location.cmptHookDoc.bodyElmt.innerHTML = "";
      for (let ap of this.attachedAPList) {
         ap.location.cmptDoc.fitInsideElmt({
            elmt: this.location.cmptHookDoc.bodyElmt,
         });
      }
   }
}
