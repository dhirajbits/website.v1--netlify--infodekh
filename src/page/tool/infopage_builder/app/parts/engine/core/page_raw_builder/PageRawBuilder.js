import { PageRaw } from "../exports/main.js";
import { appTmptHub } from "../exports/appTmptHub.js";


export class PageRawBuilder {
   static pageTypeToBuilderMethod = {
      "movie_update": this.zBuildNewMovieUpdatePage,
      "recipe": this.zBuildNewRecipePage,
   }

   static async zBuildNewPageOfType ({type}) {
      const builderMethod = this.pageTypeToBuilderMethod[type];
      if (builderMethod) return await builderMethod();
   }

   static async zBuildPageByGeneDict({geneDict}) {
      return await PageRaw.zFromGeneDict({
         geneDict: geneDict,
         tmptHub: appTmptHub,
      })
   }

   static async zBuildNewMovieUpdatePage() {
      const tmptSetNames = ["movie_update"];
      const pageRaw = new PageRaw({
         tmptSetNames: tmptSetNames,
         tmptHub: appTmptHub,
         plateformCmptTmptRefId: "movie_update..plateform",
      });
      await pageRaw._zInit();
      pageRaw.generalInfo.pageType = "movie_update";
      return pageRaw;
   }

   static async zBuildNewRecipePage() {
      const tmptSetNames = ["recipe"];
      const pageRaw = new PageRaw({
         tmptSetNames: tmptSetNames,
         tmptHub: appTmptHub,
         plateformCmptTmptRefId: "recipe..plateform",
      });
      await pageRaw._zInit();
      pageRaw.generalInfo.pageType = "recipe";
      return pageRaw;
   }

   static async zResetPage({pageRaw}) {
      const newPageRaw = new PageRaw({
         tmptSetNames: pageRaw.tmptSET.tmptSetNames,
         tmptHub: pageRaw.tmptHub,
         plateformCmptTmptRefId: pageRaw.plateformCmptTmptRefId
      });
      await newPageRaw._zInit();
      newPageRaw.generalInfo.pageType = pageRaw.generalInfo.pageType;
      return newPageRaw;
   }


}