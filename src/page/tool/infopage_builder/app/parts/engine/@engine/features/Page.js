import { PageDoc, PageRawBuilder } from "../../core/exports/main.js";
import { WebpageHtmlGenerator } from "../../core/html_generator/HtmlGenerator.js";
import { PageCanvas } from "../../core/page_canvas/@page_canvas/PageCanvas.js";


export class Page {
   constructor({engine}) {
      this.engine = engine; // Engine
      this.pageRaw = null; //PageRaw
      this.pageDoc = null; //PageDoc
      this.pageCanvas = null; //PageCanvas
   }

   savePageToLocalStorage() {
      this.engine.model.AppData.pageRawGeneDict = this.pageRaw.toGeneDict();
   }

   getAvailablePageTypes() {
      return Object.keys(PageRawBuilder.pageTypeToBuilderMethod);
   }

   async  zLoadBlankPage({pageType}) {
      this.pageRaw = await PageRawBuilder.zBuildNewPageOfType({type: pageType});
      console.log(this.pageRaw)
      this._loadPageDocAndPageCanvas();
      this.savePageToLocalStorage();
   }

   async zLoadPageFromGeneDict({geneDict}) {
      this.pageRaw = await PageRawBuilder.zBuildPageByGeneDict({geneDict});
      this._loadPageDocAndPageCanvas();
      this.savePageToLocalStorage()

   }

   async zReset() {
      this.pageRaw = await PageRawBuilder.zResetPage({pageRaw: this.pageRaw});
      this._loadPageDocAndPageCanvas();
      this.savePageToLocalStorage();
   }

   _loadPageDocAndPageCanvas() {
      this.pageDoc = new PageDoc({seed_pageRaw: this.pageRaw});
      this.pageCanvas = new PageCanvas({pageDoc: this.pageDoc});
   }

   async zGenerateAndGetHtmlMarkupCode() {
      if (!this.pageDoc) console.error("No page available to generate code.")
      const generator = new WebpageHtmlGenerator({pageRaw: this.pageRaw})
      return await generator.getHtmlMarkup();
   }

}