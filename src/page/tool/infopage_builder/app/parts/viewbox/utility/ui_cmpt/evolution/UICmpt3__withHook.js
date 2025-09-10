import { UICmpt2__withStyle } from "./UICmpt2__withStyle.js";
import { UICmptHook } from "../ui_cmpt_hook/UICmptHook.js";

export class UICmpt3__withHook extends UICmpt2__withStyle {
   static HOOKTYPE = {
      CMPT : "CMPT",
      CMPT_LIST: "CMPT_LIST",
      GRAB: "GRAB",
      TEXT: "TEXT",
      HTML: "HTML",
   }

   constructor({name, tagname}) {
      super({name, tagname});
      this.hookNameToHook = {}; //Object[String: UICmptHook]
      this._hookNameToElmtSelector = {} //Object[String : String]
   }

   get hooks() {
      return Object.values(this.hookNameToHook);
   }

   hook(hookName) {
      if (!hookName) return this.hookNameToHook["self"]
      return this.hookNameToHook[hookName]
   }



   addHook({name, selector, type}) {
      selector = selector.replaceAll("#-----", "." + this.idLikeClassName);

      let hookElmt = this.bodyElmt.querySelector(selector);
      if (selector === "." + this.idLikeClassName) hookElmt = this.bodyElmt
      if (!hookElmt) throw new Error("Can't add 'UICmptHook' --> hook elmt not found.")

      const hook = new UICmptHook({
         name: name,
         elmt: hookElmt,
         type: type,
         uiCmpt: this,
      });

      this.hookNameToHook[hook.name] = hook;
      this._hookNameToElmtSelector[hook.name] = selector;
      this.style.bodyElmt.appendChild(hook.style.bodyElmt);

      return this;
   }

   removeHook({hookName}) {
      if (hookName in this.hookNameToHook) {
         this.style.bodyElmt.removeChild(this.hookNameToHook[hookName].style.bodyElmt);
         delete this.hookNameToHook[hookName];
         delete this._hookNameToElmtSelector[hookName];
      }
      return this;
   }

   // Called by parent
   reloadHooks() {
      // Collecting defined hook data
      const hookNameToHookData = {};
      for (let hookName in this.hookNameToHook) {
         const hook = this.hookNameToHook[hookName];
         const hookData = {
            name: hook.name,
            selector: this._hookNameToElmtSelector[hookName],
            type: hook.type
         }
         hookNameToHookData.push(hookData);
      }

      // Removing all current hook
      for (let hookName in this.hookNameToHook) {
         this.removeHook({hookName});
      }

      // Adding all hook
      for (let hookName in this.hookNameToHookData) {
         const hookData = this.hookNameToHookData[hookName];
         
         this.addHook({
            name: hookData.name,
            selector: hookData.selector,
            type: hookData.type,
         });
      }
   }
}

