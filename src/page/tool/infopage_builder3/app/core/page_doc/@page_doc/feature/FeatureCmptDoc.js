import { CmptDoc } from "../../cmpt_doc/CmptDoc.js";

export class FeatureCmptDoc {
	constructor({ base }) {
		this.base = base; //PageDoc
	}

	async zCreate({ tmptRefId }) {
		const cmptRaw = await this.base.seed_pageRaw.CmptRaw.zCreate({
			tmptRefId,
		});

		if (!cmptRaw)
			throw new Error(
				"Can't create new 'CmptDoc' --> Unable to create new 'CmptRaw'"
			);

		return new CmptDoc({
			seed_cmptRaw: cmptRaw,
			relationalUnitRefRegister: this.base.relationalUnitRefRegister,
		});
	}

	add({ cmptDoc }) {
		this.base.seed_pageRaw.CmptRaw.add({ cmptRaw: cmptDoc.seed_cmptRaw });
		this.base.cmptDocBUSH.addCmptDoc({ cmptDoc });
	}

	async zCreateAndAdd({ tmptRefId }) {
		const cmptDoc = await this.zCreate({ tmptRefId });
		this.add({ cmptDoc });
      return cmptDoc;
	}

	remove({cmptDoc}) {
      this.base.seed_pageRaw.CmptRaw.remove({cmptRaw: cmptDoc.seed_cmptRaw});
      this.base.cmptDocBUSH.removeCmptDoc({cmptDoc: cmptDoc});
   }

	removeByRefId({refId}) {
      const cmptDoc = this.getByRefId({refId: refId});
      this.remove({cmptDoc});
   }

	getByRefId({refId}) {
      return this.base.cmptDocBUSH.getCmptDocByRefId({cmptDocRefId: refId})
   }
}
