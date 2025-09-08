import { Attacher } from "./Attacher.js";
import { insertItemAtIndexInArray } from "../../../utility/array.js";

export class MultiAPAttacher extends Attacher {
	static fromGeneDict({ geneDict, attacherLocationRaw }) {
		return new MultiAPAttacher({
			attacherLocationRaw: attacherLocationRaw,
			geneDict: geneDict,
		});
	}

	constructor({ attacherLocationRaw, geneDict }) {
		if (!geneDict) geneDict = {};
		super({
			attacherLocationRaw: attacherLocationRaw,
			geneDict: geneDict,
		});

		this.attacherType = "multiAp";
		// DEFINING PROPS
		this.attachedAPLocCmptRawRefIdList =
			geneDict.attachedAPLocCmptRawRefIdList || []; // Array [String]
	}

	attach({ attachingPoint }) {
		return this.attachAAttachingPoint({
			attachingPoint: attachingPoint,
		});
	}

	attachAAttachingPoint({ attachingPoint }) {
		// Updating given attachingPoint
		attachingPoint.resetAttachmentProps(false);
		attachingPoint.attachedAttacher = this;
		attachingPoint.attachedAttacherLocCmptRawRefId =
			this.location.cmptRawRefId;
		attachingPoint.attachedAttacherLocHookName = this.location.hookName;
		attachingPoint.isAttached = true;

		// // Updating given attachin-point attaching index
		// if (attachingPoint.attachedAtIndex < 0)
		// 	attachingPoint.attachedAtIndex = 0;
		// else if (
		// 	attachingPoint.attachedAtIndex >
		// 	this.attachedAPLocCmptRawRefIdList.length
		// )
		// 	attachingPoint.attachedAtIndex =
		// 		this.attachedAPLocCmptRawRefIdList.length;

		// Updating this.attached-Attaching point Location CmptRawRefId
		insertItemAtIndexInArray({
			index: attachingPoint.attachedAtIndex,
			item: attachingPoint.location.cmptRawRefId,
			arr: this.attachedAPLocCmptRawRefIdList,
		});

		// // Updating each attached attaching-point attaching index
		// for (let i = 0; i < this.attachedAPLocCmptRawRefIdList.length; i++) {
		// 	const attachingPoint = this.attachedAPLocCmptRawRefIdList[i];
		// 	attachingPoint.attachedAtIndex = i;
		// }
		this.isAttached = true;
	}

	detach({ attachingPoint }) {
		return this.detachFromAttachingPoint({
			attachingPoint: attachingPoint,
		});
	}

	detachFromAttachingPoint({ attachingPoint }) {
		if (!this.isAttached) return false;
		if (
			!this.attachedAPLocCmptRawRefIdList.includes(
				attachingPoint.location.cmptRawRefId
			)
		)
			return true;
			
		// Updating given attachingPoint
		attachingPoint.resetAttachmentProps(false);

		// Updating this.attached-Attaching point Location CmptRawRefId
		this.attachedAPLocCmptRawRefIdList =
			this.attachedAPLocCmptRawRefIdList.filter(
				(cmptRawRefId) =>
					cmptRawRefId !== attachingPoint.location.cmptRawRefId
			);
		this.isAttached = false;
	}

	resetAttachmentProps() {
		super.resetAttachmentProps();
		this.attachedAPLocCmptRawRefIdList = [];
	}

	toGeneDict() {
		const geneDict = super.toGeneDict();
		geneDict["attachedAPLocCmptRawRefIdList"] =
			this.attachedAPLocCmptRawRefIdList;
		return geneDict;
	}
}
