export class TmptSET {
	static fromGeneDict({ geneDict, tmptHub }) {
		return new TmptSET({
			geneDict: geneDict,
			tmptHub: tmptHub,
		});
	}

	constructor({ tmptSetNames, tmptHub, geneDict }) {
		if (!geneDict) geneDict = {};

		this.tmptSetNames = geneDict.tmptSetNames || tmptSetNames || []; //Array
		this.tmptHub = tmptHub;
	}

	async zGetAllAvailableTmptNames() {
		const tmptRefIdToTmptName = {};

		const tmptSets = this._getAllAvailableTmptSets();

		for (let tmptSet of tmptSets) {
			const _tmptRefIdToTmpt =
				await tmptSet.zGetAllTmptsInRefIdToTmptFormat();

			for (let [tmptRefId, tmpt] of Object.entries(_tmptRefIdToTmpt)) {
				tmptRefIdToTmptName[tmptRefId] = tmpt.name;
			}
		}

		return tmptRefIdToTmptName;
	}

	async zGetTmptDetailsByTmptRefId({ tmptRefId }) {
		const tmptSetName = TmptRefIdUtility.getTmptSetName({
			tmptRefId: tmptRefId,
		});

		if (!tmptSetName in this.tmptSetNames) return null;

		const tmpt = await this.tmptHub.zGetTmptByRefId({
			tmptRefId: tmptRefId,
		});

		if (!tmpt) return null;

		const tmptDetails = {};
		tmptDetails["refId"] = tmpt.refId;
		tmptDetails["name"] = tmpt.name;

		tmptDetails["groupName"] = TmptRefIdUtility.getTmptGroupName({
			tmptRefId: tmptRefId,
		});

		tmptDetails["setName"] = tmptSetName;

		return tmptDetails;
	}

	async zGetAllAvaiableTmptDetails() {
		const tmptRefIdToName = (await this.zGetAllAvailableTmptNames()) || {};
		const tmptRefIds = Object.keys(tmptRefIdToName);

		const tmptRefIdToTmptDetails = {};
		for (let tmptRefId of tmptRefIds) {
			const tmptDetails = await this.zGetTmptDetailsByTmptRefId({
				tmptRefId: tmptRefId,
			});
			if (tmptDetails) tmptRefIdToTmptDetails[tmptRefId] = tmptDetails;
		}
		return tmptRefIdToTmptDetails;
	}

	async zGetTmptByRefId({ tmptRefId }) {
		const setName = TmptRefIdUtility.getTmptSetName({
			tmptRefId: tmptRefId,
		});

		if (!setName in this.tmptSetNames) {
			return null;
		}

		return await this.tmptHub.zGetTmptByRefId({
			tmptRefId: tmptRefId,
		});
	}

	async zGetAllAvailableTmpts() {
		const tmptRefIdToTmpts = {};
		const tmptSets = this._getAllAvailableTmptSets();

		for (let tmptSet of tmptSets) {
			const _tmptRefIdToTmpts =
				await tmptSet.zGetAllTmptsInRefIdToTmptFormat();
			Object.assign(tmptRefIdToTmpts, _tmptRefIdToTmpts);
		}

		return tmptRefIdToTmpts;
	}

	toGeneDict() {
		return {
			tmptSetNames: this.tmptSetNames,
		};
	}

	_getAllAvailableTmptSets() {
		const tmptSets = [];

		for (let tmptSetName of this.tmptSetNames) {
			const tmptSet = this.tmptHub.getTmptSet({
				tmptSetName: tmptSetName,
			});

			if (tmptSet) tmptSets.push(tmptSet);
		}

		return tmptSets;
	}
}

class TmptRefIdUtility {
	static getTmptSetName({ tmptRefId }) {
		const parts = tmptRefId.split(".");
		if (parts.length === 3) return parts[0];
		return null;
	}

	static getTmptGroupName({ tmptRefId }) {
		const parts = tmptRefId.split(".");
		if (parts.length === 3) return parts[1];
		return null;
	}

	static getTmptName({ tmptRefId }) {
		const parts = tmptRefId.split(".");
		if (parts.length === 3) return parts[2];
		return null;
	}
}
