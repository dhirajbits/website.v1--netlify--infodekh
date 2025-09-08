import { CmptRawNotFoundError } from "../../../error/CmptRawNotFoundError.js";


export class NodeAttachingPointLocation {
   constructor({seed_attachingPointLocationRaw}) {
      this.seed_attachingPointLocationRaw = seed_attachingPointLocationRaw; //AttachingPointLocationRaw(PageRaw)
      this.isActivated = false;
      this.cmptNode = null;
   }

   activate({getCmptNodeByCmptRawRefId}) {
      if (this.isActivated) return;
      
      this.cmptNode = getCmptNodeByCmptRawRefId({
         cmptRawRefId: this.seed_attachingPointLocationRaw.cmptRawRefId,
      });
      
      if (!this.cmptNode) {
         msg = "Can't activate 'NodeAttachingPointLocation'  --> CmptRaw not found."
         throw new CmptRawNotFoundError(msg);
      }
      
      this.isActivated = true;
   }
}