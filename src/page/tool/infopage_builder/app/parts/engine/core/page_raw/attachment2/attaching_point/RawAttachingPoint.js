import { RawRelationalUnit } from "../relational_unit/RawRelationalUnit.js";


export class RawAttachingPoint extends RawRelationalUnit {
   
   /**
    * @description Create 'RawAttachingPoint' object from geneDict.
    * @param {Object} param
    * @param {Object} param.geneDict
    * @param {RawAttachingPointLocation} param.location
    * @param {RelationalUnitRefRegister} param.relationalUnitRefRegister
    * @returns {RawAttachingPoint}
    */
   static fromGeneDict({geneDict, location, relationalUnitRefRegister}){
      return new RawAttachingPoint({
         location: location,
         relationalUnitRefRegister: relationalUnitRefRegister,
         geneDict: geneDict,
      });
   }

   /**
    * @param {Object} param
    * @param {RawAttachingPointLocation} param.location
    * @param {RelationalUnitRefRegister} param.relationalUnitRefRegister
    * @param {Object} param.geneDict
    */
   constructor({location, relationalUnitRefRegister, geneDict}) {
      super({
         relationalUnitRefRegister: relationalUnitRefRegister,
         geneDict: geneDict,
      });

      this.location = location; //RawAttachingPointLocation
      this.attachedAttacherRefId = null; //String
      this.attachedAtIndex = null; //Integer


      // ASSIGNING PROPERTY (FROM GENEDICT)
      if (geneDict) {
         this.attachedAttacherRefId = geneDict.attachedAttacherRefId;
         this.attachedAtIndex = geneDict.attachedAtIndex;
      }
   }

   /**
    * @description Get attached 'Attacher' object.
    */
   get attachedAttacher() {
      return this.relationalUnitRefRegister.get({
         refId: this.refId,
      })
   }

   /**
    * @description Updates attachment props of attachingPoint. NOTE: It does not update props of attacher.
    * @param {Object} param
    * @param {RawAttacher} param.attacher
    * @param {Number} param.attachedAtIndex
    */
   updateAttachment({attacher, attachedAtIndex}) {
      if (attacher) this.attachedAttacherRefId = attacher.refId;
      if (typeof attachedAtIndex === "number") 
         this.attachedAtIndex = attachedAtIndex;
      super._updateAttachment(true);
   }

   /**
    * @description Reset attachingPoint to make is unattached from any attacher. NOTE: It does not updates atttachedAttacher & does not updates attachingIndex of self.
    */
   resetAttachment() {
      this.attachedAttacherRefId = null;
      super._resetAttachment();
   }

   /**
    * @description Reset attachingPoint to make is unattached from any attacher. It also resets its attachedAtIndex. NOTE: It does not updates atttachedAttacher.
    */
   deepResetAttachment() {
      this.attachedAtIndex = 0;
      this.resetAttachment();
   }

   /**
    * @description Generates geneDict of this object.
    * @returns {Object}
    */
   toGeneDict() {
      const geneDict = super.toGeneDict();
      geneDict["attachedAttacherRefId"] = this.attachedAttacherRefId;
      geneDict["attachedAtIndex"] = this.attachedAtIndex;
      return geneDict;
   }
}