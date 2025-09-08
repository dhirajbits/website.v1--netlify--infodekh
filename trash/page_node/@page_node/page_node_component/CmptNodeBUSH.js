import { CmptNodeSET } from "./sub_component/CmptNodeSET.js";
import { FeatureImplementableInFutureError } from "../../../error/FeatureImplementableInFutureError.js";
import { CmptNotActivatedError } from "../../../error/CmptNotActivatedError.js";

export class CmptNodeBUSH {
	constructor() {
		this.cmptNodeSET = new CmptNodeSET();
		this.unactivatedCmptNodeList = []; //Array[CmptNode]
	}

   get isActivated() {
      return !Boolean(this.unactivatedCmptNodeList.length);
   }

   activate(deep=false) {
      if (deep) this.reactivateAllCmptNode();
      else this.activateUnactivatedCmptNodes();
   }

   reactivateAllCmptNode() {
      const cmptNodeRefIdToCmptNode = this.getAllCmptNodesInRefIdToCmptNodeFormat();

      for (let cmptNodeRefId in cmptNodeRefIdToCmptNode) {
         const cmptNode = cmptNodeRefIdToCmptNode[cmptNodeRefId];
         cmptNode.activate({
            getCmptNodeByCmptRawRefId: this.getCmptNodeByCmptRawRefId.bind(this),
         });
      }
   }

	activateUnactivatedCmptNodes() {
		while (this.unactivatedCmptNodeList.length) {
			const cmptNode = this.unactivatedCmptNodeList.pop();
			cmptNode.activate({
				getCmptNodeByCmptRawRefId: this.getCmptNodeByCmptRawRefId.bind(this),
			});
		}
	}

	getCmptNodeByCmptRawRefId({ cmptRawRefId }) {
		return this.cmptNodeSET.getCmptNodeByRefId({
			cmptNodeRefId: cmptRawRefId,
		});
	}

	addCmptNode({ cmptNode }, activate) {
		if (activate) {
			cmptNode.activate({
				getCmptNodeByCmptRawRefId: this.getCmptNodeByCmptRawRefId,
			});
		} else this.unactivatedCmptNodeList.push(cmptNode);

		return this.cmptNodeSET.addCmptNode({
			cmptNode: cmptNode,
		});
	}

	removeCmptNodeByRefId({ cmptNodeRefId }) {
		const cmptNode = this.getCmptNodeByRefId({
			cmptNodeRefId: cmptNodeRefId,
		});

      if (!cmptNode) return false;


		return this.removeCmptNode({ cmptNode: cmptNode });
	}

	removeCmptNode({ cmptNode }) {
      // Removing cmptNode from unactivatedCmptNodeList
      if (this.unactivatedCmptNodeList.includes(cmptNode)) {
         this.unactivatedCmptNodeList = this.unactivatedCmptNodeList.filter(
            (_cmptNode) => _cmptNode !== cmptNode
			);
		}

      // // Call seed to remove cmptRaw
      // this.seed_cmptRawBUSH.removeCmptRaw({
      //    cmptRaw: cmptNode.seed_cmptRaw,
      // })
      
      // TODO -- detach given cmptNode from parentCmptNode-hook
		const cmptNodeParentHook = this.getCmptNodeParentHook({
			cmptNode: cmptNode,
		});

		if (cmptNodeParentHook) {
			cmptNodeParentHook.attacher.detachAny(cmptNode.attachingPoint);
		}
		return this.cmptNodeSET.removeCmptNode({ cmptNode: cmptNode });
	}

	
	moveCmptNode({ cmptNode, parentCmptNode, hookName }) {
		throw new FeatureImplementableInFutureError();
		// TODO -- detach given cmptNode from old parentCmptNode-hook
		// TODO -- detach any attached attachable form parentCmptNode-hook.attacher
		// TODO -- attach given cmptNode from new parentCmptNode-hook
	}

	getCmptNodeByRefId({ cmptNodeRefId }) {
		return this.cmptNodeSET.getCmptNodeByRefId({
			cmptNodeRefId: cmptNodeRefId,
		});
	}

	getAllCmptNodesInRefIdToCmptNodeFormat() {
		return this.cmptNodeSET.getAllCmptNodesInRefIdToCmptNodeFormat();
	}

	getCmptNodeParent({ cmptNode }) {
      if (!cmptNode.isActivated)
         throw new CmptNotActivatedError("Can't get parent cmptNode.")
		if (!cmptNode.isAttached) return null;

		return cmptNode.attachingPoint.attachedAttacher.location.cmptNode;
	}

	getCmptNodeParentHook({ cmptNode }) {
		if (!cmptNode.isActivated)
         throw new CmptNotActivatedError("Can't get parent cmptNode.")
      if (!cmptNode.isAttached) return null;

		return cmptNode.attachingPoint.attachedAttacher.cmptHookNode;
	}
}
