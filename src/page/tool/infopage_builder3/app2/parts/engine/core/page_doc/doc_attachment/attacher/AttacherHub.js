import { APAttacher } from "./APAttacher.js";
import { HtmlAttacher } from "./HtmlAttacher.js";
import { MultiAPAttacher } from "./MultiAPAttacher.js";
import { TextAttacher } from "./TextAttacher.js";

export class AttacherHub {
   static attacherTypeToAttacherClass = {
      "ap": APAttacher,
      "text": TextAttacher,
      "html": HtmlAttacher,
      "multiAp": MultiAPAttacher,
   }

   static hookTypeToAttacherClass = {
      "cmpt": APAttacher,
      "text": TextAttacher,
      "html": HtmlAttacher,
      "cmptlist": MultiAPAttacher,
   }

   static getAttacherClassByAttacherType({type}) {
      return this.attacherTypeToAttacherClass[type];
   }

   static getAttacherClassByHookType({type}) {
      return this.hookTypeToAttacherClass[type]
   }
}