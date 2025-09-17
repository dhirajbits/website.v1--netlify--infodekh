import { UICmpt } from "../../../utility/ui_cmpt/UICmpt.js";
import { moreBtnClickHndr } from "../../without_page/handler/aside_btn/more_btn_click_hndr.js";

export function createActionBtnsStripCmpt({viewbox, view, panel}) {
	const cmpt = new UICmpt({
		name: "actionBtnsStrip",
		tagname: "section",
	});

	cmpt.html = `
      <button class="codeBtn">Code</button>
      <button class="saveBtn">Save</button>
      <button class="moreBtn">:More:</button>
   `;

	cmpt.css = `
      #----- {
         display: flex;
         gap: 0.75rem;
         color: black;
         padding: var(--_WIDTH--aside-padding);
         font-size: 1rem;

      }

      #----- button {
         padding: 0.5rem 1rem;
         border-radius: 8px;
         background-color: #D9D9D9;
         border: none;
      }

      #----- .codeBtn {
         background-color: #518AB8;
      }

      #----- button:hover {
         filter: brightness(150%);
      }

      #----- button:active {
         filter: brightness(100%);
      }
   `;

	cmpt.addHook({
		name: "codeBtn",
		selector: "#----- .codeBtn",
		type: UICmpt.HOOKTYPE.GRAB,
	});

	cmpt.addHook({
		name: "saveBtn",
		selector: "#----- .saveBtn",
		type: UICmpt.HOOKTYPE.GRAB,
	});

	cmpt.addHook({
		name: "moreBtn",
		selector: "#----- .moreBtn",
		type: UICmpt.HOOKTYPE.GRAB,
	});

   cmpt.hook("moreBtn").bodyElmt.onclick = (event) => {
      moreBtnClickHndr({event, viewbox, view, panel});
   }

   cmpt.hook("codeBtn").bodyElmt.onclick = async () => {
      console.log(await panel.Page.zMtd__generateHtmlMarkup());
   }

	return cmpt;
}
