export class StyleRaw {
   /**
    * @description Creates StyleRaw object from geneDict
    * @param {Object} param
    * @param {Object} param.geneDict
    * @returns {StyleRaw}
    */
   static fromGeneDict({geneDict}) {
      return new StyleRaw({geneDict: geneDict});
   }

   /**
    * 
    * @param {Object} param
    * @param {String} param.cssSelector
    */
   constructor({cssSelector, geneDict}) {
      if (!geneDict) geneDict = {};

      this.cssSelector = geneDict.cssSelector || cssSelector; //String
      this.cssPropertyToValue = geneDict.declerations || {}; //Object : Permanent CSS declerations
      this.tempCssPropertyToValue = {}; //Object : Temporary CSS declerations
   }

   get declerations () {
      return {...this.cssPropertyToValue};
   }

   get tempDeclerations() {
      return {...this.tempCssPropertyToValue};
   }

   /**
    * @description Add CSS decleration
    * @param {Object} param
    * @param {Object} param.decleration
    * @returns {null}
    */
   addDecleration({decleration}) {
      for (let [cssProperty, value] of Object.entries(decleration)) {
         this.cssPropertyToValue[cssProperty] = value;
      }
   }

   /**
    * @description Remove CSS Decleration
    * @param {Object} param
    * @param {String} param.cssProperty
    * @returns {null}
    */
   removeDecleration({cssProperty}) {
      if (!this.cssPropertyToValue.includes(cssProperty)) return
      delete this.cssPropertyToValue[cssProperty];
   };

   /**
    * @description Add Temporary CSS decleration
    * @param {Object} param
    * @param {Object} param.decleration
    * @returns {null}
    */
   addTempDecleration({decleration}) {
      for (let [cssProperty, value] of Object.entries(decleration)) {
         this.tempCssPropertyToValue[cssProperty] = value;
      }
   }

   /**
    * @description Remove Temporary CSS decleration
    * @param {Object} param
    * @param {String} param.cssProperty
    * @returns {null}
    */
   removeTempDecleration({cssProperty}) {
      if (!this.tempCssPropertyToValue.includes(cssProperty)) return
      delete this.tempCssPropertyToValue[cssProperty];
   };

   /**
    * @description Removes all added declerations
    * @return {null}
    */
   removeAllDeclerations() {
      this.cssPropertyToValue = {};
   }

   /**
    * @description Remove all temporary added declerations
    * @return {null}
    */
   removeAllTempDeclerations() {
      this.tempCssPropertyToValue = {};
   }

   /**
    * @description Generate geneDict of object
    * @returns {Object}
    */
   toGeneDict() {
      return {
         "cssSelector": this.cssSelector,
         "declerations": this.declerations
      };
   }
}

