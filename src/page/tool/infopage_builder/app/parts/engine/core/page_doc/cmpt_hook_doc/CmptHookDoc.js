import { AttacherHub } from "../doc_attachment2/attacher/AttacherHub.js";
import { DocAttacherLocation } from "../doc_attachment2/location/DocAttacherLocation.js";
import { CmptStyleDoc } from "../style_doc/CmptStyleDoc.js";

export class CmptHookDoc {
	constructor({ seed_cmptHookRaw, bodyElmt, cmpt, relationalUnitRefRegister}) {
		this.seed_cmptHookRaw = seed_cmptHookRaw; //CmptHookRaw
		this.cmpt = cmpt; //CmptDoc
		this.bodyElmt = bodyElmt; //HtmlElmt
		this.style = null; //CmptHookStyleDoc
		this.styleConfig = null; //CmptHookStyleConfigDoc
		this.attacher = null; //DocAttacher

		// ASSIGNING PROPERTIES
		this.style = this._createCmptHookStyleDoc();
		this.styleConfig = this._createCmptHookStyleConfigDoc();
		this.attacher = this._createAttacher({
			relationalUnitRefRegister: relationalUnitRefRegister,
		});

		// OTHER ACTIONS
		this._addDefaultClassesToBodyElmt({
			bodyElmt: this.bodyElmt,
		});

		
	}

   get refId() {
      return this.seed_cmptHookRaw.refId;
   }

   get id() {
      return this.seed_cmptHookRaw.id;
   }

   get name() {
      return this.seed_cmptHookRaw.name;
   }

   get type() {
      return this.seed_cmptHookRaw.type;
   }

	get idLikeClassName() {
		return this.seed_cmptHookRaw.idLikeClassName
	}

	updateAttacherHtmlDoc() {
		this.attacher.updateHtmlDoc();
	}

	_createBodyElmt() {
		return this.seed_cmptHookRaw.tmptHook.bodyElmt.cloneNode(
			true
		);
	}

	_createCmptHookStyleDoc() {
		return new CmptStyleDoc({
			seed_cmptStyleRaw: this.seed_cmptHookRaw.style,
		});
	}

	_createCmptHookStyleConfigDoc() {
		return {};
	}

	_createAttacher({ relationalUnitRefRegister }) {
		const attacherClass = AttacherHub.getAttacherClassByCmptHookType({
			type: this.type,
		});
		if (!attacherClass) return;

		const attacherLocation = new DocAttacherLocation({
			cmptDoc: this.cmpt,
			cmptHookDoc: this,
		});

		return new attacherClass({
			location: attacherLocation,
			seed_attacher: this.seed_cmptHookRaw.attacher,
			relationalUnitRefRegister: relationalUnitRefRegister
		});
	}

	_addDefaultClassesToBodyElmt() {
		const defaultClassNames = [
			"--cmptHook--",
			this.idLikeClassName,
		];

		for (let className of defaultClassNames) {
			this.bodyElmt.classList.add(className);
		}
	}
}
