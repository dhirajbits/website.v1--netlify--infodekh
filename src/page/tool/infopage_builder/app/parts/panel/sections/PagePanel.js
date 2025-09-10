export class PagePanel {
   constructor({panel}) {
      this.panel = panel; //Panel
      this.engine = panel.engine; //Engine
   }

   get__pageRaw() {}
   get__pageDoc() {
      return this.engine.Page.pageDoc;
   }
   get__pageCanvas() {}
   get__isPageAvailable() {}

   get__availablePageTypes() {
      return this.engine.Page.getAvailablePageTypes();
   }

   set__pageName({pageName}) {
      this.engine.Page.pageRaw.generalInfo.pageName = String(pageName);
   }

   mtd__savePageToLocalStorage() {
      this.engine.Page.savePageToLocalStorage();
   }

   async zMtd__createNewBlankPageOfType({pageType}) {
      return await this.engine.Page.zLoadBlankPage({pageType})
   }
   mtd__loadPageFromFileData() {}

   mtd__getAllCmpts() {
      return this.panel.engine.Page.pageCanvas.CmptMngr.getAllCmpts();
   }

   async zMtd__createAndAddCmptToPage({tmptRefId}) {

      return await this.panel.engine.Page.pageCanvas.CmptMngr.zCreateAndAdd({tmptRefId});
   }

   mtd__moveCmptToNewParent({cmptDoc, parentCmptDoc, hookName, parentCmptHookDoc}) {
      return this.panel.engine.Page.pageCanvas.CmptPosition.moveCmptToNewParent({
         cmpt: cmptDoc,
         parentCmpt: parentCmptDoc,
         hookName: hookName,
         parentCmptHook: parentCmptHookDoc,
      });
   }
}