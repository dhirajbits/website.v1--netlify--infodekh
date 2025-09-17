import { PageDoc, PageRaw } from "../exports/main.js";
import { injectInsideTemplateCode } from "./inject_inside_template_code.js";

export class WebpageHtmlGenerator {
   constructor({pageRaw}) {
      this.pageRaw = pageRaw;
      

   }
   
   async getHtmlMarkup() {
      // return "";
      this.newPageRaw = await PageRaw.zFromGeneDict({
         geneDict: this.pageRaw.toGeneDict(),
         tmptHub: this.pageRaw.tmptHub,
      });
      
      this.pageDoc = new PageDoc({seed_pageRaw: this.newPageRaw}); //PageDoc
      
      const title = this.pageDoc.meta.title;
      const layoutHtmlElmt = this.pageDoc.cmptDocBUSH.bodyElmt;
      const cmptCSSHtmlElmt = this.pageDoc.cmptDocBUSH.cmptStyleElmt;
      const tmptCSSHtmlElmt = this.pageDoc.cmptDocBUSH.tmptStyleElmt;

      return injectInsideTemplateCode({
         title: title,
         htmlCode: layoutHtmlElmt.innerHTML,
         cmptCSS: cmptCSSHtmlElmt.innerHTML,
         tmptCSS: tmptCSSHtmlElmt.innerHTML,
      });
   }
}



