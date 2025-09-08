import { WithoutPage } from "../views/without_page/WithoutPage.js";

export class ViewHUB {
   static viewNameToViewClass = {
      "withoutPage" : WithoutPage
   };

   static getViewClassByName({name}) {
      return this.viewNameToViewClass[name];
   }
}