export class PagePanel {
   constructor({panel}) {
      this.panel = panel; //Panel
      this.engine = panel.engine; //Engine
   }

   get__pageRaw() {}
   get__pageDoc() {}
   get__pageCanvas() {}
   get__isPageAvailable() {}

   mtd__createNewBlankPageOfType({pageType}) {
      return this.engine.Page.loadBlankPage({pageType})
   }
   mtd__loadPageFromFileData() {}

   get__availablePageTypes() {
      return this.engine.Page.getAvailablePageTypes();
   }
}