export class RelationalUnit {
   /**
    * 
    * @param {Object} param
    * @param {RelationalUnitLocation} param.location
    * @param {Boolean} param.isAttached 
    */
   constructor({location, isAttached}) {
      this.location = location; //DocAttacherLocation/DocAttachingPointLocation
      this.isAttached = isAttached; //Boolean
   }

   /**
    * @description Update attachment props to make setting of new attachment, (it does not update any props of attacher)
    * @return {null}
    */
   setAttachment() {
      this.isAttached = false;
   }

   /**
    * @description Resets attachment of relationalUnit that leads to unattache from any attacher, (it does not update any props of attacher)
    * @return {null}
    */
   resetAttachment() {
      this.isAttached = false;
   }
}