import { StyleDoc } from "./StyleDoc.js";


export class CmptHookStyleDoct extends StyleDoc {
   constructor({seed_cmptHookStyleRaw}) {
      super({
         seed_styleRaw: seed_cmptHookStyleRaw,
      })

      this.seed_cmptHookStyleRaw = seed_cmptHookStyleRaw; //CmptHookStyleRaw
   }
}