import { CmptHookRaw } from "../cmpt_hook_raw/CmptHookRaw.js";
import { CmptStyle as CmptRawStyle } from "../style/CmptStyle.js";
import { CmptStyleConfig as CmptRawStyleConfig } from "../style_config/CmptStyleConfig.js";
import { RawAttachingPoint } from "../attachment2/attaching_point/RawAttachingPoint.js";
import { RawAttachingPointLocation } from "../attachment2/location/RawAttachingPointLocaiton.js";

//#####################################################################

export class CmptRaw {
	static fromGeneDict({ geneDict, tmpt , relationalUnitRefRegister}) {
		return new CmptRaw({
			geneDict: geneDict,
			tmpt: tmpt,
			relationalUnitRefRegister: relationalUnitRefRegister,
		});
	}
	constructor({ tmpt, relationalUnitRefRegister, geneDict }) {
		// DEFINITION PROPERTIES
		this.id = null; // Number
		this.refId = null; // String
		this.idLikeClassName = null; // String
		
		this.nickname = ""; //String
		this.livingScopes = []; //Array[String]
		this.isScopeIsolated = false; //Boolean
		
		this.tmpt = null; // Tmpt
		this.style = null; // CmptRawStyle
		this.styleConfig = null; // CmptRawStyleConfig
		this.attachingPoint = null; // AttachingPoint
		this.hookNameToHookRaw = {}; // CmptHookRaw

		// ASSIGING PROPERTIES (FROM GENEDICT)
		if (geneDict) {
			this._constructFromGeneDict({
				geneDict: geneDict,
				tmpt: tmpt,
				relationalUnitRefRegister: relationalUnitRefRegister
			});
		} 
		
		// ASSIGING PROPERTIES
		else {
			this.id = IdUtility.getUniqueId();
			this.refId = ConstructionUtility.generateRefId({ id: this.id });
			this.idLikeClassName = ConstructionUtility.generateIdLikeClassName({
				id: this.id,
			});

			this.tmpt = tmpt;
			
			this.nickname = tmpt.name;
			this.livingScopes = tmpt.livingScopes;
			this.isScopeIsolated = tmpt.isScopeIsolated;

			this.style = ConstructionUtility.createCmptRawStyleObj({
				idLikeClassName: this.idLikeClassName,
			});

			this.styleConfig = ConstructionUtility.createCmptRawStyleConfigObj({
				tmpt: this.tmpt,
				idLikeClassName: this.idLikeClassName,
			});

			this.attachingPoint = ConstructionUtility.createAttachingPoint({
				cmptRaw: this,
				relationalUnitRefRegister: relationalUnitRefRegister,
			});

			this.hookNameToHookRaw =
				ConstructionUtility.createHookNameToHookRaw({
					cmptRaw: this,
					tmpt: this.tmpt,
					relationalUnitRefRegister: relationalUnitRefRegister
				});
		}

		// console.log(this.hookNameToHookRaw)
	}

	_constructFromGeneDict({ geneDict, tmpt, relationalUnitRefRegister }) {
		this.id = geneDict.id || IdUtility.getUniqueId();
		this.refId =
			geneDict.refId ||
			ConstructionUtility.generateRefId({ id: this.id });

		this.idLikeClassName =
			geneDict.isLikeClassName ||
			ConstructionUtility.generateIdLikeClassName({
				id: this.id,
			});
		this.tmpt = tmpt;

		this.nickname = geneDict.nickname || tmpt.name;
		this.livingScopes = tmpt.livingScopes;
		this.isScopeIsolated = tmpt.isScopeIsolated;

		this.style = ConstructionFromGeneDictUtility.createCmptRawStyleObj({
			geneDict: geneDict,
			idLikeClassName: this.idLikeClassName,
		});

		this.styleConfig =
			ConstructionFromGeneDictUtility.createCmptRawStyleConfigObj({
				geneDict: geneDict,
				tmpt: this.tmpt,
				idLikeClassName: this.idLikeClassName,
			});

		this.attachingPoint =
			ConstructionFromGeneDictUtility.createAttachingPoint({
				geneDict: geneDict,
				cmptRaw: this,
				relationalUnitRefRegister: relationalUnitRefRegister,
			});

		this.hookNameToHookRaw =
			ConstructionFromGeneDictUtility.createHookNameToHookRaw({
				geneDict: geneDict,
				cmptRaw: this,
				tmpt: this.tmpt,
				relationalUnitRefRegister: relationalUnitRefRegister,
			});
	}

	getHook({hookName}) {
		return this.hookNameToHookRaw[hookName];
	}

	toGeneDict() {
		const hookNameToHookRawGeneDict = {};
		for (let hookName in this.hookNameToHookRaw) {
			const hookRaw = this.hookNameToHookRaw[hookName];
			hookNameToHookRawGeneDict[hookName] = hookRaw.toGeneDict();
		}

		const geneDict = {
			id: this.id,
			refId: this.refId,
			idLikeClassName: this.idLikeClassName,
			nickname: this.nickname,
			cmptRawStyleGeneDict: this.style.configurations,
			cmptRawStyleConfigGeneDict: this.styleConfig.getConfigurationDict(),
			attachingPointGeneDict: this.attachingPoint.toGeneDict(),
			hookNameToHookRawGeneDict: hookNameToHookRawGeneDict,
			tmptRefId: this.tmpt.refId,
		};
		return geneDict;
	}
}

//######################################################################

class ConstructionUtility {
	static generateRefId({ id }) {
		return "cmptRawRefId" + id;
	}

	static generateIdLikeClassName({ id }) {
		return "idLikeClassName" + id;
	}

	static createCmptRawStyleObj({ idLikeClassName }) {
		return new CmptRawStyle({
			idLikeClassName: idLikeClassName,
		});
	}

	static createCmptRawStyleConfigObj({ tmpt, idLikeClassName }) {
		return new CmptRawStyleConfig({
			tmptStyleConfig: tmpt.styleConfig,
			cmptIdLikeClassName: idLikeClassName,
			configurationDict: {},
		});
	}

	static createAttachingPoint({ cmptRaw, relationalUnitRefRegister}) {
		const apLocation = new RawAttachingPointLocation({
			cmptRaw: cmptRaw,
		});

		const ap = new RawAttachingPoint({
			location: apLocation,
			relationalUnitRefRegister: relationalUnitRefRegister,
		});
		return ap;
	}

	static createHookNameToHookRaw({ cmptRaw, tmpt , relationalUnitRefRegister}) {
		const hookNameToHookRaw = {};
		for (let hookName in tmpt.hooks) {
			const hookRaw = new CmptHookRaw({
				cmptRaw: cmptRaw,
				tmptHook: tmpt.hooks[hookName],
				relationalUnitRefRegister: relationalUnitRefRegister
			});
			hookNameToHookRaw[hookName] = hookRaw;
		}
		return hookNameToHookRaw;
	}
}

class ConstructionFromGeneDictUtility {
	static createCmptRawStyleObj({ geneDict, idLikeClassName }) {
		return new CmptRawStyle({
			idLikeClassName: idLikeClassName,
			decleration: geneDict.cmptRawStyleGeneDict,
		});
	}

	static createCmptRawStyleConfigObj({ geneDict, tmpt, idLikeClassName }) {
		return new CmptRawStyleConfig({
			tmptStyleConfig: tmpt.styleConfig,
			cmptIdLikeClassName: idLikeClassName,
			configurationDict: geneDict.cmptRawStyleConfigGeneDict,
		});
	}

	static createAttachingPoint({ geneDict, cmptRaw, relationalUnitRefRegister}) {
		const apLocation = new RawAttachingPointLocation({
			cmptRaw: cmptRaw,
		});

		const ap = RawAttachingPoint.fromGeneDict({
			geneDict: geneDict.attachingPointGeneDict,
			geneDict: geneDict.attachingPointGeneDict,
			location: apLocation,
			relationalUnitRefRegister: relationalUnitRefRegister
		});

		return ap;
	}

	static createHookNameToHookRaw({ geneDict, cmptRaw, tmpt, relationalUnitRefRegister}) {
		const hookNameToHookRaw = {};
		for (let hookName in tmpt.hooks) {
			const tmptHook = tmpt.hooks[hookName];
			const hookRaw = CmptHookRaw.fromGeneDict({
				geneDict: geneDict.hookNameToHookRawGeneDict[hookName],
				cmptRaw: cmptRaw,
				tmptHook: tmptHook,
				relationalUnitRefRegister: relationalUnitRefRegister
			});
			hookNameToHookRaw[hookName] = hookRaw;
		}
		return hookNameToHookRaw;
	}
}

class IdUtility {
	static counter = 0;

	static getUniqueId() {
		this.counter += 1;
		return Number(`${Date.now()}${this.counter}`);
	}
}
