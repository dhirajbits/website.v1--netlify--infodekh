import { NotImplementedError } from "../../../../../error/NotImplementedError.js";
import { UICmpt0 } from "./UICmpt0.js";


export class UICmpt1__withHtml extends UICmpt0 {
   constructor({tagname, name}) {
      super({name});
      this.bodyElmt = document.createElement(Utility.getValidTagname({tagname}));
      this._addDefaultClassNamesToBodyElmt();
   }

   get html() {
      return this.bodyElmt.innerHTML;
   }

   set html(markup) {
      if (typeof markup !== "string") return;
      this.bodyElmt.innerHTML = markup;
      this.reloadHooks();
   }

   reloadHooks() {
      // Will we overwritten by inheritor
      throw new NotImplementedError();
   }

   _addDefaultClassNamesToBodyElmt() {
      const defaultClassNames = [
         this.idLikeClassName,
         `--UI-CMPT--name-${this.name}`,
      ];

      for (let className of defaultClassNames) {
         this.bodyElmt.classList.add(className);
      }
   }
}


class Utility {
   static getValidTagname({tagname}) {
      const validTagnames = [
         "div", "section", "article",
         "p", "h1", "h2", "h3", "h4", "h5", "h6",
         "ul", "ol", "li",
         "a", "img", "span"
      ];

      const defaultTagname = "div";

      if (!validTagnames.includes(tagname)) {
         console.warn(`Given tagname: '${tagname} for 'UI-CMPT' is not valid. so, falling back for default tagname: '${defaultTagname}.`);
         return defaultTagname;
      }

      return tagname;
   }
}