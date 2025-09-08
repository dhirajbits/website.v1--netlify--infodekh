import { StyleDoc } from "./StyleDoc.js";


export class CmptStyleDoc extends StyleDoc {
   constructor({seed_cmptStyleRaw}) {
      super({
         seed_styleRaw: seed_cmptStyleRaw,
      })

      this.seed_cmptStyleRaw = seed_cmptStyleRaw; //CmptStyleRaw
   }
}