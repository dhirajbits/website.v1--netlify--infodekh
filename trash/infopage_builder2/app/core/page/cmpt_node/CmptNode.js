import { CmptNodeAttacher } from "./CmptNodeAttacher.js";
import { CmptNodeHook } from "./CmptNodeHookAttacher.js";


export class CmptNode {
   constructor ({cmpt}) {
      // DEFINING PROPERTIES
      this.id = null; // Number
      this.refId = null; // String
      this.isActivated = false; // Boolean
      this.cmpt = null; // Cmpt
      this.attacher = null; // CmptAttacher
      this.hookNameToNodeHook = {} // Object {String: CmptNodeHook}


      // ASSIGNING PROPERTIES
      this.id = cmpt.id;
      this.refId = cmpt.refId;
      this.isActivated = false;
      this.cmpt = cmpt;

      this.attacher = this._createNewCmptAttacher({
         cmpt: cmpt
      });

      this.hookNameToNodeHook = _createHookNameToNodeHook({
         cmpt: cmpt
      });
   }

   _createNewCmptAttacher ({cmpt}) {
      return new CmptNodeAttacher({cmpt: cmpt});
   }

   _createHookNameToNodeHook ({cmpt}) {
      const hookNameToNodeHook = {};
      for (let hookName in cmpt.hookNameToHook) {
         hookNameToNodeHook[hookName] = new CmptNodeHook({
            cmpt: cmpt,
            hookName: hookName,
         });
      }
      return hookNameToNodeHook;
   }
}