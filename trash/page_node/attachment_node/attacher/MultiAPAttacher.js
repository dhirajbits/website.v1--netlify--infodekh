import { AttacherActivationError } from "../../../error/AttacherActivationError.js";
import { AttacherAttachingError } from "../../../error/AttacherAttachingError.js";
import { AttacherDetachingError } from "../../../error/AttacherDetachingError.js";
import { insertItemAtIndexInArray } from "../../../utility/array.js";
import { Attacher } from "./Attacher.js";

//###################################################

export class MultiAPAttacher extends Attacher {
	constructor({ seed_multiAPAttacher, nodeAttacherLocation }) {
		super({
			seed_attacher: seed_multiAPAttacher,
			nodeAttacherLocation: nodeAttacherLocation,
		});

		this.seed_multiAPAttacher = seed_multiAPAttacher; //PageRaw:MultiAPAttacher
		this.attacherType = seed_multiAPAttacher.attacherType; //String

		this.isActivated = false; //Boolean
		this.attachedAPList = []; //Array[PageNode:AttachingPoint]
	}

	get isMultiAPAttacher() {
		return true;
	}

	get attachment() {
		return this.getAttachment();
	}

	activate({ getCmptNodeByCmptRawRefId }) {
		if (this.isActivated) return;

		super.activate({
			getCmptNodeByCmptRawRefId: getCmptNodeByCmptRawRefId,
		});

		const attachedCmptRawRefIdList =
			this.seed_multiAPAttacher.attachedAPLocCmptRawRefIdList;

		let index = 0;
		for (let cmptRawRefId of attachedCmptRawRefIdList) {
			const cmptNode = getCmptNodeByCmptRawRefId({
				cmptRawRefId: cmptRawRefId,
			});

			if (!cmptNode) throw new AttacherActivationError();

			const attachingPoint = cmptNode.attachingPoint;
			this.attachedAPList.push(attachingPoint);

			attachingPoint.attachedAtIndex = index;
			attachingPoint.isAttached = true;

			index += 1;
		}

		this.isActivated = true;
	}

	attach({ attachingPoint }) {
		this.attachAAttachingPoint({
			attachingPoint: attachingPoint,
		});
	}

	attachAAttachingPoint({ attachingPoint }) {
		// Grading against inactive attacher and attachingPoint
		if (!this.isActivated) {
			const msg = "'attacher' not activated.";
			throw new AttacherAttachingError(msg);
		}

		if (!attachingPoint.isActivated) {
			const msg = "'attachingPoint' is not activated.";
			throw new AttacherAttachingError(msg);
		}

		// Updating seed_apAttacher
		const error = this.seed_multiAPAttacher.attach({
			attachingPoint: attachingPoint.seed_attachingPoint,
		});
		if (error) {
			const msg = "Error generated in seed multiAPAttacher";
			throw new AttacherAttachingError(msg);
		}

		// Update given attachingPoint
		attachingPoint.isAttached = true;
		attachingPoint.attachedAttacher = this;

		// Update attachingPoint attached-index
		if (attachingPoint.attachedAtIndex < 0)
			attachingPoint.attachedAtIndex = 0;
		else if (attachingPoint.attachedAtIndex > this.attachedAPList.length)
			attachingPoint.attachedAtIndex = this.attachedAPList.length;

		// Update this attacher
		if (attachingPoint.attachedAtIndex === this.attachedAPList.length)
			this.attachedAPList.push(attachingPoint);
		else {
			insertItemAtIndexInArray({
				index: attachingPoint.attachedAtIndex,
				item: attachingPoint,
				arr: this.attachedAPList,
			});

			for (let i = 0; i < this.attachedAPList.length; i++) {
				this.attachedAPList[i].attachedAtIndex = i;
			}
		}
		this.isAttached = true;
	}

	detach({ attachingPoint }) {
		this.detachAAttachingPoint({
			attachingPoint: attachingPoint,
		});
	}

	detachAAttachingPoint({ attachingPoint }) {
		// Grading against inactive attacher and attachingPoint
		if (!this.isActivated) {
			const msg = "'attacher' not activated.";
			throw new AttacherDetachingError(msg);
		}

		if (!attachingPoint.isActivated) {
			const msg = "'attachingPoint' is not activated.";
			throw new AttacherDetachingError(msg);
		}

		// Check detachability
		if (!this.attachedAPList.includes(attachingPoint)) return;

		// Updating seed_multiAPAttacher
		const error = this.seed_multiAPAttacher.detach({
			attachingPoint: attachingPoint.seed_attachingPoint,
		});
		if (error) {
			const msg = "Error generated in seed multiAPAttacher";
			throw new AttacherDetachingError(msg);
		}

		// Update given attachingPoint
		attachingPoint.resetAttachment(true);

		// Update this attacher
		if (attachingPoint.attachedAtIndex === this.attachedAPList.length)
			this.attachedAPList.pop(attachingPoint);
		else {
			this.attachedAPList = this.attachedAPList.filter(
				(ap) => ap !== attachingPoint
			);

			for (let i = 0; i < this.attachedAPList.length; i++) {
				this.attachedAPList[i].attachedAtIndex = i;
			}
		}
		
      if (this.attachedAPList.length) this.isAttached = true;
      else this.isAttached = false;
	}

	resetAttachmentProps(deep = false, seed = true) {
      super.resetAttachmentProps();
      if (seed) this.seed_multiAPAttacher.resetAttachmentProps();
      this.attachedAPList = [];
   }

	resetAttachment(seed = true) {
      this.resetAttachmentProps(false, seed);
   }

	getAttachment() {
		return this.attachedAPList;
	}
}
