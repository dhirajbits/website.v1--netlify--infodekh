import { PageRaw } from "../exports/main.js";
import { appTmptHub } from "../exports/appTmptHub.js";


export class PageRawBuilder {
   static pageTypeToBuilderMethod = {
      "movie_update": this.buildNewMovieUpdatePage,
      "recipe": this.buildNewRecipePage,
   }

   static buildNewPageOfType ({type}) {
      const builderMethod = this.pageTypeToBuilderMethod[type];
      if (builderMethod) return builderMethod();
   }

   static async zBuildPageByGeneDict({geneDict}) {
      return await PageRaw.zFromGeneDict({
         geneDict: geneDict,
         tmptHub: appTmptHub,
      })
   }

   static buildNewMovieUpdatePage() {
      const tmptSetNames = ["movie_update"];
      const pageRaw = new PageRaw({
         tmptSetNames: tmptSetNames,
         tmptHub: appTmptHub,
      });
      pageRaw.generalInfo.pageType = "movie_update";
      return pageRaw;
   }

   static buildNewRecipePage() {
      const tmptSetNames = ["recipe"];
      const pageRaw = new PageRaw({
         tmptSetNames: tmptSetNames,
         tmptHub: appTmptHub
      });
      pageRaw.generalInfo.pageType = "recipe";
      return pageRaw;
   }


}