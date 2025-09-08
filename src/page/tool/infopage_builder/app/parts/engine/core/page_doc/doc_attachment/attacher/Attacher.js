import { DocAttacherLocation } from "../location/DocAttacherLocation.js";
import { RelationalUnit } from "../relational_unit/RelationalUnit.js";

export class Attacher extends RelationalUnit {
	/**
	 * @param {Object} param
	 * @param {String} param.attacherType
	 * @param {DocAttacherLocation} param.location
	 * @param {Boolean} param.isAttached
	 */
	constructor({ attacherType, location, isAttached }) {
		super({ location, isAttached });
		this.attacherType = attacherType; //String
	}
}
