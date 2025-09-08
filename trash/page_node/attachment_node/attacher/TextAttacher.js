import { AttacherNotActivatedError } from "../../../error/AttacherNotActivatedError.js";
import { Attacher } from "./Attacher.js";


export class TextAttacher extends Attacher {
   constructor({seed_textAttacher, nodeAttacherLocation}) {
      super({
         seed_attacher: seed_textAttacher,
         nodeAttacherLocation: nodeAttacherLocation
      });

      this.isActivated = false;
      this.seed_textAttacher = seed_textAttacher;
      this.attacherType = this.seed_textAttacher.attacherType;
      this.attachedText = this.seed_textAttacher.text;
   }

   get isTextAttacher() {
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

   attach ({text}) {
      return this.attachToText({
         text: text
      });
   }

   attachToText({text}) {
      if (!this.isActivated) {
         const msg = "Can't attach text."
         throw new AttacherNotActivatedError(msg);
      }

      const error = this.seed_textAttacher.attach({text: text});
      if (error) return error;

      this.attachedText = text;
      this.isAttached = true;
   }

   detach({text}) {
      this.detachFromText({text: text});
   }

   detachFromText({text}) {
      if (!this.isActivated) {
         const msg = "Can't detach text."
         throw new AttacherNotActivatedError(msg);
      }

      if (text !== this.attachedText) return
      const error = this.seed_textAttacher.detach({text: text});
      if (error) return error;

      this.attachedText = "";
      this.isAttached = false;
   }

   resetAttachmentProps() {
      this.seed_textAttacher.resetAttachmentProps(false);
      super.resetAttachmentProps();
      this.attachedText = "";
   }

   resetAttachment() {
      return this.resetAttachmentProps();
   }

   getAttachment() {
      return this.attachedText;
   }

}