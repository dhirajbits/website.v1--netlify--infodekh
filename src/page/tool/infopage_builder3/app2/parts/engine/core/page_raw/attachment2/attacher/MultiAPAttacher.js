import { AttacherDetachingError } from "../../../error/AttacherDetachingError.js";
import { insertItemAtIndexInArray } from "../../../utility/array.js";
import { RawAttachingPoint } from "../attaching_point/RawAttachingPoint.js";
import { RawAttacher } from "./RawAttacher.js";


export class MultiAPAttacher extends RawAttacher {

   static fromGeneDict({geneDict, location, relationalUnitRefRegister}) {
      return new MultiAPAttacher({
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

      this.attacherType = "MULTI_AP"; //STRING
      this.attachedAPRefIdList = []; //Array[String]

      // ASSINGING PROPERTIES (FROM GENEDICT)
      if (geneDict) {
         this.attachedAPRefIdList = geneDict.attachedAPRefIdList;
      }
   }


   get attachedAPList() {
      return this.attachedAPRefIdList.map((refId) => this.relationalUnitRefRegister.get({refId: refId}));
   }

   attach(attachingPoint) {
      if (!(attachingPoint instanceof RawAttachingPoint))
         throw new AttacherAttachingError("'MultiAPAttacher' is only attachable to  'RawAttachingPoint' object.");

      // Update this attacher
      const newAttacherAttachingIndex = this._getNewAttachingPointAttachingIndex({attachingPoint});

      insertItemAtIndexInArray({
         index: newAttacherAttachingIndex,
         item: attachingPoint.refId,
         arr: this.attachedAPRefIdList,
      });

      this._updateEachAttachedAPAttachingIndex();
      super._updateAttachment(true);

      // Update attachingPoint attachment props
      // -- already done by this._updateEachAttachedAPAttachingIndex();
   }

   detach(attachingPoint) {
      if (!(attachingPoint instanceof RawAttachingPoint))
         throw new AttacherDetachingError("'MultiAPAttacher' can only detach from  'RawAttachingPoint' object.");

      if (!this._isAllAttachedAPRegistered()) {
         throw new AttacherDetachingError("All attached 'AttachingPoint' is not registered (on 'RelationalUnitRefRegister') yet.");
      }

      if (!this.attachedAPRefIdList.includes(attachingPoint.refId)) return;

      return this._detach({attachingPoint});
   }

   detachFromAny() {
      if (!this._isAllAttachedAPRegistered()) {
         throw new AttacherDetachingError("All attached 'AttachingPoint' is not registered (on 'RelationalUnitRefRegister') yet.");
      }

      for (let attachingPoint of this.attachedAPList) {
         this._detach({attachingPoint});
      }
   }

   reset() {
      this.resetAttachment();
   }

   resetAttachment() {
      this.attachedAPRefIdList = [];
      super._resetAttachment();
   }

   toGeneDict() {
      const geneDict = super.toGeneDict();
      geneDict["attachedAPRefIdList"] = this.attachedAPRefIdList;
      return geneDict;
   }

   _detach({attachingPoint}) {
      // Update this attacher
      this.attachedAPRefIdList = this.attachedAPRefIdList.filter((refId) => refId !== attachingPoint.refId);

      this._updateEachAttachedAPAttachingIndex();
      if (!this.attachedAPRefIdList.length) this._resetAttachment();

      // Update attachingPoint attachment props
      attachingPoint.resetAttachment();
   }


   _getNewAttachingPointAttachingIndex({attachingPoint}) {
      const MAX_POSSIBLE_INDEX = this.attachedAPRefIdList.length;
      let attachingIndex = attachingPoint.attachedAtIndex;

      if (attachingPoint.attachedAtIndex < 0)
         attachingIndex = 0;
      else if (attachingPoint.attachedAtIndex >=  MAX_POSSIBLE_INDEX)
         attachingIndex = MAX_POSSIBLE_INDEX;
      
      return attachingIndex;
   }

   _updateEachAttachedAPAttachingIndex() {
      let index = 0;
      for (let attachingPoint of this.attachedAPList) {
         if (attachingPoint) attachingPoint.updateAttachment({
            attacher: this,
            attachedAtIndex: index,
         });
         index += 1;
      }
   }

   _isAllAttachedAPRegistered() {
      for (let ap of this.attachedAPList) {
         if (!ap) return false;
      }
   }
}