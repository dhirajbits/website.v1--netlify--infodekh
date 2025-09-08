import { RelationalUnitLocation } from "../location/RelationalUnitLocation";
import { RelationalUnit } from "../relational_unit/RelationalUnit.js";

export class AttachingPoint extends RelationalUnit {
	/**
	 *
	 * @param {Object} param
	 * @param {RelationalUnitLocation} param.location
	 * @param {Boolean} param.isAttached
	 */
	constructor({ location, isAttached }) {
		super({ location, isAttached });
		this.attachedAttacher = null; //Attacher
		this.attachedAtIndex = 0; //Integer
		this._resetAttachmentProps();
	}

	/**
	 * @description Set new attachment (attacher) ,even if it is already attached. (index in param is optional and recomanded not to provide)
	 * @param {Object} param
	 * @param {DocAttacher} param.attacher
	 * @param {Number} param.index
	 */
	setAttachment({ attacher, index }) {
		super.setAttachment();
		this.attachedAttacher = attacher;
		this.setAttachingIndex({ index });
	}

	/**
	 * @description Set Attaching index of attachingPoint in multiAPAttacher object
	 * @param {Object} param
	 * @param {Integer} param.index
	 * @return {null}
	 */
	setAttachingIndex({ index }) {
		if (typeof index === "number") this.attachedAtIndex = index;
	}

   /**
    * @description Unattach from any attacher (does not update attacher)
    * @returns {null}
    */
   reset() {
      return this.resetAttachment();
   }

	/**
	 * @description Resets attachingPoint attachment props that leads to unattachment from any attacher, (it does not update any props of attacher)
	 * @return {null}
	 */
	resetAttachment() {
		super.resetAttachment();
		this._resetAttachmentProps();
	}

	/**
	 * @description Deeply reset this object that leads to like newly created object, (it does not update any props of attacher)
	 * @return {null}
	 */
	deepResetAttachment() {
		super.resetAttachment();
		this._resetAttachmentProps(true);
	}

	/**
	 * @description reset all props that is related to attached attacher and make this object like new object
	 * @param {Boolean} index
	 * @return {null}
	 */
	_resetAttachmentProps(index = false) {
		this.attachedAttacher = null;
		if (index) this.attachedAtIndex = 0;
	}
}
