import { Viewbox1__withHtmlDoc } from "./Viewbox1__withHtmlDoc.js";

export class Viewbox2__withView extends Viewbox1__withHtmlDoc {
	constructor({ panel }) {
		super({ panel });
		this.Title = new Title({ base: this });
		this.CurrentView = new CurrentView({ base: this });
	}
}

class Title {
	constructor({ base }) {
		this.base = base; //Viewbox
	}

	reset() {
		this.base._resetTitleElmt();
	}

	get() {
		return this.base._titleElmt.textContent;
	}

	update({ title }) {
		this.base._updateTitleElmt({ title });
	}
}

class CurrentView {
	constructor({ base }) {
		this.base = base; //Viewbox
		this.view = null; //View
	}

	reset() {
      this.base.Title.reset();
      this.base._resetStyleElmt();
		this.base._resetBodyElmt();
	}
	get() {
		return this.view;
	}

	update({ view }) {
		this.view = view;
		this.base.Title.update({ title: view.title });
      this.base._updateStyleElmt({elmt: view.styleElmt})
		this.base._updateBodyElmt({elmt: view.bodyElmt});
	}
}
