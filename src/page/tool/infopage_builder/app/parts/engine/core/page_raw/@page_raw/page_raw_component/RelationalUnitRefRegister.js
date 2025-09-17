import { RawRelationalUnit } from "../../attachment2/relational_unit/RawRelationalUnit.js";


export class RelationalUnitRefRegister {
   constructor() {
      this.refIdToRelationalUnit = {}; //Object[String: RelationUnit]
   }

   register({relationalUnit}) {
      if (!(relationalUnit instanceof RawRelationalUnit)) return;
      this.refIdToRelationalUnit[relationalUnit.refId] = relationalUnit;
   }

   unregister({relationalUnit}) {
      if (!(relationalUnit instanceof RawRelationalUnit)) return;
      if (!(relationalUnit.refId in this.refIdToRelationalUnit)) return;
      delete this.refIdToRelationalUnit[relationalUnit.refId];
   }

   get({refId}) {
      return this.refIdToRelationalUnit[refId];
   }

   reset() {
      this.refIdToRelationalUnit = {};
   }


}