export class RawRelationalUnit {
   
   /**
    * @param {Object} param
    * @param {RelationalUnitRefRegister} param.relationalUnitRefRegister
    * @param {Object} param.geneDict
    */
   constructor({relationalUnitRefRegister, geneDict}) {
      this.location = null; //Should be overwrited in inheriter class
      this.isAttached = null; //Boolean
      this.refId = null; //String
      this.relationalUnitRefRegister = relationalUnitRefRegister; //RelationUnitRefRegister

      // ASSIGNING FROM GENEDICT
      if (geneDict) {
         this.isAttached = geneDict.isAttached;
         this.refId = geneDict.refId;
      }

      // ASSIGNING PROPERTY
      else {
         this.isAttached = false;
         this.refId = RefIdUtility.generateNewRefId();
      }

      this.relationalUnitRefRegister.register({
         relationalUnit: this,
      });
   }

   /**
    * @description Updates RelationUnit object such that it will indicate it is in attached state.
    * @param {Boolean} isAttached 
    */
   _updateAttachment(isAttached=true) {
      this.isAttached = isAttached;
   }

   /**
    * @description Update RelatinalUnit object such that it wiil indicate it is in unattached state.
    */
   _resetAttachment() {
      this.isAttached = false;
   }

   /**
    * @description Generate gene dict
    * @returns {Object}
    */
   toGeneDict() {
      return {
         "isAttached": this.isAttached,
         "refId": this.refId
      };
   }
}



class RefIdUtility {
   static counter = Math.floor(Math.random()*1000);

   static generateNewRefId () {
      this.counter += 1;
      return `RURefId${Date.now()}${this.counter}`;
   }
}