import { Page } from "./features/Page.js";

export class Engine {
   constructor({model}) {
      if (Engine._instance) return Engine._instance;
      else Engine._instance = this;

      this.model = model;
      this.Page = new Page({engine: this});
   }

   boot() {
      const pageRawGeneDict = this.model.AppData.pageRawGeneDict;
      if (pageRawGeneDict) 
         this.Page.loadPageFromGeneDict({geneDict: pageRawGeneDict});
   }
}