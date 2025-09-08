import { IllegalHookAttachmentError } from "../error/IllegalHookAttachmentError";

export class MaleAttacher {
   constructor ({cmptHook}) {
      this.cmptHook = cmptHook; //CmptHook
      this.hookType = cmptHook.type //String
      this.isAttached  = false; //Boolean
      this.attachedToCmptRefId = null; //String (Cmpt.refId)
      this.attachedToText = null; //String
      this.attachedToHtml = null; //String
      this.attachedToCmptRefIds = []; //Array[String]
   }

   attachTo ({value}) {}

   attachToCmpt ({cmpt}) {
      if (this.hookType !== "cmpt") 
         throw new IllegalHookAttachmentError();

      // Updating this attacher properties
      this._resetAttachmentProperties();
      this.attachedToCmptRefId = cmpt.refId
      this.isAttached = true;

      // Updating given cmpt attacher properties
      cmpt.attacher.isAttached = true;
      cmpt.attacher.attachedAtCmptRefId = this.cmptHook.cmpt.refId;
      cmpt.attacher.attachedAtHookName = this.cmptHook.name;

      return false;
   }

   attachToText ({text}) {
      if (this.hookType !== "data") 
         throw new IllegalHookAttachmentError();

      // Updating this attacher properties
      this._resetAttachmentProperties();
      this.attachedToText = text;
      this.isAttached = true;

      // Updating given cmpt attacher properties
      cmpt.attacher.isAttached = true;
      cmpt.attacher.attachedAtCmptRefId = this.cmptHook.cmpt.refId;
      cmpt.attacher.attachedAtHookName = this.cmptHook.name;

      return false;
   }

   _resetAttachmentProperties () {
      this.isAttached = false;
      this.attachedToCmptRefId = null;
      this.attachedToText = null;
      this.attachedToHtml = null;
      this.attachedToCmptRefIds = [];
   }
}