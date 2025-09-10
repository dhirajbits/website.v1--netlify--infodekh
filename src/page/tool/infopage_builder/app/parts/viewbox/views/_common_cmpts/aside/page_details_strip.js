
import { UICmpt } from "../../../utility/ui_cmpt/UICmpt.js";
import { createArticleTypeBadgeCmpt } from "./article_type_badge.js";

export function createPageDetailsStripCmpt({panel}) {
	const cmpt = new UICmpt({
		name: "pageDetailsStrip",
		tagname: "section",
	});

	cmpt.html = `
      <div>
         <div>
            <div class="pagename">Untitled</div>
            <div class="articleTypeBadge">
            </div>
         </div>
      </div>
   `;

	cmpt.css = `
      #----- {
         padding: var(--_WIDTH--aside-padding);
         padding-block: 1rem;
         border-bottom: 2px solid var(--_COLOR--aside-strip-border);
         overflow: hidden;
      }

      #----- > div > div {
         display: flex;
         justify-content: space-between;
      }

      #----- .pagename {
         display: flex;
         align-items: center;
         font-weight: bolder;
         min-width: 140px;
         max-width: 140px;
         overflow: auto;
         scrollbar-width: none;
         text-wrap: nowrap;
         padding-top: 0.1rem;
      }

      #----- .pagename input {
         color: white;
         max-width: 160px;
         
         padding: 0.3rem 0.8rem;
         padding-left: var(--_WIDTH--aside-padding);
         padding-bottom: 0.4rem;
         margin-left: calc(-1 * var(--_WIDTH--aside-padding));
         
         position: absolute;
         border: none;
         transform: translateY(-5px);
         background-color: #222222;
      }

      #----- .articleTypeBadge {
         flex-shrink: 0;
      }
   `;

	cmpt.addHook({
		name: "pageName",
		selector: "#----- .pagename",
		type: UICmpt.HOOKTYPE.TEXT,
	});

	cmpt.addHook({
		name: "articleTypeBadge",
		selector: "#----- .articleTypeBadge",
		type: UICmpt.HOOKTYPE.CMPT,
	});

	const pageNameChangeHndr = ({panel}) => {
		const hook = cmpt.hook("pageName");
		const pageName = hook.bodyElmt.textContent;

		hook.bodyElmt.innerHTML = `
      <input type="text" id="pageName" value="${pageName}">
      `;

      hook.uiCmpt.css = "#----- .pagename {padding-top: 0.8rem}"

		hook.bodyElmt.querySelector("input").focus();

		hook.bodyElmt
			.querySelector("input")
			.setSelectionRange(0, pageName.length);

		hook.bodyElmt.onclick = null;
		hook.bodyElmt.querySelector("input").onkeydown = (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
            const pageName = hook.bodyElmt.querySelector("input").value.trim();
				hook.attach(pageName);
            hook.uiCmpt.css = "#----- .pagename {padding-top: 0.1rem;}";
            panel.Page.set__pageName({pageName});
            panel.Page.mtd__savePageToLocalStorage();
			}
			hook.bodyElmt.onclick = () => {
            pageNameChangeHndr({panel});
         };
		};
	};

	cmpt.hook("pageName").bodyElmt.onclick = () => {
      pageNameChangeHndr({panel});
   };

   const articleTypeBadgeCmpt = createArticleTypeBadgeCmpt();
   cmpt.hook("articleTypeBadge").attach(articleTypeBadgeCmpt)
	return cmpt;
}
