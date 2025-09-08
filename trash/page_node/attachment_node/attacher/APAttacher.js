import { AttacherActivationError } from "../../../error/AttacherActivationError.js";
import { AttacherAttachingError } from "../../../error/AttacherAttachingError.js";
import { AttacherDetachingError } from "../../../error/AttacherDetachingError.js";
import { Attacher } from "./Attacher.js";

//#############################################

export class APAttacher extends Attacher {
	constructor({ seed_apAttacher, nodeAttacherLocation }) {
		super({
			seed_attacher: seed_apAttacher,
			nodeAttacherLocation: nodeAttacherLocation,
		});

		this.seed_apAttacher = seed_apAttacher; //PageRaw:APAttacher
		this.isActivated = false; //Boolean
		this.attacherType = this.seed_apAttacher.attacherType; //String
		this.attachedAP = null; //PageNode:APAttacher
	}

	get isAPAttacher() {
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

		const cmptRawRefId = this.seed_apAttacher.attachedAPLocCmptRawRefId;

		if (!cmptRawRefId) {
			this.isActivated = true;
			return;
		}

		const cmptNode = getCmptNodeByCmptRawRefId({
			cmptRawRefId: cmptRawRefId,
		});

		if (!cmptNode && cmptRawRefId) {
			const msg = "Unable to get attached CmptNode.";
			throw new AttacherActivationError(msg);
		}

		this.attachedAP = cmptNode.attachingPoint;
		this.isActivated = true;
	}

	attach({ attachingPoint }) {
		return this.attachToAttachingPoint({
			attachingPoint: attachingPoint,
		});
	}

	attachToAttachingPoint({ attachingPoint }) {
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
		const error = this.seed_apAttacher.attach({
			attachingPoint: attachingPoint.seed_attachingPoint,
		});
		if (error) {
			const msg = "Error generated in seed apAttacher";
			throw new AttacherAttachingError(msg);
		}

		// Update given attachingPoint
		attachingPoint.isAttached = true;
		attachingPoint.attachedAttacher = this;

		// Update this attacher
		this.attachedAP = attachingPoint;
		this.isAttached = true;
	}

	detach({ attachingPoint }) {
		return this.detachFromAttachingPoint({
			attachingPoint: attachingPoint,
		});
	}

	detachFromAttachingPoint({ attachingPoint }) {
		// Grading against inactive attacher and attachingPoint
		if (!this.isActivated) {
			const msg = "'attacher' not activated.";
			throw new AttacherDetachingError(msg);
		}

		if (!attachingPoint.isActivated) {
			const msg = "'attachingPoint' is not activated.";
			throw new AttacherDetachingError(msg);
		}

		// Check for attachment status of this attacher
		if (this.attachedAP !== attachingPoint) return;

		// Updating seed_apAttacher
		const error = this.seed_apAttacher.detach({
			attachingPoint: attachingPoint.seed_attachingPoint,
		});
		if (error) {
			const msg = "Error generated in seed apAttacher";
			throw new AttacherDetachingError(msg);
		}

		// Update given attachingPoint
		attachingPoint.resetAttachment(false);

		// Update this attacher
		this.resetAttachment(false);
	}

	resetAttachmentProps(seed = true) {
		if (seed) this.seed_apAttacher.resetAttachmentProps(false);
		super.resetAttachmentProps();
		this.attachedAP = null;
	}

	resetAttachment(seed = true) {
		return this.resetAttachmentProps(seed);
	}

   getAttachment() {
      return this.attachedAP;
   }
}
