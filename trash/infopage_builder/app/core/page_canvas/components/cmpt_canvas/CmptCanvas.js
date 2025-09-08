export class CmptCanvas {
	constructor() {
		this.rootCmpts = [];
		this.rootCmptParents = [];
		this.cmptRefIdToCmpt = {};

		this.bodyElmt = document.createElement("div");
		this.bodyElmt.classList.add("--cmptcanvas--");
	}

	isCmptOnCanvas({ cmpt }) {
		return cmpt.refId in this.cmptRefIdToCmpt;
	}

	addCmpt({ cmpt, parentCmpt, hookName }) {
		if (this.isCmptOnCanvas({ cmpt }) || !cmpt) {
			return;
		}

		if (!parentCmpt) {
			this._addCmptWithNoParentAndNoHookname({
				cmpt: cmpt,
			});
		} else {
			if (hookName) {
				this._addCmptWithParentAndNoHookName();
			} else {
				this._addCmptWithParentAndHookName({
					cmpt: cmpt,
					parentCmpt: parentCmpt,
					hookName: hookName,
				});
			}
		}
	}

	removeCmpt({ cmpt }) {
		if (!this.allCmpts.includes(cmpt) || !cmpt) {
			return;
		}

		// Finding parent cmpt of given cmpt
		let parentCmpt = this.cmptRefIdToCmpt[cmpt.refId];

		// Finding parent cmpt from root cmpts
		if (!parentCmpt) {
			for (let cmpt of this.rootCmptParents) {
				if (cmpt.refId === cmpt.attachedToCmptRefId) {
					parentCmpt = cmpt;
					break;
				}
			}
		}

		// Handling unsuccess in find parent cmpt
		if (!parentCmpt) {
			throw new Error(
				"Can't remove cmpt from canvas --> parent cmpt not found."
			);
		}
	}

	moveCmpt() {}

	_addCmptWithNoParentAndNoHookname({ cmpt }) {
		this.rootCmpts.append(cmpt);
		this.cmptRefIdToCmpt[cmpt.refId] = cmpt;
	}

	_addCmptWithParentAndNoHookName() {
		throw new Error("Can't add cmpt on cmpt-canvas without hookName.");
	}

	_addCmptWithParentAndHookName({ cmpt, parentCmpt, hookName }) {
		const hook = parentCmpt.hooks[hookName];
		if (!hook) {
			throw new Error(
				"Can't add cmpt on cmpt-canvas --> hook of given hookName is not present on parent cmpt."
			);
		}
		hook.attach({ value: cmpt });
		this.cmptRefIdToCmpt[cmpt.refId] = cmpt;
	}
}
