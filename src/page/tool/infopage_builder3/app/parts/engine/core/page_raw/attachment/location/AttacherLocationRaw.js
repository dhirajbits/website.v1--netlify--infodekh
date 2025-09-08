export class AttacherLocationRaw {
	static fromGeneDict({ geneDict }) {
		return new AttacherLocationRaw(geneDict);
	}

	constructor({ cmptRawRefId, hookName }) {
		this.cmptRawRefId = cmptRawRefId; // String
		this.hookName = hookName; // String
	}

	toGeneDict() {
		return {
			cmptRawRefId: this.cmptRawRefId,
			hookName: this.hookName,
		};
	}
}
