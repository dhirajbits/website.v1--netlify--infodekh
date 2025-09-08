import { RelationalUnit } from "../../../page_doc/doc_attachment/relational_unit/RelationalUnit.js";
import { RawRelationalUnit } from "../relational_unit/RawRelationalUnit.js";


export class RawAttacher extends RawRelationalUnit {
   
   /**
    * @description Create 'RawAttacher' object from geneDict
    * @param {Object} param
    * @param {Object} param.geneDict
    * @param {RawAttacherLocation} param.location
    * @param {RelationalUnitRefRegister} param.relationalUnitRefRegister
    * @returns {RawAttacher}
    */
   static fromGeneDict ({geneDict, location, relationalUnitRefRegister}) {
      return new RawAttacher({
         location: location,
         relationalUnitRefRegister: relationalUnitRefRegister,
         geneDict: geneDict,
      });
   }

   /**
    * @param {Object} param
    * @param {RawAttacherLocation} param.location
    * @param {RelationalUnitRefRegister} param.relationalUnitRefRegister
    * @param {Object} param.geneDict
    */
   constructor({location, relationalUnitRefRegister, geneDict}) {
      super({
         relationalUnitRefRegister: relationalUnitRefRegister,
         geneDict: geneDict,
      });

      this.location = location; //RawAttacherLocation
      // this.attacherType = this.location.cmptHookRaw.type; //String
      this.attacherType = null; //Must be overright by inheritor class
   }

   /**
    * @description Generate geneDict of this object.
    * @returns {Object}
    */
   toGeneDict() {
      return super.toGeneDict();
   }
}