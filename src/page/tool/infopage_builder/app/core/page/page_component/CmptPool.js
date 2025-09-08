import { Cmpt } from "../../cmpt/Cmpt.js";
/* CmptPool DOCUMENTATION :-

*/

export class CmptPool {
	static async fromGeneDict({ geneDict, tmptpool }) {
		if (!geneDict) {
			geneDict = {};
		}

		const cmptpool = new CmptPool({ tmptpool: tmptpool });

		for (let refId in geneDict) {
			const cmptGeneDict = geneDict[refId];
			await cmptpool.createAndAddCmptByCmptGeneDict(
				{
					geneDict: cmptGeneDict,
				},
				false
			);
		}

		this.setAttachmentsOfBacklogCmpt();
		return cmptpool;
	}

	static async zFromGeneDict({ geneDict, tmptpool }) {
		return await CmptPool.fromGeneDict({
			geneDict: geneDict,
			tmptpool: tmptpool,
		});
	}

	constructor({ tmptpool }) {
		this.tmptpool = tmptpool;
		this.cmptRefIdToCmpt = {};
		this.backlogInAttachmentAssignment = [];
	}

	addCmpt({ cmpt }, assignAttachments = false) {
		this.cmptRefIdToCmpt[cmpt.refId] = cmpt;
		if (assignAttachments) {
			this._assignAttachmentsOfCmpt({ cmpt: cmpt });
			for (let hookName in cmpt.hooks) {
				const hook = cmpt.hooks[hookName];
				this._assignAttachmentsOfHook({ hook: hook });
			}
		} else {
			this.backlogInAttachmentAssignment.push(cmpt);
		}
	}

	async createAndAddCmpt({ tmpt, tmptRefId }, assignAttachments = false) {
		const cmpt = new Cmpt({
			tmpt: tmpt,
			tmptRefId: tmptRefId,
			tmptpool: this.tmptpool,
		});
		await cmpt.zInit();
		this.addCmpt({ cmpt: cmpt }, assignAttachments);
		return cmpt;
	}

	async zCreateAndAddCmpt({ tmpt, tmptRefId }, assignAttachments = false) {
		return await this.createAndAddCmpt(
			{
				tmpt: tmpt,
				tmptRefId: tmptRefId,
			},
			assignAttachments
		);
	}

	async createAndAddCmptByCmptGeneDict(
		{ geneDict, tmpt },
		assignAttachemnts = false
	) {
		const cmpt = Cmpt.fromGeneDict({
			geneDict: geneDict,
			tmpt: tmpt,
			tmptpool: this.tmptpool,
		});
		await cmpt.zInit();
		this.addCmpt({ cmpt: cmpt }, assignAttachemnts);
		return cmpt;
	}

	async zCreateAndAddCmptByCmptGeneDict(
		{ geneDict },
		assignAttachemnts = false
	) {
		return this.createAndAddCmptByCmptGeneDict(
			{ geneDict: geneDict },
			assignAttachemnts
		);
	}

	getCmptByRefId({ refId }) {
		return this.cmptRefIdToCmpt[refId];
	}

	removeCmptByRefId({ refId }) {
		const cmpt = this.cmptRefIdToCmpt[refId];
		delete this.cmptRefIdToCmpt[refId];
		// Have to remove cmpt attachments ...........................######
		return cmpt;
	}

	getAllCmptsInRefIdToCmptFormat() {
		return this.cmptRefIdToCmpt;
	}

	setAttachmentsOfBacklogCmpt() {
		for (let i = 0; i < this.backlogInAttachmentAssignment; i++) {
			const cmpt = this.backlogInAttachmentAssignment.pop();
			this._assignAttachmentsOfCmpt({ cmpt: cmpt });
			for (let hookName in cmpt.hooks) {
				const hook = cmpt.hooks[hookName];
				this._assignAttachmentsOfHook({ hook: hook });
			}
		}
	}

	setAttachmentsOfAllCmpt() {
		for (let cmptRefId in this.cmptRefIdToCmpt) {
			const cmpt = this.cmptRefIdToCmpt[cmptRefId];
			this._assignAttachmentsOfCmpt({ cmpt: cmpt });
			for (let hookName in cmpt.hooks) {
				const hook = cmpt.hooks[hookName];
				this._assignAttachmentsOfHook({ hook: hook });
			}
		}
	}

	toGeneDict() {
		const geneDict = {};
		for (let refId in this.cmptRefIdToCmpt) {
			geneDict[refId] = this.cmptRefIdToCmpt[refId].toGeneDict();
		}
		return geneDict;
	}

	_assignAttachmentsOfCmpt({ cmpt }) {
		cmpt.attachedToCmpt = this.getCmptByRefId({
			refId: cmpt.attachedToCmptRefId,
		});

		cmpt.attachedToHook =
			cmpt.attachedToCmpt.hooks[cmpt.attachedToHookName];
	}

	_assignAttachmentsOfHook({ hook }) {
		hook.attachedCmpts = [];
		for (let attachedCmptRefId of hook.attachedCmptRefIds) {
			const cmpt = this.getCmptByRefId({
				refId: attachedCmptRefId,
			});
			hook.attachedCmpts.push(cmpt);
		}

		if (hook.attachedCmptRefId) {
			hook.attachedCmpt = this.getCmptByRefId({
				refId: this.attachedCmptRefId,
			});
		}
	}
}
