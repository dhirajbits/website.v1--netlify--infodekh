import { create2dPanelCmpt } from "../../_common_cmpts/utility/2d_panel.js";

export class CmptHookWithIntractiveEHPE {
	static instanceList = []; //Array[CmptHookWithIntrativeEHPE]
	static EHPEClickHndrList = []; //Array[any(null/function)];
	static isAllEHPEBecomeUnintractive = false; //Boolean

	static groupNameToTmptDetailsList = null;

	static assignGroupNameToTmptDetailsList({ allTmptDetails }) {
		allTmptDetails = Utility.setDefaultGroupNameToUngroupedTmpts({
			allTmptDetails,
		});

		this.groupNameToTmptDetailsList = Utility.getGroupNameToTmptDetailsList(
			{
				allTmptDetails,
			}
		);
	}

	static makeAllEHPEUnintractive() {
		this.EHPEClickHndrList = [];
		for (let instance of this.instanceList) {
			this.EHPEClickHndrList.push(
				instance.cmptHook.onCanvas.emptyHookPlaceholderElmt.onclick
			);
			instance.cmptHook.onCanvas.emptyHookPlaceholderElmt.onclick = null;
		}
		this.isAllEHPEBecomeUnintractive = true;
	}

	static makeAllEHPEIntractive() {
		if (!this.isAllEHPEBecomeUnintractive) return;
		for (let i=0; i < this.EHPEClickHndrList.length; i++) {
			this.instanceList[i].cmptHook.onCanvas.emptyHookPlaceholderElmt.onclick = this.EHPEClickHndrList[i];
		}
		this.isAllEHPEBecomeUnintractive = false;
	}

	constructor({ cmptHook, panel }) {
		CmptHookWithIntractiveEHPE.instanceList.push(this);

		this.cmptHook = cmptHook; // CmptHookDoc (with onConvas feature)
		this.panel = panel; // Panel
      this.tmptSelectionPanelCmpt = null; //UICmpt

		if (!this.cmptHook.onCanvas.emptyHookPlaceholderElmt) return;
      this.cmptHook.onCanvas.emptyHookPlaceholderElmt.onclick = this.EHPEClickHndr.bind(this);
	}

	async EHPEClickHndr(event) {
		await this.openTmptSelection2dPanel();
		event.stopPropagation();
	}

	async optionSelectionHndr({tmptDetails}) {
		this.closeTmptSelection2dPanel();
		const cmpt = await this.panel.Page.zMtd__createAndAddCmptToPage({tmptRefId: tmptDetails.refId});
		this.panel.Page.mtd__moveCmptToNewParent({
			cmptDoc: cmpt,
			parentCmptHookDoc: this.cmptHook,
		});

		for (let [hookName, hook] of Object.entries(cmpt.hookNameToHookDoc)) {
			new CmptHookWithIntractiveEHPE({cmptHook: hook, panel: this.panel})
		}
   }


	async openTmptSelection2dPanel() {

		if (!CmptHookWithIntractiveEHPE.groupNameToTmptDetailsList) {
			const error = await this.loadGroupNameToTmptDetailsList();
			if (error)
				throw new Error(
					"Can't load tmpt details of this page tmptSET."
				);
		}
		const groupNameToTmptDetailsList =
			CmptHookWithIntractiveEHPE.groupNameToTmptDetailsList;


      // Creating tmpt selection 2dPanel definition array
      const _2dPanelDefArr = Utility.create2dPanelDefArr({
         groupNameToTmptDetailsList: groupNameToTmptDetailsList,
         optionSelectionHndr: this.optionSelectionHndr.bind(this)
      });


      // Creating tmpt selection 2dPanel cmpt from definition array
      const tmptSelectionPanelCmpt = create2dPanelCmpt({ _2dPanelDefArr });
      this.tmptSelectionPanelCmpt = tmptSelectionPanelCmpt;


      // Attaching tmpt selection panel to view (html doc of view)
      tmptSelectionPanelCmpt.putInsideElmtWithStyle({elmt: document.body});
      tmptSelectionPanelCmpt.bodyElmt.onclick = (event) => event.stopPropagation();
      

		CmptHookWithIntractiveEHPE.makeAllEHPEUnintractive();
      document.body.onclick = this.closeTmptSelection2dPanel.bind(this);
	}

   closeTmptSelection2dPanel() {
      this.tmptSelectionPanelCmpt.pullFromElmtWithStyle({elmt: document.body});
		CmptHookWithIntractiveEHPE.makeAllEHPEIntractive();
      document.body.onclick = null;
		if(this.cmptHook.onCanvas.emptyHookPlaceholderElmt) {
			this.cmptHook.onCanvas.emptyHookPlaceholderElmt.onclick = this.EHPEClickHndr.bind(this);
		}
   }


	async loadGroupNameToTmptDetailsList() {
		const allTmptDetails =
			await this.panel.Tmpt.zMtd__getAllAvaiableTmptWithDetails();
		CmptHookWithIntractiveEHPE.assignGroupNameToTmptDetailsList({
			allTmptDetails,
		});
	}
}

class Utility {
	static setDefaultGroupNameToUngroupedTmpts({ allTmptDetails }) {
		for (let tmptRefId in allTmptDetails) {
			const tmptDetails = allTmptDetails[tmptRefId];
			if (tmptDetails.groupName === "") {
				tmptDetails.groupName = "main";
			}
		}
		return allTmptDetails;
	}

	static getGroupNameToTmptDetailsList({ allTmptDetails }) {
		const groupNameToTmptDetailsList = {};

		for (let tmptRefId in allTmptDetails) {
			const tmptDetails = allTmptDetails[tmptRefId];

			// Skipping plateform tmpt (it is use to make plateform for page, it should be only one on page and that is auto created by PageRaw constructor.)
			if (tmptDetails.name === "plateform") continue;

			if (tmptDetails.groupName in groupNameToTmptDetailsList) {
				groupNameToTmptDetailsList[tmptDetails.groupName].push(
					tmptDetails
				);
			} else {
				groupNameToTmptDetailsList[tmptDetails.groupName] = [
					tmptDetails,
				];
			}
		}

		return groupNameToTmptDetailsList;
	}

	static create2dPanelDefArr({ groupNameToTmptDetailsList, optionSelectionHndr }) {
		const defArr = [];

		for (let groupName in groupNameToTmptDetailsList) {
			defArr.push(
				this.createCatagoryOptionObj({
					groupName: groupName,
					tmptDetailsList: groupNameToTmptDetailsList[groupName],
					optionSelectionHndr: optionSelectionHndr,
				})
			);
		}
		return defArr;
	}

	static createCatagoryOptionObj({ groupName, tmptDetailsList, optionSelectionHndr }) {
		const options = [];
		for (let tmptDetails of tmptDetailsList) {
			options.push(this.createOptionObj({ tmptDetails, optionSelectionHndr }));
		}

		return {
			id: groupName,
			optionName: groupName,
			type: "catagoryOption",
			value: options,
		};
	}

	static createOptionObj({ tmptDetails, optionSelectionHndr }) {
		return {
			id: tmptDetails.refId,
			type: "option",
			optionName: tmptDetails.name,
			callback: async () => {
				await optionSelectionHndr({tmptDetails});
			},
		};
	}
}

