import { StyleRaw } from "./StyleRaw.js";


export class CmptStyleRaw extends StyleRaw {
   static fromGeneDict({geneDict}) {
      const cmptStyleRaw = new CmptStyleRaw({
         geneDict: geneDict
      });
   }

   constructor({idLikeClassName, geneDict}) {
      if (!geneDict) geneDict = {};

      super({
         cssSelector: idLikeClassName,
         geneDict: geneDict,
      });

      this.idLikeClassName = geneDict.idLikeClassName || idLikeClassName; //String
   }

   toGeneDict() {
      const geneDict = super.toGeneDict();
      geneDict["idLikeClassName"] = this.idLikeClassName;
      return geneDict;
   }
}