import { APAttacher } from "./APAttacher.js";
import { HtmlAttacher } from "./HtmlAttacher.js";
import { MultiAPAttacher } from "./MultiAPAttacher.js";
import { TextAttacher } from "./TextAttacher.js";

export class AttacherHub {
   static hookTypeToAttacherClass = {
      cmpt: APAttacher,
      data: TextAttacher,
      html: HtmlAttacher,
      cmptlist: MultiAPAttacher,
      list: MultiAPAttacher,
      cl: MultiAPAttacher,
   };

   static getAttacherClass({ hookType }) {
      return this.hookTypeToAttacherClass[hookType];
   }
}