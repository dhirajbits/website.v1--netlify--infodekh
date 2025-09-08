import { Attacher } from "./Attacher.js";

export class TextAttacher extends Attacher {
	static fromGeneDict({ geneDict, attacherLocationRaw }) {
		return new TextAttacher({
			geneDict: geneDict,
			attacherLocationRaw: attacherLocationRaw,
		});
	}

	constructor({ attacherLocationRaw, geneDict }) {
		if (!geneDict) geneDict = {};
		super({
			attacherLocationRaw: attacherLocationRaw,
			geneDict: geneDict,
		});

		this.attacherType = "text";

		// DEFINING PROPS
		this.text = geneDict.text || ""; // String
	}

	attach({ text }) {
		return this.attachToText({ text: text });
	}

	attachToText({ text }) {
		if ((text === null) || (text === undefined)) return true;

		this.resetAttachmentProps();
		this.text = text;
		this.isAttached = true;
	}

	detach({text}) {
		return this.detachFromText({text: text});
	}

	detachFromText({text}) {
		if (this.text === text) {
			this.resetAttachmentProps();
		}
		return true;
	}

	resetAttachmentProps() {
		super.resetAttachmentProps();
		this.text = "";
	}

	toGeneDict() {
		const geneDict = super.toGeneDict();
		geneDict["text"] = this.text;
		return geneDict;
	}
}
