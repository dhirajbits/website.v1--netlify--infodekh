import { CmptHookOnCanvas } from "../on_canvas/CmptHookOnCanvas.js";
import { CmptOnCanvas } from "../on_canvas/CmptOnCanvas.js";
import { CmptBUSHCanvas } from "./component/CmptBUSHCanvas.js";
import { CmptMngr } from "./feature/CmptMngr.js";
import { CmptPosition } from "./feature/CmptPosition.js";
import { OnCanvasFeatureMngr } from "./utility/OnCanvasFeatureMngr.js";

export class PageCanvas {
	constructor({ pageDoc }) {
		this.pageDoc = pageDoc; //PageDoc
		
      this.CmptMngr = new CmptMngr({pageCanvas: this});
		this.CmptPosition = new CmptPosition({pageCanvas: this});

		this.cmptBUSHCanvas = new CmptBUSHCanvas();
		this.CmptCanvas = null;
		this.CmptOnPage = null;
		this.editCmpt = null;
		this.editCmptHook = null;
		// this.editCmptStyle = null;
		// this.editCmptHookStyle = null;
		// this.editCmptStyleConfig = null;
		// this.editCmptHookStyleConfig = null;
		this.editCmptPosition = null;
		this.editPageMeta = null;
		this.editPageGeneralInfo = null;

		// MORE ACTION
		this._addOnCanvasFeatureToCmptAndHooks({ pageDoc });
	}

	fitAtTopInsideElmt() {}
	fitAtBottomInsideElmt() {}
	fitInsideElmt({ elmt }, top = false) {}
	fillInsideElmt({ elmt }) {}

	_addOnCanvasFeatureToCmptAndHooks({ pageDoc }) {
		const refIdToCmptDoc =
			pageDoc.cmptDocBUSH.getAllCmptDocInRefIdToCmptDocFormat();

		for (let refId in refIdToCmptDoc) {
			const cmptDoc = refIdToCmptDoc[refId];
			OnCanvasFeatureMngr.addOnCanvasFeatureToCmptDocAndHookDoc({
				cmptDoc,
			});
		}
	}
}

/* 
FEATURES--------------------------------------

add cmpt
create cmpt
create and add cmpt
remove cmpt
remove cmpt by refid


*/
