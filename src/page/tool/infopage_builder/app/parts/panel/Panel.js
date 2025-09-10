import { PagePanel } from "./sections/PagePanel.js";
import { PageTmptSet } from "./sections/PageTmptSet.js";


export class Panel {
   constructor({engine}) {
      this.engine = engine; //Engine

      if (Panel._instance) return Panel._instance;
      else Panel._instance = this;

      this.Page = new PagePanel({panel: this});
      this.Tmpt = new PageTmptSet({panel: this});
   }

   boot() {
      
   }
}