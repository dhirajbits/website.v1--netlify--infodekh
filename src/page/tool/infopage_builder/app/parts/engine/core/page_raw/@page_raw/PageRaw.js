import { PageGeneralInfo } from "./page_raw_component/PageGeneralInfo.js";
import { PageMeta } from "./page_raw_component/PageMeta.js";
import { CmptRawBUSH } from "./page_raw_component/CmpRawtBUSH.js";
import { CmptRaw } from "../cmpt_raw/CmptRaw.js";
import { RelationalUnitRefRegister } from "./page_raw_component/RelationalUnitRefRegister.js";
import { FeatureCmptRaw } from "./features/FeatureCmptRaw.js";
import { TmptSET } from "./page_raw_component/TmptSET.js";

//############################################################

export class PageRaw {
	static async zFromGeneDict({ geneDict, tmptHub }) {
		const pageRaw = new PageRaw({
			geneDict: geneDict,
			tmptHub: tmptHub,
		});

		await pageRaw._zInit();
		return pageRaw;
	}

	constructor({ tmptSetNames, tmptHub, plateformCmptTmptRefId, geneDict }) {
		if (!tmptSetNames) tmptSetNames = [];

		this.tmptHub = null; // TmptHub
		this.plateformCmptTmptRefId = null; //String
		this.generalInfo = null; // PageGeneralInfo
		this.meta = null; // PageMeta
		this.tmptSET = null; //TmptSET
		this.relationalUnitRefRegister = null; //RelationalUnitRefRegister
		this.cmptRawBUSH = null; // CmptRawBUSH
		// this.initedFromGeneDict = Boolean(geneDict); //Boolean//Use in PageDoc in initial update of bodyelmt of hook;

		// ADDING FEATURE CLASS
		this.CmptRaw = new FeatureCmptRaw({ base: this });

		// ASSIGNING PROPERTIES (FROM GENEDICT)
		if (geneDict) {
			this.__geneDict = geneDict;
			this.__tmptHub = tmptHub;
		}

		// ASSIGNING PROPERTIES
		else {
			this.tmptHub = tmptHub;
			this.plateformCmptTmptRefId = plateformCmptTmptRefId;
			this.generalInfo = new PageGeneralInfo({});
			this.meta = new PageMeta({});
			this.relationalUnitRefRegister = new RelationalUnitRefRegister();
			this.cmptRawBUSH = new CmptRawBUSH();
			
			this.tmptSET = new TmptSET({
				tmptSetNames: tmptSetNames,
				tmptHub: this.tmptHub,
			})
		}
	}

	async _zInit() {
		if (this.__geneDict) {
			await this._zConstructFromGeneDict({
				geneDict: this.__geneDict,
				tmptHub: this.__tmptHub,
			});

			delete this.__geneDict;
			delete this.__tmptHub;
		}

		else {
			await this.CmptRaw.zCreateAndAdd({tmptRefId: this.plateformCmptTmptRefId});
		}
	}

	async _zConstructFromGeneDict({ geneDict, tmptHub}) {
		this.tmptHub = tmptHub;
		this.plateformCmptTmptRefId = geneDict.plateformCmptTmptRefId;
		this.generalInfo = PageGeneralInfo.fromGeneDict({
			geneDict: geneDict.generalInfo,
		});

		this.meta = PageMeta.fromGeneDict({
			geneDict: geneDict.meta,
		});

		this.tmptSET = TmptSET.fromGeneDict({
			geneDict: geneDict.tmptSETGeneDict,
			tmptHub: tmptHub
		});

		this.relationalUnitRefRegister = new RelationalUnitRefRegister();
		this.cmptRawBUSH = new CmptRawBUSH();

		await this._zConstructCmptRawBUSHFromGeneDict({ geneDict: geneDict });
	}

	async _zConstructCmptRawBUSHFromGeneDict({ geneDict }) {
		const cmptRawRefIdToCmptRaw = {};

		for (let cmptRawRefId in geneDict.cmptRawRefIdToCmptRawGeneDict) {
			const cmptRawGeneDict =
				geneDict.cmptRawRefIdToCmptRawGeneDict[cmptRawRefId];

				const cmptRawTmpt = await this.tmptHub.getTmptByRefId({
					tmptRefId: cmptRawGeneDict["tmptRefId"],
				});

			if (!cmptRawTmpt) throw new TmptNotFoundError();

			const cmptRaw = CmptRaw.fromGeneDict({
				geneDict: cmptRawGeneDict,
				tmpt: cmptRawTmpt,
				relationalUnitRefRegister: this.relationalUnitRefRegister,
			});

			this.cmptRawBUSH.addCmptRaw({ cmptRaw: cmptRaw });
		}
	}

	toGeneDict() {
		const cmptRawRefIdToCmptRawGeneDict =
			this.cmptRawBUSH.getAllCmptRawsInRefIdToCmptRawFormat();


		for (let [refId, cmptRaw] of Object.entries(
			cmptRawRefIdToCmptRawGeneDict
		)) {
			cmptRawRefIdToCmptRawGeneDict[refId] = cmptRaw.toGeneDict();
		}

		return {
			plateformCmptTmptRefId: this.plateformCmptTmptRefId,
			generalInfo: this.generalInfo.toGeneDict(),
			meta: this.meta.toGeneDict(),
			tmptSETGeneDict: this.tmptSET.toGeneDict(),
			cmptRawRefIdToCmptRawGeneDict: cmptRawRefIdToCmptRawGeneDict,
		};
	}
}
