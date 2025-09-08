import { DocRelationalUnit } from "../relational_unit/DocRelationalUnit.js";

export class DocAttachingPoint extends DocRelationalUnit {
	/**
	 * @param {Object} param
	 * @param {RelationalUnitLocation} param.location
	 * @param {Boolean} param.isAttached
	 */
	constructor({
		seed_rawAttachingPoint,
		location,
		relationalUnitRefRegister,
	}) {
		super({
			seed_rawRelationalUnit: seed_rawAttachingPoint,
			location: location,
			relationalUnitRefRegister: relationalUnitRefRegister,
		});

		this.seed_rawAttachingPoint = seed_rawAttachingPoint;
	}

	get attachedAttacher() {
		return this.relationalUnitRefRegister.get({
			refId: this.seed_rawAttachingPoint.attachedAttacherRefId
		});
	}

	get attachedAtIndex() {
		return this.seed_rawAttachingPoint.attachedAtIndex;
	}
}
