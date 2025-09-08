import { PageGeneralInfo } from "./page_component/PageGeneralInfo.js";
import { PageMeta } from "./page_component/PageMeta.js";
import { TmptPool } from "./page_component/TmptPool.js";
import { CmptPool } from "./page_component/CmptPool.js";

export class Page {
	static fromGeneDict({ geneDict, plateformCmpt, tmpthub }) {
		if (!geneDict) {
			geneDict = {};
		}
		return new Page({
			tmpthub: tmpthub,
			plateformCmpt: plateformCmpt,
			geneDict: geneDict,
		});
	}


	constructor({ pageType, tmptSetNames, plateformCmpt, tmpthub, geneDict }) {
		this.pageType = null;
		this.tmpthub = null;
		this.plateformCmpt = null;

		this.generalInfo = null;
		this.meta = null;
		this.tmptPool = null;
		this.cmptPool = null;

		// Assigning properties
		if (geneDict) {
			// Construct from zInit method
			this.__tmpthub = tmpthub;
			this.__geneDict = geneDict;
			this.__plateformCmpt = plateformCmpt;
		} else {
			this.pageType = pageType;
			this.tmpthub = tmpthub;
			this.plateformCmpt = plateformCmpt;

			this.generalInfo = this._createGeneralInfo();
			this.meta = this._createPageMeta();

			this.tmptPool = this._createTmptPool({
				tmptSetNames: tmptSetNames,
				tmpthub: this.tmpthub,
			});

			this.cmptPool = this._createCmptPool({
				tmptPool: this.tmptPool,
			});
		}
	}

	async zInit() {
		if (this.__geneDict) {
			const r = await this._zFromGeneDict({
				tmpthub: this.__tmpthub,
				geneDict: this.__geneDict,
				plateformCmpt: this.__plateformCmpt,
			});

			delete this.__tmpthub;
			delete this.__geneDict;
			delete this.__plateformCmpt;

			return r;
		}
	}

	_createGeneralInfo() {
		return new PageGeneralInfo({});
	}

	_createPageMeta() {
		return new PageMeta({});
	}

	_createTmptPool({ tmptSetNames, tmpthub }) {
		return new TmptPool({
			tmptsets: tmptSetNames,
			tmpthub: tmpthub,
		});
	}

	_createCmptPool({ tmptPool }) {
		return new CmptPool({ tmptpool: tmptPool });
	}

	async _zFromGeneDict({ tmpthub, geneDict, plateformCmpt }) {
		this.pageType = geneDict.pageType;
		this.tmpthub = tmpthub;
		this.plateformCmpt = plateformCmpt;

		this.generalInfo = ConstructFromGeneDictUtility.createGeneralInfo({
			generalInfoGeneDict: geneDict.generalInfoGeneDict,
		});
		this.meta = ConstructFromGeneDictUtility.createPageMeta({
			pageMetaGeneDict: geneDict.pageMetaGeneDict,
		});

		this.tmptPool = ConstructFromGeneDictUtility.createTmptPool({
			tmptPoolGeneDict: geneDict.tmptPoolGeneDict,
			tmpthub: tmpthub,
		});

		this.cmptPool = await ConstructFromGeneDictUtility.zCreateCmptPool({
			cmptPoolGeneDict: geneDict.cmptPoolGeneDict,
			tmptPool: this.tmptPool,
		});
	}

	toGeneDict() {
		return {
			pageType: this.pageType,
			generalInfoGeneDict: this.generalInfo.toDefinitionDict(),
			pageMetaGeneDict: this.meta.toDefinitionDict(),
			tmptPoolGeneDict: this.tmptPool.toDICT(),
			cmptPoolGeneDict: this.cmptPool.toGeneDict(),
		};
	}
}

class ConstructFromGeneDictUtility {
	static createGeneralInfo({ generalInfoGeneDict }) {
		return new PageGeneralInfo({
			definitionDict: generalInfoGeneDict,
		});
	}

	static createPageMeta({ pageMetaGeneDict }) {
		return new PageMeta({
			definitionDict: pageMetaGeneDict,
		});
	}

	static createTmptPool({ tmptPoolGeneDict, tmpthub }) {
		return TmptPool.fromDICT({
			tmptPoolDict: tmptPoolGeneDict,
			tmpthub: tmpthub,
		});
	}

	static async zCreateCmptPool({ cmptPoolGeneDict, tmptPool }) {
		return await CmptPool.fromGeneDict({
			geneDict: cmptPoolGeneDict,
			tmptpool: tmptPool,
		});
	}
}
