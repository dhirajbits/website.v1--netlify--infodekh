import { CmptNodeSET } from "./CmptSET.js";
import { NodeNotFoundInTREEError } from "../../error/NodeNotFoundInTREEError.js";


export class CmptTREE {
	constructor({ cmptSet }) {
		this.cmptNodeSET = null; // CmptSET //
		this.inactiveCmptNodes = []; // Array //

		// Assigning props
		this.cmptNodeSET = this._createCmptNodeSETObj();
	}

	isCmptNodeExistsInTREE({ cmptNode }) {
		return this.cmptNodeSET.isCmptNodeExistsInSET({
			cmptNode: cmptNode,
		});
	}

	activateInactiveCmptNodes() {
		for (let cmptNode of this.inactiveCmptNodes) {
			// TODO
		}
	}

	addCmptNode({ cmptNode }, activate = true) {
		if (this.isCmptNodeExistsInTREE({ cmptNode: cmptNode })) return true;

		if (activate) {
			// TODO
		}

		return this.cmptNodeSET.addCmptNode({ cmptNode: cmptNode });
	}

	removeCmptNode({ cmptNode }) {
		if (!this.isCmptNodeExistsInTREE({ cmptNode: cmptNode })) return true;

		return this.cmptNodeSET.removeCmptNode({ cmptNode: cmptNode });
	}

	attachCmptNode({ cmptNode, parentCmptNode, hookName }) {
		if (!parentCmptNode || !hookName) return false;
		if (!this.isCmptNodeExistsInTREE({ cmptNode: cmptNode })) {
			throw new NodeNotFoundInTREEError(
				"Can't attach CmptNode in NodeTREE --> Node not found."
			);
		}

		// TODO
	}

	detachCmptNode({ cmptNode }) {
		if (!this.isCmptNodeExistsInTREE({ cmptNode: cmptNode })) {
			throw new NodeNotFoundInTREEError(
				"Can't detach CmptNode from NodeTREE --> Node not found."
			);
		}

		// TODO
	}

	moveCmptNode({ cmptNode, parentCmptNode, hookName }) {
		const success = this.detachCmptNode({ cmptNode: cmptNode });

		if (success) {
			return this.attachCmptNode({
				cmptNode: cmptNode,
				parentCmptNode: parentCmptNode,
				hookName: hookName,
			});
		}

      return false;
	}

	_createCmptNodeSETObj() {
		return new CmptNodeSET();
	}
}
