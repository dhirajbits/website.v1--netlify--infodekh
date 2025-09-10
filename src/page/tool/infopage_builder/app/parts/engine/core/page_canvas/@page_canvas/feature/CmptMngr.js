import { OnCanvasFeatureMngr } from "../utility/OnCanvasFeatureMngr.js";

export class CmptMngr {
	constructor({ pageCanvas }) {
		this.pageCanvas = pageCanvas; //PageCanvas
	}

	async zCreate({ tmptRefId }) {
		const cmptDoc = await this.pageCanvas.pageDoc.CmptDoc.zCreate({
			tmptRefId,
		});
		OnCanvasFeatureMngr.addOnCanvasFeatureToCmptDocAndHookDoc({
			cmptDoc: cmptDoc,
		});
		return cmptDoc;
	}

	add({ cmpt }) {
		OnCanvasFeatureMngr.addOnCanvasFeatureToCmptDocAndHookDoc({
			cmptDoc: cmpt,
		});

		// cmpt.onCanvas.removeEmptyHookPlaceholderElmt();
		this.pageCanvas.pageDoc.CmptDoc.add({ cmptDoc: cmpt });
		// cmpt.onCanvas.addEmptyHookPlaceholderElmt();
	}

	async zCreateAndAdd({ tmptRefId }) {
		const cmpt = await this.zCreate({ tmptRefId });
		if (cmpt) this.add({ cmpt });
		else
			throw new Error("Can't create and add cmpt --> Can't create cmpt.");
		return cmpt;
	}

	remove({ cmpt }) {
		this.pageCanvas.pageDoc.CmptDoc.remove({ cmptDoc: cmpt });
	}

	removeByRefId({ refId }) {
		this.pageCanvas.pageDoc.CmptDoc.remvoeByRefId({ refId });
	}

   getByRefId({refId}) {
      return this.pageCanvas.pageDoc.CmptDoc.getByRefId({refId})
   }

	getAllCmpts() {
      return Object.values(this.pageCanvas.pageDoc.cmptDocBUSH.getAllCmptDocInRefIdToCmptDocFormat());
   }

	getAllRefIdToCmptDoc() {
      return this.pageCanvas.pageDoc.cmptDocBUSH.getAllCmptDocInRefIdToCmptDocFormat();
   }
}
