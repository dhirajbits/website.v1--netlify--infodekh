import { AttacherAttachingError } from "../../../error/AttacherAttachingError.js";
import { AttacherDetachingError } from "../../../error/AttacherDetachingError.js";
import { RawAttachingPoint } from "../attaching_point/RawAttachingPoint.js";
import { RawAttacher } from "./RawAttacher.js";


export class APAttacher extends RawAttacher {

   static fromGeneDict({geneDict, location, relationalUnitRefRegister}) {
      return new APAttacher({
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

      this.attacherType = "AP";
      this.attachedAPRefId = null; //String

      // ASSIGNING PROPERTIES (FROM GENEDICT)
      if (geneDict) {
         this.attachedAPRefId = geneDict.attachedAPRefId;
      }
   }

   get attachedAP() {
      return this.relationalUnitRefRegister.get({
         refId: this.attachedAPRefId,
      });
   }

   attach(attachingPoint) {
      if (!(attachingPoint instanceof RawAttachingPoint))
         throw new AttacherAttachingError("APAttacher is only attachable to  'RawAttachingPoint' object.");

      // Detach from current attachingPoint
      this.detachFromAny();

      // Attach to given attachingPoint
      // -- Updating given attachingPoint attachment props
      attachingPoint.updateAttachment({ attacher: this });

      // -- Updating this attacher attachment props
      this._updateAttachment({ attachingPoint });
   }

   detach(attachingPoint) {
      if (!(attachingPoint instanceof RawAttachingPoint))
         throw new AttacherDetachingError("APAttacher is detachable to  only 'RawAttachingPoint' object.");

      if (!this.attachedAPRefId) return; 
      if (this.attachedAPRefId !== attachingPoint.refId) return;

      if (!this.attachedAP) {
         throw new AttacherDetachingError("Old attached 'AttachingPoint' did not found in 'RelationalUnitRefRegister'.");
      }

      // Updating attached attachingPoint attachment props
      this.attachedAP.resetAttachment();
      
      // Updating this attacher attachment props
      this.reset();

   }

   detachFromAny() {
      if (!this.attachedAPRefId) return;

      if (!this.attachedAP) {
         throw new AttacherDetachingError("Old attached 'AttachingPoint' did not found in 'RelationalUnitRefRegister'.");
      }

      return this.detach(this.attachedAP);
   }

   reset() {
      return this.resetAttachment();
   }

   resetAttachment() {
      this.attachedAPRefId = null;
      super._resetAttachment();
   }

   toGeneDict() {
      const geneDict = super.toGeneDict();
      geneDict["attachedAPRefId"] = this.attachedAPRefId;
      return geneDict;
   }

   _updateAttachment({attachingPoint}) {
      this.attachedAPRefId = attachingPoint.refId;
      super._updateAttachment(true);
   }
}