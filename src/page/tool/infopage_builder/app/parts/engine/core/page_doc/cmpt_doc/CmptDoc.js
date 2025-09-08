import { DocAttachingPointLocation } from "../doc_attachment2/location/DocAttachingPointLocation.js";
import { DocAttachingPoint } from "../doc_attachment2/attaching_point/DocAttachingPoint.js";
import { CmptStyleDoc } from "../style_doc/CmptStyleDoc.js";
import { CmptHookDoc } from "../cmpt_hook_doc/CmptHookDoc.js";

export class CmptDoc {
	constructor({ seed_cmptRaw, relationalUnitRefRegister }) {
		this.seed_cmptRaw = seed_cmptRaw; //CmptRaw
		this.bodyElmt = null;
		this.style = null;
		this.styleConfig = null;
		this.attachingPoint = null;
		this.hookNameToHookDoc = {};

		// ASSIGNING PROPERTIES
		this.bodyElmt = this._createBodyElmt();
		this.style = this._createStyleDoc();
		this.styleConfig = this._createStyleConfigDoc();

		this.attachingPoint = this._createAttachingPoint({
			relationalUnitRefRegister: relationalUnitRefRegister,
		});

		this.hookNameToHookDoc = this._createHookNameToHookDoc({
			relationalUnitRefRegister: relationalUnitRefRegister,
		});

		// MORE ACTIONS
		this._addDefaultClassesToBodyElmt();
	}

	get id() {
		return this.seed_cmptRaw.id;
	}

	get refId() {
		return this.seed_cmptRaw.refId;
	}

	get idLikeClassName() {
		return this.seed_cmptRaw.idLikeClassName;
	}

	get nickname() {
		return this.seed_cmptRaw.nickname;
	}

	get tmpt() {
		return this.seed_cmptRaw.tmpt;
	}

	get livingScopes() {
		return this.seed_cmptRaw.livingScopes;
	}

	get isScopeIsolated() {
		return this.seed_cmptRaw.isScopeIsolated;
	}

	set nickname(name) {
		this.seed_cmptRaw.nickname = String(name);
	}

	fitInsideElmt({ elmt }) {
		elmt.appendChild(this.bodyElmt);
	}

	fillInsideElmt({ elmt }) {
		elmt.innerHTML = "";
		this.fitInsideElmt({ elmt });
	}

	getHook({ hookName }) {
		return this.hookNameToHookDoc[hookName];
	}

	_createBodyElmt() {
		return this.seed_cmptRaw.tmpt.bodyElmt.cloneNode(true);
	}

	_createStyleDoc() {
		return new CmptStyleDoc({
			seed_cmptStyleRaw: this.seed_cmptRaw.style,
		});
	}

	_createStyleConfigDoc() {
		return {};
	}

	_createAttachingPoint({ relationalUnitRefRegister }) {
		const apLocation = new DocAttachingPointLocation({
			cmptDoc: this,
		});

		const docAttachingPoint = new DocAttachingPoint({
			seed_rawAttachingPoint: this.seed_cmptRaw.attachingPoint,
			location: apLocation,
			relationalUnitRefRegister: relationalUnitRefRegister,
		});
		return docAttachingPoint;
	}

	_addDefaultClassesToBodyElmt() {
		const defaultClassNames = ["--cmpt--", this.idLikeClassName];

		for (let className of defaultClassNames) {
			this.bodyElmt.classList.add(className);
		}
	}

	_createHookNameToHookDoc({ relationalUnitRefRegister }) {
      const hookNameToHookDoc = {};
		for (let hookName in this.seed_cmptRaw.hookNameToHookRaw) {
         const hookElmt = this._getHookElmtFromCmptBodyElmtByHookName({hookName})
			const hookRaw = this.seed_cmptRaw.getHook({ hookName: hookName });

         const hookDoc = new CmptHookDoc({
            seed_cmptHookRaw: hookRaw,
            bodyElmt: hookElmt, 
            cmpt: this,
            relationalUnitRefRegister: relationalUnitRefRegister
         });
         hookNameToHookDoc[hookDoc.name] = hookDoc;
		}
      return hookNameToHookDoc;
	}

   _getHookElmtFromCmptBodyElmtByHookName({hookName}) {
      const hookClassList = this.seed_cmptRaw.tmpt.hooks[hookName].bodyElmt.classList;
      if (!hookClassList.length) {
         throw new Error("Can't create cmptHookDoc --> Hook have no default classNames.");
      }

      let hookElmtSelector = "." + Array.from(hookClassList);
      const hookElmt = this.bodyElmt.querySelector(hookElmtSelector);

      if (!hookElmt) {
         throw new Error("Can't create cmptHookDoc --> Hook element not found in cmpt body elmt.");
      }

      return hookElmt;
   }
}
