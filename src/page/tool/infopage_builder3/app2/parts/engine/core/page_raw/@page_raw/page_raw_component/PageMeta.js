export class PageMeta {
	static fromGeneDict({ geneDict }) {
		return new PageMeta({ geneDict: geneDict });
	}

	constructor({ geneDict }) {
		if (!geneDict) geneDict = {};

		this.title = geneDict.title || ""; // String
	}

	toGeneDict() {
		return {
			title: this.title,
		};
	}
}
