export class PageGeneralInfo {
	static fromGeneDict({ geneDict }) {
		return new PageGeneralInfo({ geneDict: geneDict });
	}
	constructor({ geneDict }) {
		if (!geneDict) geneDict = {};

		this.pageName = geneDict.pageName || "Untitled"; // String
		this.pageType = geneDict.pageType || ""; //String;
		this.createdAt = geneDict.createdAt || Date.now(); // Number
		this.lastUpdatedAt = geneDict.lastUpdatedAt || Date.now(); // Number
	}

	updateLastUpdatedAt() {
		this.lastUpdatedAt = Date.now();
		return false;
	}

	reset() {}

	toGeneDict() {
		return {
			pageName: this.pageName,
			pageType: this.pageType,
			createdAt: this.createdAt,
			lastUpdatedAt: this.lastUpdatedAt,
		};
	}
}
