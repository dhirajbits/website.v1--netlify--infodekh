import { Attacher } from "./Attacher.js";
import { DocAttacherLocation } from "../location/DocAttacherLocation.js";

export class HtmlAttacher extends Attacher {
   /**
    * @param {Object} param
    * @param {DocAttacherLocation} param.location
    */
   constructor({ location }) {
      super({
         attacherType: "html",
         location: location,
         isAttached: false,
      });

      this.attachedHtml = ""; //String
   }

   /**
    * @description Attaches htmlcode to attacher
    * @param {Object} param 
    * @param {String} param.html 
    * @returns {null}
    */
   attach({html}) {
      return this.attachToHtml({html});
   }

   /**
    * @description Attaches htmlcode to attacher
    * @param {Object} param 
    * @param {String} param.html 
    * @returns {null}
    */
   attachToHtml({html}) {
      if (typeof html !== "string") {return}
      super.setAttachment();
      this.attachedHtml = html;

      //Updating CmptHookDoc bodyElmt
      this.location.cmptHookDoc.bodyElmt.innerHTML = html;
   }

   /**
    * @description Detached htmlcode from attacher
    * @param {Object} param 
    * @param {String} param.html 
    * @returns {null}
    */
   detach({html}) {
      return this.detachFromHtml({html});
   }

   /**
    * @description Detached htmlcode from attacher
    * @param {Object} param 
    * @param {String} param.html 
    * @returns {null}
    */
   detachFromHtml({html}) {
      if (html === this.attachedHtml) {
         return this.reset();
      }
   }

   /**
    * @description Resets attacher to make is unattached from anything.
    * @param {Object} param 
    * @param {String} param.html 
    * @returns {null}
    */
   reset() {
      super.resetAttachment();
      this.attachedHtml = "";
      this.location.cmptHookDoc.innerHTML = "";
   }
}
