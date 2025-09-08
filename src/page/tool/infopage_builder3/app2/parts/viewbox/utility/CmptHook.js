import { UNViewbox } from "./UNViewbox.js";

export class CmptHook {
   constructor({cmpt, elmt, name, cssDict}) {
      // DEFINING PROPERTIES
      this.cmpt = cmpt; //Cmpt : holder cmpt
      this.id = null; //Number
      this.idLikeClassName = ""; //String
      this.name = name || ""; //String
      this.bodyElmt = elmt; //-HtmlElmt-
      this.rootElmt = null; //--HtmlElmt-- : alise of bodyElmt
      this.styleElmt = null; //-HtmlElmt-
      this._cssDict = {}; //Object[String : String]
      this._rawCSS = ""; //String
      this.children = []; //Array[Cmpt] : User for attaching cmpt to hook

      // ASSIGNING PROPERTIES
      this.id = UNViewbox.generateUniqueNumber();
      this.idLikeClassName = `--UICMPTHOOK${this.id}--`;
      this.styleElmt = document.createElement("style");
      this.cssDict = cssDict;
      // MORE ACTIONS
      this._addDefaultClassNameToBodyElmt();
      this.updateStyleElmt();
      this.rootElmt = this.bodyElmt;
   }

   get cssDict() {
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

   attachCmpt({cmpt}) {
      this.children.push(cmpt);
      cmpt.parentCmpt = this.cmpt;
      cmpt.parentHook = this;
      cmpt.fitInsideElmt({elmt: this.bodyElmt});
   }

   detachCmpt({cmpt}) {
      if (!this.children.includes(cmpt)) return;
      this.children = this.children.filter((cmpt_) => cmpt_ !== cmpt);
      cmpt.parentCmpt = null;
      cmpt.parentHook = null;
      this.bodyElmt.removeChild(cmpt.rootElmt);
   }

   updateStyleElmt() {
      const cssCode = Utility.generateCSS({
         selector: "." + this.idLikeClassName,
         cssDict: this._cssDict,
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

   _addDefaultClassNameToBodyElmt() {
      const defaultClassNames = [
         "--UICMPTHOOK--",
         this.idLikeClassName,
      ];

      for (let className of defaultClassNames) {
         this.bodyElmt.classList.add(className);
      }
   }
}


class Utility {
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