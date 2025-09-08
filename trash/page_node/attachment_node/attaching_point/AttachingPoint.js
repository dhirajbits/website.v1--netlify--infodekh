import { AttachingPointActivationError } from "../../../error/AttachingPointActivationError.js";

export class AttachingPoint {
   constructor ({seed_attachingPoint, nodeAttachingPointLocation}) {
      this.seed_attachingPoint = seed_attachingPoint; //PageRaw:AttachingPoint

      this.isActivated = false; //Boolean
      this.location = nodeAttachingPointLocation; //NodeAttachingPointLocation
      this.isAttached = false; //Boolean
      this.attachedAttacher = null; //Attacher
      this._attachedAtIndex = 0; //Integer
   }

   get attachedAtIndex() {
      return this._attachedAtIndex;
   }

   set attachedAtIndex(value) {
      this._attachedAtIndex = value;
      this.seed_attachingPoint.attachedAtIndex = value;
   }

   
   activate ({getCmptNodeByCmptRawRefId}) {
      this.location.activate({
         getCmptNodeByCmptRawRefId: getCmptNodeByCmptRawRefId
      });
      this.isAttached = this.seed_attachingPoint.isAttached;
      this._attachedAtIndex = this.seed_attachingPoint.attachedAtIndex;

      
      if (this.isAttached) {
         const cmptNode = getCmptNodeByCmptRawRefId({
            cmptRawRefId: this.seed_attachingPoint.attachedAttacherLocCmptRawRefId,
         });

         if (!cmptNode) {
            const msg = "CmptNode not found.";
            throw new AttachingPointActivationError(msg);
         }

         const hookName = this.seed_attachingPoint.attachedAttacherLocHookName;
         const hookNode = cmptNode.hookNameToHookNode[hookName];

         this.attachedAttacher = hookName.attacher;
      }

      this.isActivated = true;
   }

   /**
    * 
    * @param {Boolean} deep 
    * @param {Boolean} seed 
    */
   resetAttachmentProps(deep=false, seed=true) {
      if(seed) this.seed_attachingPoint.resetAttachmentProps(deep);
      this.isAttached = false; //Boolean
      this.attachedAttacher = null; //Attacher
      if (deep) this._attachedAtIndex = 0; //Integer
   }

   
   resetAttachment(seed=true) {
      this.resetAttachmentProps(false, seed);
   }

}