import { Viewbox2__withView } from "./evolution/Viewbox2__withView.js";
import { ViewHUB } from "./ViewHUB.js";

export class Viewbox extends Viewbox2__withView {
   constructor({panel}) {
      if (!Viewbox._instance) super({panel});
      if (Viewbox._instance) return Viewbox._instance;
      else Viewbox._instance = this;
   }
   
   boot() {
      this.loadDefaultView();
   }

   loadDefaultView() {
      // Geting view class
      const defaultViewName = "withoutPage";
      const viewClass = ViewHUB.getViewClassByName({name: defaultViewName});

      // Creating new view
      const view = new viewClass({viewbox: this, panel: this.panel});
      view.build();

      // Updating viewbox view
      this.CurrentView.update({view});
   }

}