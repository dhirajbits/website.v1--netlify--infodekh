import { CmptNodeHookAttacher } from "./CmptNodeHookAttacher.js";


export class CmptNodeHook {
   constructor ({cmpt, hookName}) {
      this.attacher = new CmptNodeHookAttacher({
         cmpt: cmpt,
         hookName: hookName,
      });
   }
}