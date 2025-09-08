import { DocAttacherLocation } from "../location/DocAttacherLocation.js";
import { Attacher } from "./Attacher.js";

export class TextAttacher extends Attacher {
	/**
	 * @param {Object} param
	 * @param {DocAttacherLocation} param.location
	 */
	constructor({ location }) {
		super({
			attacherType: "text",
			location: location,
			isAttached: false,
		});

      this.attachedText = ""; //String
	}

   /**
    * @description Attaches text to attacher
    * @param {Object} param 
    * @param {String} param.text 
    * @returns {null}
    */
   attach({text}) {
      return this.attachToText({text});
   }

   /**
    * @description Attaches text to attacher
    * @param {Object} param 
    * @param {String} param.text 
    * @returns {null}
    */
   attachToText({text}) {
      if (typeof text !== "string") {return}
      super.setAttachment();
      this.attachedText = text;

      //Updating CmptHookDoc bodyElmt
      this.location.cmptHookDoc.bodyElmt.textContent = text;
   }

   /**
    * @description Detached text from attacher
    * @param {Object} param 
    * @param {String} param.text 
    * @returns {null}
    */
   detach({text}) {
      return this.detachFromText({text});
   }

   /**
    * @description Detached text from attacher
    * @param {Object} param 
    * @param {String} param.text 
    * @returns {null}
    */
   detachFromText({text}) {
      if (text === this.attachedText) {
         return this.reset();
      }
   }

   /**
    * @description Resets attacher to make is unattached from anything.
    * @param {Object} param 
    * @param {String} param.text 
    * @returns {null}
    */
   reset() {
      super.resetAttachment();
      this.attachedText = "";
      this.location.cmptHookDoc.bodyElmt.textContent = "";
   }
}
