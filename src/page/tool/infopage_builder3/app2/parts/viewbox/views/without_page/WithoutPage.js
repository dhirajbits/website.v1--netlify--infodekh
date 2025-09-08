import { Cmpt } from "../../utility/Cmpt.js";
import { View } from "../../utility/View.js";
import { createFrontAsideHolderCmpt } from "../_common_cmpts/front_aside_holder.js";

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
      console.log("loading page...")
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