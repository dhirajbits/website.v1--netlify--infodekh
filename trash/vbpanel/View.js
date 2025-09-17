import { WithoutPage } from "./feature/WithoutPage.js";

export class View {
   constructor({vbpanel}) {
      this.vbpanel = vbpanel; //VBPanel
      this.WithoutPage = new WithoutPage({vbpanel: vbpanel})
   }
}