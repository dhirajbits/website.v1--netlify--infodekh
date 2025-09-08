import { DocRelationalUnit } from "../relational_unit/DocRelationalUnit.js";

export class DocAttacher extends DocRelationalUnit {
	constructor({ seed_rawAttacher, location, relationalUnitRefRegister }) {
		super({
			seed_rawRelationalUnit: seed_rawAttacher,
			location: location,
			relationalUnitRefRegister: relationalUnitRefRegister,
		});

      this.seed_rawAttacher = seed_rawAttacher; //RawAttacher
      this.location = location; //DocAttacherLocation
	}

	get attacherType() {
      return this.seed_rawAttacher.attacherType;
   }
}
