import { Attacher } from "./Attacher.js";

export class HtmlAttacher extends Attacher {
	static fromGeneDict({ geneDict }) {
		return new HtmlAttacher({
			geneDict: geneDict,
			attacherLocationRaw: attacherLocationRaw,
		});
	}
	constructor({ attacherLocationRaw, geneDict }) {
		super({
			attacherLocationRaw: attacherLocationRaw,
			geneDict: geneDict,
		});

		this.attacherType = "html";

		if (geneDict) {
			this._constructFromGeneDict({
				geneDict: geneDict,
			});
		}

		// DEFINING PROPS
		else {
			this.html = ""; // String
		}
	}

	attach({ html }) {
		return this.attachToHtml({ html: html });
	}

	attachToHtml({ html }) {
		if ((html === null) || (html === undefined)) return true;
		this.resetAttachmentProps();
		this.html = html;
		this.isAttached = true;
	}

	detach({html}) {
		return this.detachFromHtml({
			html: html,
		});
	}

	detachFromHtml({html}) {
		if (this.html === html) {
			this.resetAttachmentProps();
		}
		return true;
	}

	resetAttachmentProps() {
		super.resetAttachmentProps();
		this.html = "";
	}

	toGeneDict() {
		const geneDict = super.toGeneDict();
		geneDict["html"] = this.html;
		return geneDict;
	}

	_constructFromGeneDict({ geneDict }) {
		this.html = geneDict.html || "";
	}
}
