export class AttachingPointLocationRaw {
	static fromGeneDict({ geneDict }) {
		return new AttachingPointLocationRaw(geneDict);
	}

	constructor({ cmptRawRefId }) {
		this.cmptRawRefId = cmptRawRefId; // String
	}

	toGeneDict() {
		return {
			cmptRawRefId: this.cmptRawRefId,
		};
	}
}
