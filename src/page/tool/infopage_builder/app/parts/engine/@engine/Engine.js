import { Page } from "./features/Page.js";

export class Engine {
   constructor({model}) {
      if (Engine._instance) return Engine._instance;
      else Engine._instance = this;

      this.model = model;
      this.Page = new Page({engine: this});
   }

   async boot() {
      const pageRawGeneDict = this.model.AppData.pageRawGeneDict;
      if (pageRawGeneDict) 
         await this.Page.zLoadPageFromGeneDict({geneDict: pageRawGeneDict});
   }
}