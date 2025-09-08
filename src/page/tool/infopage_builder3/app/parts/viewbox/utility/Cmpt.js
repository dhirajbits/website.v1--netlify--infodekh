import { CmptHook } from "./CmptHook.js";
import { UNViewbox } from "./UNViewbox.js";


export class Cmpt {
   constructor({tagname, html, cssDict, rawCSS}) {
      // DEFINING PROPERTIES
      this.id = null; //Number
      this.idLikeClassName = ""; //String
      this.bodyElmt = null; //HTML
      this.styleElmt = null; //HTML
      this._cssDict = {}; //Object[String:String]
      this._rawCSS = ""; //String
      this.hookNameToHook = {}; //Object[String:HTML]
      this.rootElmt = null; //HTML
      this.parentCmpt = null; //Cmpt : Use for attaching cmpt to hook
      this.parentHook = null; //CmptHook : Use for attaching cmpt to hook

      // ASSIGNING PROPERTIES
      this.id = UNViewbox.generateUniqueNumber();
      this.idLikeClassName = `--UICMPT${this.id}--`;
      this.bodyElmt = document.createElement(Utility.getValidTagName({tagname}));
      this.styleElmt = document.createElement("style");
      this.hookNameToHook = {};
      this.rootElmt = this.bodyElmt;

      // MORE ACTIONS
      this.cssDict = cssDict;
      this.html = html;
      this._rawCSS = rawCSS;
      this._addDefaultClassNamesInBodyElmt();
      this.updateRootElmt();

   }

   get html() {
      return this.bodyElmt.html;
   }

   set html(code) {
      if (typeof code !== "string") return;
      this.bodyElmt.innerHTML = code;
      this._updateHookNameToHook();
   }

   get cssDict () {
      return {...this._cssDict};
   }

   set cssDict(dict) {
      if (typeof dict !== "object") return;
      this._cssDict = {...this._cssDict, ...dict};
      this.updateStyleElmt();
   }

   get css() {
      return this._rawCSS;
   }

   set css(code) {
      if (typeof code !== "string") return;
      this._rawCSS = code;
      this.updateStyleElmt();
   }

   hook(hookName) {
      return this.getHook({hookName});
   }

   fitInsideElmt({elmt}) {
      elmt.appendChild(this.rootElmt);
   }

   fillInsideElmt({elmt}) {
      elmt.innerHTML = "";
      this.fitInsideElmt({elmt});
   }

   getHook({hookName}) {
      return this.hookNameToHook[hookName];
   }

   updateStyleElmt() {
      const cssCode = Utility.generateCSS({
         selector: "." + this.idLikeClassName,
         cssDict: this._cssDict
      });

      let rawCSSCode = "";
      if (this._rawCSS) {
         rawCSSCode = Utility.generateCSSFromRawCSS({
            selector: "." + this.idLikeClassName,
            rawCSS: this._rawCSS,
         });
      }
      this.styleElmt.innerHTML = cssCode + "\n" + rawCSSCode;
   }

   updateRootElmt() {
      this.rootElmt.appendChild(this.styleElmt);
      for (let hookName in this.hookNameToHook) {
         const hook = this.hookNameToHook[hookName];
         this.rootElmt.appendChild(hook.styleElmt);
      }
   }

   _updateHookNameToHook() {
      this.hookNameToHook = {};

      const hookElmts = this.bodyElmt.querySelectorAll("[data-hook]");
      for (let hookElmt of hookElmts) {
         const hookName = hookElmt.dataset.hook;
         const hook = new CmptHook({
            cmpt: this,
            elmt: hookElmt,
            name: hookName,
            cssDict: {},
         });
         this.hookNameToHook[hookName] = hook;
      }

      this.updateRootElmt();
   }


   _addDefaultClassNamesInBodyElmt() {
      const defaultClassNames = ["--UICMPT--", this.idLikeClassName];
      
      for (let className of defaultClassNames) {
         this.bodyElmt.classList.add(className);
      }
   }
}



class Utility {
   static getValidTagName({tagname}) {
      const validTagnames = [
         "div", "section", "p", 
         "h1", "h2", "h3", "h4", "h5", "h6", "h7",
         "img", "input", "form", "select"
      ];
      const defaultTagname = "div";

      if (validTagnames.includes(tagname)) return tagname;
      return defaultTagname;
   }

   static generateCSS({selector, cssDict}) {
      let declerationBlock = "";
      for (let [props, val] of Object.entries(cssDict)) {
         declerationBlock += `${props}: ${val};`;
      }

      return `${selector} {${declerationBlock}}`;
   }

   static generateCSSFromRawCSS({selector, rawCSS}) {
      return `${selector} {${rawCSS}}`;
   }
}
