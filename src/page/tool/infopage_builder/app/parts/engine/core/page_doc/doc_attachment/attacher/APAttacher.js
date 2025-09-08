import { AttachingPoint } from "../attaching_point/AttachingPoint.js";
import { Attacher } from "./Attacher.js";

export class APAttacher extends Attacher {
   constructor({location}) {
      super({
         attacherType: "ap",
         location: location,
         isAttached: false,
      });

      this.attachedAP = null;
   }

   /**
    * @description Attach to given attachingPoint, if it is already attached to another, it will detach from that and then attach, NOTE: it updates attacher props, html docs and attachingPoint props
    * @param {Object} param
    * @param {AttachingPoint} param.attachingPoint
    * @returns {null}
    */
   attachToAP({attachingPoint}) {
      if (typeof attachingPoint !== "AttachingPoint") {return}
      if (this.attachedAP === attachingPoint) {return}

      // Detaching from old attachingPoint
      if (this.isAttached) {
         this.detachFromAP({
            attachingPoint: this.attachToAP,
         });
      }

      // Attaching with new attachingPoint
      super.setAttachment();
      this.attachedAP = attachingPoint;

      // -- Updating Attacher holder HtmlDocument
      this.location.cmptHookDoc.bodyElmt.appendChild(
         attachingPoint.location.cmptDoc.bodyElmt
      )

      // -- Updating attachingPoint
      attachingPoint.setAttachment({
         attacher: this,
      })
   }

   /**
    * @description Detach from given attachingPoint if it is attached to that, NOTE: it updates attacher props, html docs and attachingPoint props
    * @param {Object} param
    * @param {AttachingPoint} param.attachingPoint
    * @returns {null}
    */
   detachFromAP({attachingPoint}) {
      if (!attachingPoint) return;
      if (this.attachedAP === attachingPoint) {
         this.reset();
         this._resetAttachedAP();
      }
   }

   /**
    * @description Reset this attacher attachment props and html docs NOTE: it does not updates attached-attachingPoint attachment props.
    * @returns {null}
    */
   reset() {
      if (this.attachedAP) {
         this.location.cmptHookDoc.bodyElmt.removeChild(
            this.attachedAP.location.cmptDoc.bodyElmt
         );
      }
      super.resetAttachment();
      this.attachedAP = null;
   }

   /**
    * @description Resets attached AttachingPoint attachment props but not htmldocs (attachingPoint have no htmldoc to update), NOTE: it does not update attacher(this) attachment props.
    * @returns {null}
    */
   _resetAttachedAP() {
      if (this.attachedAP) {
         this.attachedAP.reset();
      }
   }
}