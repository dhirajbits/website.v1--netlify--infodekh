import { APAttacher } from "./APAttacher.js";
import { HtmlAttacher } from "./HtmlAttacher.js";
import { MultiAPAttacher } from "./MultiAPAttacher.js";
import { TextAttacher } from "./TextAttacher.js";

export class AttacherHub {
   static attacherTypeToAttacherClass = {
      "AP" : APAttacher,
      "MULTI_AP" : MultiAPAttacher,
      "TEXT": TextAttacher,
      "HTML": HtmlAttacher,
   }

   static cmptHookTypeToAttacherClass = {
      "cmpt": APAttacher,
      "cmptlist": MultiAPAttacher,
      "list": MultiAPAttacher,
      "data": TextAttacher,
      "html": HtmlAttacher,
   }

   static getAttacherClassByAttacherType({type}) {
      return this.attacherTypeToAttacherClass[type];
   }

   static getAttacherClassByCmptHookType({type}) {
      return this.cmptHookTypeToAttacherClass[type];
   }
}