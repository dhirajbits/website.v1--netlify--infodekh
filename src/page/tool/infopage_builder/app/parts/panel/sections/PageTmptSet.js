export class PageTmptSet {
	constructor({ panel }) {
		this.panel = panel; //Panel
	}

	async zMtd__getAllAvaiableTmptWithDetails() {
		return await this.panel.engine.Page.pageRaw.tmptSET.zGetAllAvaiableTmptDetails();
	}
}
