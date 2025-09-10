import { CmptOnCanvas } from "../../on_canvas/CmptOnCanvas.js";
import { CmptHookOnCanvas } from "../../on_canvas/CmptHookOnCanvas.js";

export class OnCanvasFeatureMngr {
   static addOnCanvasFeatureToCmptDocAndHookDoc({ cmptDoc }) {
      this._addFeatureToCmptDoc({ cmptDoc });
      for (let [hookName, hookDoc] of Object.entries(
         cmptDoc.hookNameToHookDoc
      )) {
         this._addFeatureToCmptHookDoc({ cmptHookDoc: hookDoc });
      }
   }

   static _addFeatureToCmptDoc({ cmptDoc }) {
      if (cmptDoc.onCanvas) return;
      const cmptOnCanvas = new CmptOnCanvas({ cmptDoc });
      cmptDoc.onCanvas = cmptOnCanvas;
   }

   static _addFeatureToCmptHookDoc({ cmptHookDoc }) {
      if (cmptHookDoc.onCanvas) return;
      const cmptHookOnCanvas = new CmptHookOnCanvas({ cmptHookDoc });
      cmptHookDoc.onCanvas = cmptHookOnCanvas;
   }
}