import { CmptRawSET } from "./sub_component/CmptRawSET.js";
import { FeatureImplementableInFutureError } from "../../error/FeatureImplementableInFutureError.js";

export class CmptRawBUSH {
	constructor() {
		this.cmptRawSET = new CmptRawSET();
	}

	addCmptRaw({ cmptRaw }) {
		return this.cmptRawSET.addCmptRaw({
			cmptRaw: cmptRaw,
		});
	}

	removeCmptRawByRefId({ cmptRawRefId }) {
		const cmptRaw = this.getCmptRawByRefId({
			cmptRawRefId: cmptRawRefId,
		});

		if (!cmptRaw) return false;
		return this.removeCmptRaw({ cmptRaw: cmptRaw });
	}

	removeCmptRaw({ cmptRaw }) {
		if (cmptRaw.attachingPoint.isAttached) {
			const cmptRawParentHook = this.getCmptRawParentHook({
				cmptRaw: cmptRaw,
			});
			if (cmptRawParentHook) {
				cmptRawParentHook.attacher.detach(cmptRaw.attachingPoint);
			}
		}
		
		return this.cmptRawSET.removeCmptRaw({ cmptRaw: cmptRaw });
	}

	moveCmptRaw({ cmptRaw, parentCmptRaw, hookName }) {
		throw new FeatureImplementableInFutureError();
		// Steps todo
		// Step1: detach given cmptRaw from old parentCmptRaw-hook
		// Strp2: detach any attached attachable form parentCmptRaw-hook.attacher
		// Step3: attach given cmptRaw from new parentCmptRaw-hook
	}

	getCmptRawByRefId({ cmptRawRefId }) {
		return this.cmptRawSET.getCmptRawByRefId({
			cmptRawRefId: cmptRawRefId,
		});
	}

	getAllCmptRawsInRefIdToCmptRawFormat() {
		return this.cmptRawSET.getAllCmptRawsInRefIdToCmptRawFormat();
	}

	getCmptRawParent({ cmptRaw }) {
		if (!cmptRaw.isAttached) return null;

		const attachedAttacher = cmptRaw.attachingPoint.attachedAttacher;
		if (!attachedAttacher) {
			console.warning("CmptRaw Parent is not register on 'RelationalUnitRefRegister'.");
			return null;
		}
		return attacher.location.cmptRaw;
	}

	getCmptRawParentHook({ cmptRaw }) {
		if (!cmptRaw.isAttached) return null;

		const attachedAttacher = cmptRaw.attachingPoint.attachedAttacher;
		if (!attachedAttacher) {
			console.warning("CmptRaw Parent is not register on 'RelationalUnitRefRegister'.");
			return null;
		}
		return attacher.location.cmptHookRaw;
	}

	reset() {
		this.cmptRawSET = new CmptRawSET();
	}
}
