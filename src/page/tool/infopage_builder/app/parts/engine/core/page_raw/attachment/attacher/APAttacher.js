import { Attacher } from "./Attacher.js";

export class APAttacher extends Attacher {
	static fromGeneDict({ geneDict, attacherLocationRaw }) {
		return new APAttacher({
			geneDict: geneDict,
			attacherLocationRaw: attacherLocationRaw,
		});
	}

	constructor({ attacherLocationRaw, geneDict }) {
		super({
			attacherLocationRaw: attacherLocationRaw,
			geneDict: geneDict,
		});

		this.attacherType = "ap";

		if (geneDict) {
			this._constructFromGeneDict({ geneDict: geneDict });
		}

		// DEFINING PROPERTIES
		else {
			this.attachedAPLocCmptRawRefId = ""; // String
		}
	}

	attach({ attachingPoint }) {
		return this.attachToAttachingPoint({
			attachingPoint: attachingPoint,
		});
	}

	attachToAttachingPoint({ attachingPoint }) {
		// Updating this attachment props
		this.resetAttachmentProps();
		this.attachedAPLocCmptRawRefId = attachingPoint.location.cmptRawRefId;
		this.isAttached = true;

		// Updating given attaching point
		attachingPoint.resetAttachmentProps(false);
		attachingPoint.attachedAttacherLocCmptRawRefId =
			this.location.cmptRawRefId;
		attachingPoint.attachedAttacherLocHookName = this.location.hookName;
		attachingPoint.isAttached = true;
	}

	detach({ attachingPoint }) {
		return this.detachFromAttachingPoint({
			attachingPoint: attachingPoint,
		});
	}

	detachFromAttachingPoint({ attachingPoint }) {
		if (!this.isAttached) return false;
		if (
			this.attachedAPLocCmptRawRefId !==
			attachingPoint.location.cmptRawRefId
		)
			return true;
		// Updating this attachment props
		this.resetAttachmentProps();

		// Updating given attaching point
		attachingPoint.resetAttachmentProps(false);
	}

	resetAttachmentProps() {
		super.resetAttachmentProps();
		this.attachedAPLocCmptRawRefId = "";
	}

	toGeneDict() {
		const geneDict = super.toGeneDict();
		geneDict["attachedAPLocCmptRawRefId"] = this.attachedAPLocCmptRawRefId;
		return geneDict;
	}

	_constructFromGeneDict({ geneDict }) {
		this.attachedAPLocCmptRawRefId =
			geneDict.attachedAPLocCmptRawRefId || "";
	}
}
