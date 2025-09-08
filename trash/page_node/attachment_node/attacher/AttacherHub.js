import { APAttacher } from "./APAttacher.js";
import { HtmlAttacher } from "./HtmlAttacher.js";
import { MultiAPAttacher } from "./MultiAPAttacher.js";
import { TextAttacher } from "./TextAttacher.js";

export class AttacherHub {
   static attacherTypeToAttacherClass = {
      "ap" : APAttacher,
      "text": TextAttacher,
      "html": HtmlAttacher,
      "multiAp": MultiAPAttacher
   }

   static getAttacherClassByType({type}) {
      return this.attacherTypeToAttacherClass[type];
   }
}