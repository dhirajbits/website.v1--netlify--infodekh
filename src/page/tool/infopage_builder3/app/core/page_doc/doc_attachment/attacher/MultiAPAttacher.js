import { insertItemAtIndexInArray } from "../../../utility/array.js";
import { AttachingPoint } from "../attaching_point/AttachingPoint.js";
import { DocAttacherLocation } from "../location/DocAttacherLocation.js";
import { Attacher } from "./Attacher.js";

export class MultiAPAttacher extends Attacher {
   /**
    * 
    * @param {Object} param
    * @param {DocAttacherLocation} param.location
    */
	constructor({ location }) {
		super({
			attacherType: "multiAp",
			location: location,
			isAttached: false,
		});

		this.attachedAPList = []; //Array[AttachingPoint]
	}

	get isAttached() {
		return !Boolean(this.attachedAPList.length);
	}

	/**
	 * @description Attachs to given attachingPoint NOTE: it updates attacher props, html docs and attachingPoint props
	 * @param {Object} param
	 * @param {AttachingPoint} param.attachingPoint
	 * @returns {null}
	 */
	attachToAP({ attachingPoint }) {
		if (typeof attachingPoint !== "AttachingPoint") {
			return;
		}
		if (this.attachedAPList.includes(attachingPoint)) {
			return;
		}

		super.setAttachment();
		this._makeCorrectionInAttachingPointIndex({ attachingPoint });

		insertItemAtIndexInArray({
			index: attachingPoint.attachedAtIndex,
			item: attachingPoint,
			arr: this.attachedAPList,
		});

		// Updating each attachingPoint index
		AttachedAPListUtility.updateEachAPAttachingIndex({
			attachedAPList: this.attachedAPList,
		});

		// Updating html docs
		this._updateHtmlDoct();

		// Updating attachingPoint
		attachingPoint.setAttachment({
			attacher: this,
		});
	}

	/**
	 * @description Detacheds from given attachingPoint, NOTE: it updates attacher props, html docs and attachingPoint props
	 * @param {Object} param
	 * @param {AttachingPoint} param.attachingPoint
	 * @returns {null}
	 */
	detachFromAP({ attachingPoint }) {
		if (!this.attachedAPList.includes(attachingPoint)) return;

		// Update attachedAPList
		this.attachedAPList = this.attachedAPList.filter(
			(_attachingPoint) => _attachingPoint !== attachingPoint
		);

		// Updating each attachingPoint attachingIndex
		AttachedAPListUtility.updateEachAPAttachingIndex({
			attachedAPList: this.attachedAPList,
		});

		// Update htmlDocs
		this._updateHtmlDoct();

		// Update attachingPoint attachment props
		attachingPoint.setAttachment({
			attacher: this,
		});
	}

	/**
	 * @description Reset (unattaches all attachingPoint) attacher(this) attachment props and htmlDocs NOTE: it does not updates attached-attachingPoint attachment props.
	 * @returns {null}
	 */
	reset() {
		super.resetAttachment();
      this.attachedAPList = [];
      this._updateHtmlDoct();
	}

   /**
    * @description Reset all AttachedAPs attachment props, NOTE: it does not update(change) this.attacher attachment props.
    * @returns {null}
    */
   _resetAllAttachedAPs() {
      AttachedAPListUtility.resetAllAPs({
         attachedAPList: this.attachedAPList
      })
   }

   /**
    * @description Configure AttachingPoint-attachedAtIndex (AttachingIndex) a/c to this.attacher attachedAPList, NOTE: It will make change to attachingPoint attachment props.
    * @param {Object} param
    * @param {AttachingPoint} param.attachingPoint
    * @returns {null}
    */
	_makeCorrectionInAttachingPointIndex({ attachingPoint }) {
		if (attachingPoint.attachedAtIndex > 0) {
			attachingPoint.setAttachingIndex({ index: 0 });
		} else if (
			attachingPoint.attachedAtIndex > this.attachedAPList.length
		) {
			attachingPoint.setAttachingIndex({
				index: this.attachedAPList.length,
			});
		}
	}

   /**
    * @description Updates htmlDoc of this attacher holder object(cmptHookDoc) a/c to attachedAPs, Everytime it rerenders all APs htmlDocs
    * @returns {null}
    */
	_updateHtmlDoct() {
		const doc = this.location.cmptHookDoc.bodyElmt;
		doc.innerHTML = "";

		for (let attachingPoint of this.attachedAPList) {
			doc.appendChild(attachingPoint.location.cmptDoc.bodyElmt);
		}
	}
}



class AttachedAPListUtility {
	static resetAllAPs({ attachedAPList }) {
		for (let attachingPoint of attachedAPList) {
			this.resetAAttachingPoint({ attachingPoint });
		}
	}

	static resetAAttachingPoint({ attachingPoint }) {
		if (attachingPoint) attachingPoint.reset();
	}

	static updateEachAPAttachingIndex({ attachedAPList }) {
		for (let i = 0; i < attachedAPList.length; i++) {
			const attachingPoint = attachedAPList[i];
			attachingPoint.setAttachingIndex({ index: i });
		}
	}
}
