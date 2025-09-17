import { RelationalUnit } from "../../../page_doc/doc_attachment/relational_unit/RelationalUnit.js";


export class RelationalUnitRefRegister {
   constructor() {
      this.refIdToRelationalUnit = {}; //Object[String: RelationUnit]
   }

   register({relationalUnit}) {
      if (!relationalUnit instanceof RelationalUnit) return;
      this.refIdToRelationalUnit[relationalUnit.refId] = relationalUnit;
   }

   unregister({relationalUnit}) {
      if (!relationalUnit instanceof RelationalUnit) return;
      if (!relationalUnit.refId in this.refIdToRelationalUnit) return;
      delete this.refIdToRelationalUnit[relationalUnit.refId];
   }

   get({refId}) {
      return this.refIdToRelationalUnit[refId];
   }

   reset() {
      this.refIdToRelationalUnit = {};
   }


}