import { RelationalUnitLocation } from "./RelationalUnitLocation.js";

export class DocAttacherLocation extends RelationalUnitLocation {
	/**
	 *
	 * @param {Object} param
	 * @param {CmptDoc} param.cmptDoc
	 * @param {CmptHookDoc} param.cmptHookDoc
	 */
	constructor({ cmptDoc, cmptHookDoc }) {
		super();
		this.cmptDoc = cmptDoc; //CmptDoc
		this.cmptHookDoc = cmptHookDoc; //CmptHookDoc
	}
}
