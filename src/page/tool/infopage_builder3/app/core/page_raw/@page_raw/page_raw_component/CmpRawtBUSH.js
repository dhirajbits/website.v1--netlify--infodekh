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
		// TODO -- detach given cmptRaw from parentCmptRaw-hook
		const cmptRawParentHook = this.getCmptRawParentHook({
			cmptRaw: cmptRaw,
		});
		if (cmptRawParentHook) {
			cmptRawParentHook.attacher.detachAny(cmptRaw.attachingPoint);
		}
		return this.cmptRawSET.removeCmptRaw({ cmptRaw: cmptRaw });
	}

	moveCmptRaw({ cmptRaw, parentCmptRaw, hookName }) {
		throw new FeatureImplementableInFutureError();
		// TODO -- detach given cmptRaw from old parentCmptRaw-hook
		// TODO -- detach any attached attachable form parentCmptRaw-hook.attacher
		// TODO -- attach given cmptRaw from new parentCmptRaw-hook
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
}
