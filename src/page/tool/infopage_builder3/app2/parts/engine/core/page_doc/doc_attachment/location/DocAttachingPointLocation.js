import { RelationalUnitLocation } from "./RelationalUnitLocation.js";

export class DocAttachingPointLocation extends RelationalUnitLocation {
	/**
	 * @param {Object} param
	 * @param {CmptDoc} param.cmptDoc
	 */
	constructor({ cmptDoc }) {
		super();
      this.cmptDoc = cmptDoc; //CmptDoc
	}
}
