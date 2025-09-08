import { PageDoc, PageRawBuilder } from "../../core/exports/main.js";
import { PageCanvas } from "../../core/page_canvas/PageCanvas.js";


export class Page {
   constructor({engine}) {
      this.engine = engine; // Engine
      this.pageRaw = null; //PageRaw
      this.pageDoc = null; //PageDoc
      this.pageCanvas = null; //PageCanvas
   }

   getAvailablePageTypes() {
      return Object.keys(PageRawBuilder.pageTypeToBuilderMethod);
   }

   loadBlankPage({pageType}) {
      this.pageRaw = PageRawBuilder.buildNewPageOfType({type: pageType});
      this._loadPageDocAndPageCanvas();
      this.engine.model.AppData.pageRawGeneDict = this.pageRaw.toGeneDict();
   }

   loadPageFromGeneDict({geneDict}) {
      this.pageRaw = PageRawBuilder.zBuildPageByGeneDict({geneDict});
      this._loadPageDocAndPageCanvas();
      this.engine.model.AppData.pageRawGeneDict = this.pageRaw.toGeneDict();

   }

   _loadPageDocAndPageCanvas() {
      this.pageDoc = new PageDoc({seed_pageRaw: this.pageRaw});
      this.pageCanvas = new PageCanvas({pageDoc: this.pageDoc});
   }


}