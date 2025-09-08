import { UNViewbox } from "../../UNViewbox.js";

export class UICmpt0 {
   constructor({name}) {
      this.id = UNViewbox.generateUniqueNumber();
      this.idLikeClassName = this._generateIdLikeClassName({id: this.id});
      this.name = name || "unNamed";
   }

   _generateIdLikeClassName({id}) {
      return `--UI-CMPT--id-${id}--`;
   }
}