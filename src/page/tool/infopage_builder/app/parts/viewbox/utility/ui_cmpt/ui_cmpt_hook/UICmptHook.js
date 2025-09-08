import { UICmpt } from "../UICmpt.js";
import { UICmptHookStyle } from "./UICmptHookStyle.js";

export class UICmptHook {
	constructor({ name, elmt, type, uiCmpt }) {
		this.uiCmpt = uiCmpt; //UICmpt
		this.name = name; //String
		this.bodyElmt = elmt; //:HtmlElmt
		this.style = new UICmptHookStyle();
		this.type = type; //String
		this.attachedUICmpts = []; //Array[UICmpt]

      this.bodyElmt.classList.add(`--UI-CMPT-HOOK--name-${this.name}--`)
	}

	get childUICmpts() {
		return [...this.attachedUICmpts];
	}

	attach(attachable) {
		switch (this.type) {
			case UICmpt.HOOKTYPE.TEXT:
				this._attachText(attachable);
				break;

			case UICmpt.HOOKTYPE.HTML:
				this._attachHtml(attachable);
				break;

			case UICmpt.HOOKTYPE.CMPT:
				if (this.attachedUICmpts.length)
					this._detachUICmpt(this.attachedUICmpts[0]);
				this._attachUICmpt(attachable);
				break;

			case UICmpt.HOOKTYPE.CMPT_LIST:
				this._attachUICmpt(attachable);
				break;

			default:
				throw new Error("Undefined 'UICmptHook' type.");
				break;
		}
	}

	detach(uiCmpt = null) {
		switch (this.type) {
			case this.uiCmpt.HOOKTYPE.TEXT:
				this._detachText();
				break;

			case this.uiCmpt.HOOKTYPE.HTML:
				this._detachHtml();
				break;

			case this.uiCmpt.HOOKTYPE.CMPT:
            if (uiCmpt) {
               this._detachUICmpt(uiCmpt)
            }
				else if (this.attachedUICmpts.length) {
					this._detachUICmpt(this.attachedUICmpts[0]);
            }
				break;

			case this.uiCmpt.HOOKTYPE.CMPT_LIST:
				if (uiCmpt) {
               this._detachUICmpt(uiCmpt);
            }
            else {
               for (let uiCmpt of this.attachedUICmpts) {
                  this._detachUICmpt(uiCmpt);
               }
            }
				break;

			default:
				throw new Error("Undefined 'UICmptHook' type.");
				break;
		}
	}

	_attachText(text) {
		if (typeof text !== "string") return;
		this.bodyElmt.textContent = text;
	}

	_detachText() {
		this.bodyElmt.textContent = "";
	}

	_attachHtml(html) {
		if (typeof html !== "string") return;
		this.bodyElmt.innerHTML = html;
	}

	_detachHtml() {
		this.bodyElmt.innerHTML = "";
	}

	_attachUICmpt(uiCmpt) {
		if (!(uiCmpt instanceof UICmpt)) return;
		// Updaing given uiCmpt
		uiCmpt.parent = this.uiCmpt;
		uiCmpt.parentHook = this;

		// Updating this
		this.attachedUICmpts.push(uiCmpt);

		// Updating html document
		this.bodyElmt.appendChild(uiCmpt.bodyElmt);
		this.style.bodyElmt.appendChild(uiCmpt.style.bodyElmt);
	}

	_detachUICmpt(uiCmpt) {
		if (!this.attachedUICmpts.includes(uiCmpt)) return;

		// Updating given uiCmpt
		uiCmpt.parent = null;
		uiCmpt.parentHook = null;

		// Updating this
		this.attachedUICmpts = this.attachedUICmpts.filter(
			(attachedUICmpt) => attachedUICmpt !== uiCmpt
		);

		this.bodyElmt.removeChild(uiCmpt.bodyElmt);
		this.style.bodyElmt.removeChild(uiCmpt.style.bodyElmt);
	}
}
