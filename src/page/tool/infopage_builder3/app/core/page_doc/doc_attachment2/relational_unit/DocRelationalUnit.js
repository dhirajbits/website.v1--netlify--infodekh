export class DocRelationalUnit {
	/**
	 * @param {Object} param
	 * @param {RawRelationalUnit} param.seed_rawRelationalUnit
    * @param {RelationalUnitRefRegister} param.relationalUnitRefRegister
	 */
	constructor({ seed_rawRelationalUnit, location, relationalUnitRefRegister}) {
		this.seed_rawRelationalUnit = seed_rawRelationalUnit; //RawRelationalUnit
      this.relationalUnitRefRegister = relationalUnitRefRegister; //RelationalUnitRefRegister
		this.location = location; // Must be overwrited in inherited class

      this.relationalUnitRefRegister.register({
         relationalUnit: this,
      });
	}

	get isAttached() {
		return this.seed_rawRelationalUnit.isAttached;
	}

   get refId () {
      return this.seed_rawRelationalUnit.refId;
   }
}
