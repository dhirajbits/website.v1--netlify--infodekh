export class PageMeta {
   
   static fromGeneDict ({geneDict}) {
      return new PageMeta({geneDict: geneDict});
   }
   
   
   constructor ({geneDict}) {
      this.title = ""; //string//

      // Assign props with geneDict
      if (geneDict) {
         this._assignPropsFromGeneDict({geneDict: geneDict});
      }
   }

   
   toGeneDict () {
      return {
         "title": this.title
      };
   }

   _assignPropsFromGeneDict ({geneDict}) {
      this.title = geneDict.title;
   }
}