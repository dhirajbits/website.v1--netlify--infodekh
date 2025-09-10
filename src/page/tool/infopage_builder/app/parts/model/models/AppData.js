export class AppData {
   constructor() {
      this._data = {}; //Object
   }

   // Prioraties local storage data

   get pageRawGeneDict() {
      // return ;
      let geneDict = localStorage.getItem("pageRawGeneDict");
      if (geneDict) geneDict = JSON.parse(geneDict);
      return geneDict;
   }

   set pageRawGeneDict(geneDict) {
      if (typeof geneDict !== "object") return;
      
      const error = localStorage.setItem("pageRawGeneDict", JSON.stringify(geneDict));
   }
}