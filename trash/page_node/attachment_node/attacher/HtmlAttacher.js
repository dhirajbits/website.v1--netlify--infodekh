import { AttacherNotActivatedError } from "../../../error/AttacherNotActivatedError.js";
import { Attacher } from "./Attacher.js";


export class HtmlAttacher extends Attacher {
   constructor({seed_htmlAttacher, nodeAttacherLocation}) {
      super({
         seed_attacher: seed_htmlAttacher,
         nodeAttacherLocation: nodeAttacherLocation
      });

      this.isActivated = false;
      this.seed_htmlAttacher = seed_htmlAttacher;
      this.attacherType = this.seed_htmlAttacher.attacherType;
      this.attachedHtml = this.seed_htmlAttacher.html;
   }

   get isHtmlAttacher() {
      return true;
   }

   get attachment() {
      return this.getAttachment();
   }

   activate({getCmptNodeByCmptRawRefId}) {
      if (this.isActivated) return;
      
      super.activate({
         getCmptNodeByCmptRawRefId: getCmptNodeByCmptRawRefId
      });
      
      this.isActivated = true;
   }

   attach ({html}) {
      return this.attachToHtml({
         html: html
      });
   }

   attachToHtml({html}) {
      if (!this.isActivated) {
         const msg = "Can't attach html."
         throw new AttacherNotActivatedError(msg);
      }

      const error = this.seed_htmlAttacher.attach({html: html});
      if (error) return error;

      this.attachedHtml = html;
      this.isAttached = true;
   }

   detach({html}) {
      this.detachFromHtml({html: html});
   }

   detachFromHtml({html}) {
      if (!this.isActivated) {
         const msg = "Can't detach html."
         throw new AttacherNotActivatedError(msg);
      }

      if (html !== this.attachedHtml) return
      const error = this.seed_htmlAttacher.detach({html: html});
      if (error) return error;

      this.attachedHtml = "";
      this.isAttached = false;
   }

   resetAttachmentProps() {
      this.seed_htmlAttacher.resetAttachmentProps(false);
      super.resetAttachmentProps();
      this.attachedHtml = "";
   }

   resetAttachment() {
      return this.resetAttachmentProps();
   }

   getAttachment() {
      return this.attachedHtml;
   }

}