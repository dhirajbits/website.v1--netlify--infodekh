import { NotImplementedError } from "../../error/NotImplementedError.js";
import { CoderLogicalError } from "../../error/CoderLogicalError.js";

export class Attacher {
	constructor({ attacherLocationRaw, geneDict }) {
		if (!geneDict) geneDict = {};
		this.location = attacherLocationRaw; // AttacherLocation
		this.isAttached = geneDict.isAttached || false; // Boolean
	}

	attachAny(attachable) {
		switch (this.attacherType) {
			case "ap":
				return this.attach({ attachingPoint: attachable });
				break;
			case "html":
				return this.attach({ html: attachable });
				break;
			case "text":
				return this.attach({ text: attachable });
				break;
			case "multiAP":
				return this.attach({ attachingPoint: attachable });
				break;
			default:
				throw new CoderLogicalError("Known attacher type.");
				break;
		}
	}

   detachAny(detachable) {
      switch (this.attacherType) {
			case "ap":
				return this.detach({ attachingPoint: detachable });
				break;
			case "html":
				return this.detach({ html: detachable });
				break;
			case "text":
				return this.detach({ text: detachable });
				break;
			case "multiAP":
				return this.detach({ attachingPoint: detachable });
				break;
			default:
				throw new CoderLogicalError("Known attacher type.");
				break;
		}
   }

	attach() {
		throw NotImplementedError("'attach' method is not implemented.");
	}

	detach() {
      throw NotImplementedError("'detach' method in not implemented.");
   }

	resetAttachmentProps() {
		this.isAttached = false;
	}

	toGeneDict() {
		return {
			isAttached: this.isAttached,
		};
	}
}
