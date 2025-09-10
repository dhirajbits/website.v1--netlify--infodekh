import { UICmpt } from "../../../utility/ui_cmpt/UICmpt.js";


export function createArticleTypeBadgeCmpt() {
   const cmpt = new UICmpt({
      name: "articleTypeBadge",
      tagname: "div",
   });

   cmpt.html = `<div class="articleType">Article Type</div>`

   cmpt.css = `
      #----- {
         padding: 0.5rem 1rem;
         padding-left: 1.5rem;
         background-color: #333;
         border-right: 2px solid grey;
         border-top-left-radius: 50px;
         border-bottom-left-radius: 50px;
         width: fit-content;
      }

      #----- .articleType {
         text-align: left;
         font-size: 1rem;
         overflow: hidden;
      }

   `;

   cmpt.addHook({
      name: "articleType",
      selector: "#----- .articleType",
      type: UICmpt.HOOKTYPE.TEXT
   });

   return cmpt;
}