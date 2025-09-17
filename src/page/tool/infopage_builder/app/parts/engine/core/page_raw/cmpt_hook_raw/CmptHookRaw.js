import { HookStyle as CmptHookStyleRaw } from "../style/HookStyle.js";
import { HookStyleConfig as CmptHookStyleConfigRaw } from "../style_config/HookStyleConfig.js";
import { RawAttacherLocation } from "../attachment2/location/RawAttacherLocation.js";
import { AttacherHub } from "../attachment2/attacher/AttacherHub.js";
// #########################################################################

export class CmptHookRaw {
	static fromGeneDict({ geneDict, cmptRaw, tmptHook, relationalUnitRefRegister}) {
		return new CmptHookRaw({
			cmptRaw: cmptRaw,
			tmptHook: tmptHook,
			geneDict: geneDict,
			relationalUnitRefRegister: relationalUnitRefRegister,
		});
	}

	constructor({ cmptRaw, tmptHook, relationalUnitRefRegister, geneDict }) {
		this.cmptRaw = cmptRaw; // CmptRaw
		this.id = null; // Number
		this.refId = null; // String
		this.idLikeClassName = null; // String
		this.tmptHook = tmptHook; // TmptHook
		this.name = ""; // String
		this.type = "grab"; // String
		this.definedScopes = []; // Array[String]
		this.style = null; // CmptHookStyleRaw
		this.styleConfig = null; // CmptHookStyleConfigRaw
		this.attacher = null; // Attacher

		// ASSINGING PROPERTIES
		if (geneDict) {
			this._constructFromGeneDict({
				geneDict: geneDict,
				tmptHook: tmptHook,
				cmptRaw: cmptRaw,
				relationalUnitRefRegister: relationalUnitRefRegister,
			});
		} else {
			this.cmptRaw = cmptRaw;
			this.id = IdUtility.getUniqueId();
			this.refId = ConstructionUtility.generateRefId({
				id: this.id,
			});

			this.idLikeClassName = ConstructionUtility.generateIdLikeClassName({
				id: this.id,
			});

			this.tmptHook = tmptHook;
			this.name = tmptHook.name;
			this.type = tmptHook.type;
			this.definedScopes = tmptHook.definedScopes;

			this.style = ConstructionUtility.createCmptHookStyleRaw({
				idLikeClassName: this.idLikeClassName,
			});

			// this.styleConfig = ConstructionUtility.createCmptHookStyleConfigRaw(
			// 	{
			// 		tmptHook: tmptHook,
			// 		idLikeClassName: this.idLikeClassName,
			// 	}
			// );

			this.attacher = ConstructionUtility.createAttacher({
				cmptRaw: cmptRaw,
				cmptHookRaw: this,
				relationalUnitRefRegister: relationalUnitRefRegister,
			});
		}
	}

	_constructFromGeneDict({ geneDict, tmptHook, cmptRaw, relationalUnitRefRegister }) {
		this.id = geneDict.id || IdUtility.getUniqueId();
		this.refId =
			geneDict.refId ||
			ConstructionUtility.generateRefId({
				id: this.id,
			});

		this.idLikeClassName =
			geneDict.idLikeClassName ||
			ConstructionUtility.generateIdLikeClassName({
				id: this.id,
			});

		this.tmptHook = tmptHook;
		this.name = geneDict.name || tmptHook.name;
		this.type = geneDict.type || tmptHook.type;
		this.definedScopes = geneDict.definedScopes || tmptHook.definedScopes;

		this.style = ConstructFromGeneDictUtility.createCmptHookStyleRaw({
			geneDict: geneDict,
			idLikeClassName: this.idLikeClassName,
		});

		// this.styleConfig =
		// 	ConstructFromGeneDictUtility.createCmptHookStyleConfigRaw({
		// 		geneDict: geneDict,
		// 		tmptHook: tmptHook,
		// 		idLikeClassName: this.idLikeClassName
		// 	});

		this.attacher = ConstructFromGeneDictUtility.createAttacher( {
			geneDict: geneDict,
			cmptRaw: cmptRaw,
			cmptHookRaw: this,
			relationalUnitRefRegister: relationalUnitRefRegister
		});
	}

	toGeneDict() {
		const geneDict = {
			id: this.id,
			refId: this.refId,
			idLikeClassName: this.idLikeClassName,
			cmptHookStyleRawGeneDict: this.style.configurations,
			// cmptHookStyleConfigRawGeneDict:
			// 	this.styleConfig.getConfigurationDict(),
			attacherGeneDict: this.attacher.toGeneDict(),
		};
		return geneDict;
	}
}

// ###########################################################################

class ConstructionUtility {
	static generateRefId({ id }) {
		return "cmptHookRefId" + id;
	}

	static generateIdLikeClassName({ id }) {
		return "cmptHookIdLikeClassName" + id;
	}

	static createCmptHookStyleRaw({ idLikeClassName }) {
		return new CmptHookStyleRaw({
			idLikeClassName: idLikeClassName,
			declerations: {},
		});
	}

	static createCmptHookStyleConfigRaw({ tmptHook, idLikeClassName }) {
		return new CmptHookStyleConfigRaw({
			tmptHookStyleConfig: tmptHook.base.styleConfig,
			hookIdLikeClassName: idLikeClassName,
			configurationDict: {},
		});
	}

	static createAttacher({ cmptRaw, cmptHookRaw, relationalUnitRefRegister}) {
		// Creating attacher location
		const attacherLoc = new RawAttacherLocation({
			cmptRaw: cmptRaw,
			cmptHookRaw: cmptHookRaw,
		});

		// Creating attacher object
		const attacherClass = AttacherHub.getAttacherClassByCmptHookType({
			type: cmptHookRaw.type,
		});

		if (!attacherClass) return;

		const attacher = new attacherClass({
			location: attacherLoc,
			relationalUnitRefRegister: relationalUnitRefRegister,
		});

		// Adding default text given in tmpt of data hook
		if (cmptHookRaw.type === "data")
			attacher.attach(cmptHookRaw.tmptHook.bodyElmt.textContent.trim())

		return attacher;
	}
}

class ConstructFromGeneDictUtility {
	static createCmptHookStyleRaw({ geneDict, idLikeClassName }) {
		return new CmptHookStyleRaw({
			idLikeClassName: idLikeClassName,
			declerations: geneDict.cmptHookStyleRawGeneDict || {},
		});
	}

	static createCmptHookStyleConfigRaw({ geneDict, tmptHook, idLikeClassName }) {
		return new CmptHookStyleConfigRaw({
			tmptHookStyleConfig: tmptHook.styleConfig,
			hookIdLikeClassName: idLikeClassName,
			configurationDict: geneDict.cmptHookStyleConfigRawGeneDict || {},
		});
	}

	static createAttacher({ geneDict, cmptRaw, cmptHookRaw, relationalUnitRefRegister }) {
		// Creating attacher location
		const attacherLoc = new RawAttacherLocation({
			cmptRaw: cmptRaw,
			cmptHookRaw: cmptHookRaw,
		});

		// Creating attacher object
		const attacherClass = AttacherHub.getAttacherClassByCmptHookType({
			type: cmptHookRaw.type,
		});

		if (!attacherClass) return;

		const attacher = attacherClass.fromGeneDict({
			geneDict: geneDict.attacherGeneDict,
			location: attacherLoc,
			relationalUnitRefRegister: relationalUnitRefRegister,
		});

		return attacher;
	}
}


class IdUtility {
	static counter = 1;

	static getUniqueId() {
		this.counter += 1;
		return Number(`${Date.now()}${this.counter}`);
	}
}
