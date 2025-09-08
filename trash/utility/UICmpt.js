export class UICmpt {
   constructor({tagname, html, cssDict}) {
      // DEFINING PROPERTIES
      this.id = null; //Number
      this.idLikeClassName = ""; //String
      this.bodyElmt = null; //HTML
      this.styleElmt = null; //HTML
      this.cssDict = {}; //Object[String:String]
      this.hookNameToHookElmt = {}; //Object[String:HTML]
      this.rootElmt = null; //HTML

      // ASSIGNING PROPERTIES
      this.id = IdUtility.generateUniqueId();
      this.idLikeClassName = `--UICMPT${this.id}--`;
      this.bodyElmt = document.createElement(Utility.getValidTagName({tagname}));
      this.styleElmt = document.createElement("style");
      this.cssDict = cssDict || {};
      this.rootElmt = document.createElement("div");

      // MORE ACTIONS
      this._addDefaultClassNamesInBodyElmt();
      this.updateStyle();
      this.html = html;
      this.rootElmt.appendChild(this.bodyElmt);
      this.rootElmt.appendChild(this.styleElmt);

   }

   get html() {
      return this.bodyElmt.html;
   }

   set html(code) {
      this.bodyElmt.innerHTML = code;
      this._updateHook();
   }

   fitInsideElmt({elmt}) {
      elmt.appendChild(this.rootElmt);
   }

   fillInsideElmt({elmt}) {
      elmt.innerHTML = "";
      this.fitInsideElmt({elmt});
   }

   addStyle({cssDict}, update=true) {
      if (typeof cssDict !== "object") return;
      this._cssDict = {...this._cssDict, ...cssDict};
      if (update) this.updateStyle();
   }

   updateStyle() {
      const cssCode = Utility.generateCSS({
         selector: "." + this.idLikeClassName,
         cssDict: this._cssDict
      });
      this.styleElmt.innerHTML = cssCode;
   }

   getHookElmt({hookName}) {
      return this.hookNameToHookElmt[hookName];
   }


   _addDefaultClassNamesInBodyElmt() {
      const defaultClassNames = ["--UICMPT--", this.idLikeClassName];
      
      for (let className of defaultClassNames) {
         this._bodyElmt.classList.add(className);
      }
   }


   _updateHook() {
      this.hookNameToHookElmt = {};
      const hookElmts = this.bodyElmt.querySelector("[data-hook]");

      for (let hookElmt of hookElmts) {
         const hookName = hookElmt.dataset.hook || "";
         this.hookNameToHookElmt[hookName] = hookElmt;
      };
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
}


class IdUtility {
   static counter = 0;

   static generateUniqueId() {
      this.counter += 1;
      return Number(`${Date.now()}${this.counter}`);
   }
}