import { Cmpt } from "../../utility/Cmpt.js";
import { View } from "../../utility/View.js";
import { createFrontAsideHolderCmpt } from "../_common_cmpts/front_aside_holder.js";
import { pageTypeToVisiblePageType } from "../_common_cmpts/utility/page_type_to_visible_page_type.js";
import { zCreateNewCmptOnCanvas } from "./handler/create_new_cmpt_on_canvas.js";
import { CmptHookWithIntractiveEHPE } from "./utility/CmptHookWithIntractiveEHPE.js.js";

export class WithoutPage extends View {
   constructor({viewbox, panel}) {
      super({panel});
   }

   build() {
      this._buildTitle();
      this._buildBody();
      this.loadPage();
   }

   loadPage() {
      const pageDoc = this.panel.Page.get__pageDoc();
      if (!pageDoc) return;
      const pageCanvasCmptHook = this.bodyCmptRootHook.firstChildCmpt.hook()
                                 .childCmpt("front")
                                 .hook("pageCanvas");
      pageCanvasCmptHook.detach();
      pageCanvasCmptHook.bodyElmt.appendChild(pageDoc.cmptDocBUSH.bodyElmt);
      pageCanvasCmptHook.bodyElmt.appendChild(pageDoc.cmptDocBUSH.cmptStyleElmt);
      pageCanvasCmptHook.bodyElmt.appendChild(pageDoc.cmptDocBUSH.tmptStyleElmt);

      // Updating pageName
      const pageDetailsStripCmpt = this.bodyCmptRootHook.firstChildCmpt.hook().childCmpt("aside").hook().childCmpt("pageDetailsStrip");
      pageDetailsStripCmpt.hook("pageName").attach(pageDoc.generalInfo.pageName);
      
      // Updating pageType
      pageDetailsStripCmpt.hook("articleTypeBadge").firstChildCmpt.hook("articleType").attach(pageTypeToVisiblePageType[pageDoc.generalInfo.pageType]);

      // Add event lister to all EmptyHookPlaceholderElmt
      const cmpts = this.panel.Page.mtd__getAllCmpts();
      for (let cmpt of cmpts) {
         for (let [hookName, hook] of Object.entries(cmpt.hookNameToHookDoc)) {
            
            if (hook.onCanvas.emptyHookPlaceholderElmt) {
               new CmptHookWithIntractiveEHPE({cmptHook: hook, panel: this.panel});
               // const EHPEListener = () => {
               //    hook.onCanvas.emptyHookPlaceholderElmt.onclick = async (event) => {
               //       event.stopPropagation();
               //       hook.onCanvas.emptyHookPlaceholderElmt.onclick = null;
               //       await zCreateNewCmptOnCanvas({
               //          view: this.view, 
               //          panel: this.panel,
               //          callback: EHPEListener,
               //       })
               //    }
               // }
               
               // EHPEListener();
            }
         }
      }
   }

   _buildTitle() {
      this.title = "No Page."
   }

   _buildBody() {
      const frontAsideHolderCmpt = createFrontAsideHolderCmpt({
         view: this,
         parentCmpt: this.bodyCmpt,
         panel: this.panel,
      });

      this.bodyCmptRootHook.attach(frontAsideHolderCmpt);
   }
}