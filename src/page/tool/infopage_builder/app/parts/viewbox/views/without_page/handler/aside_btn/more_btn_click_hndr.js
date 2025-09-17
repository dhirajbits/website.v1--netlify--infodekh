import { createSelectOptionListCmpt } from "../../../_common_cmpts/utility/select_option_list__v2.js";
import { pageTypeToVisiblePageType } from "../../../_common_cmpts/utility/page_type_to_visible_page_type.js";
import { CmptHookWithIntractiveEHPE } from "../../utility/CmptHookWithIntractiveEHPE.js.js";
import { UICmpt } from "../../../../utility/ui_cmpt/UICmpt.js";


let selectOptionListBackgroundCoverElmt = null;

export function moreBtnClickHndr({event, viewbox, view, panel}) {
   openSelectOptionList({event, viewbox, view, panel});
   event.stopPropagation();
}


function openSelectOptionList({event, viewbox, view, panel}) {

   if (selectOptionListBackgroundCoverElmt) return;

   let selectOptionListCmpt = null;
   [selectOptionListBackgroundCoverElmt, selectOptionListCmpt] = createSelectOptionListCmpt({
      cmptName: "moreBtnSelectOptionList",
      optionItemList: [
         {
            type: "option",
            id: "createNewPage",
            optionName: "New Page",
            haveNest: true,
            callback: ({event}) => {
               openSOLOfNewPage({event, viewbox, view, panel});
               event.stopPropagation();
            },
            // callbackArgDict : {},
            // callbackOnce : true,
         },
         {
            type: "option",
            id: "resetCurrentPage",
            optionName: "Reset Page",
            haveNest: false,
            callback: async ({event}) => {
               return resetPageConformationDialog({event, viewbox, view, panel});
               await panel.Page.zMtd__resetPage();
               view.reBuild();
            },
            // callbackArgDict : {},
            // callbackOnce : true,
         },
         {
            type: "option",
            id: "loadPageFromFile",
            optionName: "Load from File",
            haveNest: false,
            isMuted: true,
            // callback: "function",
            // callbackArgDict : {},
            // callbackOnce : true,
         },
      ],
      right: document.body.clientWidth - event.pageX + "px",
      top: event.pageY + "px",
      callbackOnSOLClosing: closeSelectOptionList
   });

}

function closeSelectOptionList() {
   if (!selectOptionListBackgroundCoverElmt) return;
   try {document.body.removeChild(selectOptionListBackgroundCoverElmt);} catch(e) {}
   selectOptionListBackgroundCoverElmt = null;
}


function openSOLOfNewPage({event, viewbox, view, panel}) {
   // Creating select option list definition
   const selectOptionDefinition = [];

   const availablePageTypes = panel.Page.get__availablePageTypes();
   
   for (let pageType of availablePageTypes) {
      let visiblePageType = pageTypeToVisiblePageType[pageType];
      if (!visiblePageType) visiblePageType = pageType;

      const option = {
         type: "option",
         id: `${pageType}Option`,
         optionName: visiblePageType,
         callback: async () => {
            CmptHookWithIntractiveEHPE.groupNameToTmptDetailsList = null;
            const error = await panel.Page.zMtd__createNewBlankPageOfType({pageType});
            view.reBuild();
            view.loadPage();
         },
         callbackOnce: true,
      }

      selectOptionDefinition.push(option);
   }

   const [coverElmt, solCmpt] = createSelectOptionListCmpt({
      cmptName: "newPageMaker",
      optionItemList: selectOptionDefinition,
      right: document.body.clientWidth - event.pageX + "px",
      top: event.pageY + "px",
      coverBg: "#7b3c3c00",
      callbackOnSOLClosing: closeSelectOptionList
   });

}

function resetPageConformationDialog({event, viewbox, view, panel}) {
   const cmpt = new UICmpt({
      name: "resetPageConformationDialog",
      tagname: "div"
   });

   cmpt.html = `
      <div>
         <p class="ArticleParagraph">Do you really want to reset page. This will make you loose your current page.</p>
         <div>
            <div class="--VBCC--yesBtn --VBCC--btn">Yes</div>
            <div class="--VBCC--noBtn --VBCC--btn">No</div>
         </div>
      </div>
   `;

   cmpt.css = `
      #----- {
         position: fixed;
         left: 0;
         top: 0;
         width: 100%;
         height: 100vh;
         background-color: #7b3c3c00;
      }
      
      #----- > div {
         position: fixed;
         left: 50%;
         top: 50%;
         transform: translate(-50%, -50%);
         padding: 1rem;
         padding-bottom: 0.5rem;
         max-width: 400px;
         max-height: 300px;
         min-width: 200px;
         min-height: 100px;
         background-color: var(--COLOR--dark, black);
         border: 1px solid #e71b2f86;
         border-radius: 1rem;
         overflow: auto;
      }

      #----- > div > p {
         margin: 1rem;
         // width: 100%;
      }
      
      #----- > div > div {
         margin-top: 2rem;
         width: 100%;
         padding: 1rem;
         display: flex;
         justify-content: space-between;
         gap: 1rem;
      }

      #----- > div > div > .--VBCC--btn {
         padding: 0.3rem 0.5rem;
         color: var(--COLOR--dark--dark, black);
         background-color: var(--COLOR--light, whitesmoke);
         border-radius: 0.5rem;
         cursor: pointer;
      }

      #----- > div > div > .--VBCC--yesBtn {
         border: 2px solid #e71b2fff;
         background-color: transparent;
         color: #e71b2fff;
      }
         
      #----- > div > div > .--VBCC--noBtn {
         // background-color: #1db658ff;
      }
   `;


   cmpt.addHook({
      name: "yesBtn",
      selector: "#----- > div > div > .--VBCC--yesBtn",
      type: UICmpt.HOOKTYPE.GRAB,
   });

   cmpt.addHook({
      name: "noBtn",
      selector: "#----- > div > div > .--VBCC--noBtn",
      type: UICmpt.HOOKTYPE.GRAB,
   });

   cmpt.hook("yesBtn").bodyElmt.onclick = async () => {
      await panel.Page.zMtd__resetPage();
      view.reBuild();
   }

   cmpt.putInsideElmtWithStyle({elmt: document.body});
   console.log("resetPageConformationDialog funtion runned successfully...")

   cmpt.bodyElmt.onclick = (event) => {
      try {cmpt.pullFromElmtWithStyle({elmt: document.body})} catch (e) {}
   }
}