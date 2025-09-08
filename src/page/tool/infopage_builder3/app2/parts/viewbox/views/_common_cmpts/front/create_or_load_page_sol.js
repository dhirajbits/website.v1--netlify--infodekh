import { createSelectOptionListCmpt } from "../utility/select_option_list.js";
import { pageTypeToVisiblePageType } from "../utility/page_type_to_visible_page_type.js";


export function createCreateOrLoadPageSOLCmpt({view, panel}) {
   const createBlankPageSOLDef = {
      type: "optionCatagory",
      title: "create blank page",
      value: []
   };

   const availablePageTypes = panel.Page.get__availablePageTypes();
   for (let pageType of availablePageTypes) {

      let visiblePageType = pageTypeToVisiblePageType[pageType];
      if (!visiblePageType) visiblePageType = pageType;

      const option = {
         type: "option",
         id: `${pageType}Option`,
         optionName: visiblePageType,
         callback: () => {
            const error = panel.Page.mtd__createNewBlankPageOfType({pageType});
            view.loadPage();
         },
         callbackOnce: true,
      }

      createBlankPageSOLDef.value.push(option);
   }

   // Making SelectOptionDefinition
   const selectOptionListDefinition = [];

   // Adding Page type to create blank page
   if (createBlankPageSOLDef.value.length) {
      selectOptionListDefinition.push(createBlankPageSOLDef);
   }
      
   // Adding option for loading page from file
   selectOptionListDefinition.push({
      type: "option",
      id: "loadPageFromFile",
      optionName: "Load from file",
      callback: () => {console.log("load from file.")},
      haveNest: false,
   });

   // Making SOL Cmpt
   const cmpt = createSelectOptionListCmpt({
      cmptName: "newPageMaker",
      optionItemList: selectOptionListDefinition,
   });

   cmpt.css = `
      #----- {
         box-shadow: 0px 0px 50px #00000094;
      }
   `;
   return cmpt;
}