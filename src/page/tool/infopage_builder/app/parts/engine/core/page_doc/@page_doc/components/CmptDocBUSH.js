import { CmptDocSET } from "./sub_component/CmptDocSET.js";

export class CmptDocBUSH {
	constructor() {
		this.tmptStyleElmt = document.createElement("div");
		this.cmptStyleElmt = document.createElement("div");
		this.cmptStyleConfigElmt = document.createElement("div");
		this.bodyElmt = document.createElement("div");
		this.includedTmpts = []; // Array[Tmpt]
		this.cmptDocSET = new CmptDocSET(); // CmptDocSET

		this.bodyElmt.style.minHeight = "100%";
	}

	addCmptDoc({ cmptDoc }) {
		if (cmptDoc.constructor.name !== "CmptDoc") return;
		if (this.cmptDocSET.isExists({cmptDoc})) return;

		// Adding to CmptDocSET
		this.cmptDocSET.addCmptDoc({ cmptDoc });

		// Updating this htmlDoc
		
		// -- Adding tmpt style
		if (!this.includedTmpts.includes(cmptDoc.tmpt)) {
			this.includedTmpts.push(cmptDoc.tmpt);
			this.tmptStyleElmt.appendChild(cmptDoc.tmpt.style.bodyElmt);
		}

		// -- Adding cmpt style
		this.cmptStyleElmt.appendChild(cmptDoc.style.bodyElmt);

		// -- Adding cmpt style config 
		// this.cmptStyleConfigElmt.appendChild(cmptDoc.styleConfig.bodyElmt);

		// -- Adding html elmt
		this.bodyElmt.appendChild(cmptDoc.bodyElmt);
	}

	addCmptDoc2({ cmptDoc, parentCmptDoc, hookName, parentCmptHookDoc }) {
		if (cmptDoc.constructor.name !== "CmptDoc") return;
		if (this.cmptDocSET.isExists({cmptDoc})) return;

		// Adding to CmptDocSET
		// this.cmptDocSET.addCmptDoc({ cmptDoc });
		this.addCmptDoc({cmptDoc});

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

		// -- Removing cmpt style
		this.cmptStyleElmt.appendChild(cmptDoc.style.bodyElmt);

		// -- Removing cmpt style config 
		// this.cmptStyleConfigElmt.appendChild(cmptDoc.styleConfig.bodyElmt);

	}

	removeCmptDocByRefId({ cmptDocRefId }) {
		const cmptDoc = this.getCmptDocByRefId({
			cmptDocRefId: cmptDocRefId,
		});

		if (cmptDoc) this.removeCmptDoc({ cmptDoc });
	}

	moveCmptDoc({ cmptDoc, parentCmptDoc, hookName, parentCmptHookDoc }) {
		// Remove cmptDoc
		// this.removeCmptDoc({ cmptDoc });
		// this.addCmptDoc({
		// 	cmptDoc,
		// 	parentCmptDoc,
		// 	hookName,
		// 	parentCmptHookDoc,
		// });

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
