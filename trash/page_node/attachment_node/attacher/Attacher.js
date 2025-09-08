import { NotImplementedError } from "../../../page_raw/error/NotImplementedError.js";

export class Attacher {
   constructor ({seed_attacher, nodeAttacherLocation}) {
      this.seed_attacher = seed_attacher; //PageRaw:Attacher
      this.location = nodeAttacherLocation; // NodeAttacherLocation
      this.isAttached = this.seed_attacher.isAttached; //Boolean
   }

   activate({getCmptNodeByCmptRawRefId}) {
      this.location.activate({
         getCmptNodeByCmptRawRefId: getCmptNodeByCmptRawRefId
      });
   }

   attach() {
      throw new NotImplementedError();
   }

   detach() {
      throw new NotImplementedError();
   }

   resetAttachmentProps() {
      this.isAttached = false;
   }
}