import { CmptDocSET } from "./sub_component/CmptDocSET.js";

export class CmptDocBUSH {
	constructor() {
		this.cmptDocSET = new CmptDocSET();
	}

	addCmptDoc({ cmptDoc, parentCmptDoc, hookName, parentCmptHookDoc }) {
		// Adding to CmptDocSET
		this.cmptDocSET.addCmptDoc({ cmptDoc });

		parentCmptHookDoc = this._findParentCmptHookDoc({
			parentCmptDoc,
			hookName,
			parentCmptHookDoc,
		});

		if (parentCmptHookDoc)
			parentCmptHookDoc.attacher.attach({
				attachingPoint: cmptDoc.attachingPoint,
			});
	}

	removeCmptDoc({ cmptDoc }) {
		// Detach given cmptDoc
		const parentCmptHookDoc = this.getParentCmptHookDoc({ cmptDoc });
		if (parentCmptHookDoc) {
			parentCmptHookDoc.detach({
				attachingPoint: cmptDoc.attachingPoint,
			}); // Don't use method:detachFromAny --dueto-> it may attached to multiAP att.
		}

		this.cmptDocSET.removeCmptDoc({ cmptDoc });
	}

	removeCmptDocByRefId({ cmptDocRefId }) {
		const cmptDoc = this.getCmptDocByRefId({
			cmptDocRefId: cmptDocRefId,
		});

		if (cmptDoc) this.removeCmptDoc({ cmptDoc });
	}

	moveCmptDoc({ cmptDoc, parentCmptDoc, hookName, parentCmptHookDoc }) {
		// Remove cmptDoc
		this.removeCmptDoc({ cmptDoc });
		this.addCmptDoc({
			cmptDoc,
			parentCmptDoc,
			hookName,
			parentCmptHookDoc,
		});
	}

	getCmptDocByRefId({ cmptDocRefId }) {
		return this.cmptDocSET.getCmptDocByRefId({ cmptDocRefId });
	}

	getAllCmptDocInRefIdToCmptDocFormat() {
		return this.cmptDocSET.getAllCmptDocInRefIdToCmptDocFormat();
	}

	getParentCmptDoc({ cmptDoc }) {
		if (cmptDoc.attachingPoint.isAttached) {
			return cmptDoc.attachingPoint.attachedAttacher.location.cmptDoc;
		}
		return null;
	}

	getParentCmptHookDoc({ cmptDoc }) {
		if (cmptDoc.attachingPoint.isAttached) {
			return cmptDoc.attachingPoint.attachedAttacher.location.cmptHookDoc;
		}
		return null;
	}

	_findParentCmptHookDoc({ parentCmptDoc, hookName, parentCmptHookDoc }) {
		if (parentCmptHookDoc) return parentCmptHookDoc;
		if (!parentCmptDoc) return null;
		return parentCmptDoc.getHook({ hookName });
	}
}
