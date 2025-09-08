import { UICmpt } from "../../../utility/ui_cmpt/UICmpt.js";

/*

const option = {
   type: "option",
   id: "unique name (will be use as hookName)",
   optionName: "option name that is viewed to user.",
   haveNest: false/true;
   callback: "function",
   callbackArgDict : {},
   callbackOnce : true,

}

const optionGroup = {
   type: "optionsGroup",
   value: [option, option],
}

const optionCatagory = {
   type: "optionsCatagory",
   catagoryName: "catagory name",
   value: [],
}
*/


export function createSelectOptionListCmpt({ cmptName, optionItemList }) {
   const cmpt = new UICmpt({
      name: cmptName,
      tagname: "div",
   });

   cmpt.css = `
      #----- {
         background-color: var(--COLOR--dark--dark);
         padding: 0.4rem 1rem;
         border-radius: 1rem;
         border: 1px solid #333;
         position: absolute;
         font-size: 1rem;
         text-align: left;
      }
   `;

   cmpt.addHook({
      name: "self",
      selector: "#-----",
      type: UICmpt.HOOKTYPE.CMPT_LIST,
   });

   let index = 0;
   for (let optionItem of optionItemList) {
      let _cmpt = null;

      let topLine = true;
      let bottomLine = true;
      switch (optionItem.type) {
         case ("option"):
            _cmpt = createOptionCmpt({optionItem});
            break;
         case ("optionGroup"):
            topLine = true;
            bottomLine = true;
            if (index === 0) topLine = false;
            if (index === optionItemList.length) bottomLine = false;
            _cmpt = createOptionGroupCmpt({optionItem}, topLine, bottomLine);
            break;
         case ("optionCatagory"):
            topLine = true;
            bottomLine = true;
            if (index === 0) topLine = false;
            if (index === optionItemList.length) bottomLine = false;
            _cmpt = createOptionCatagoryCmpt({optionItem}, topLine, bottomLine);
            break;
         default:
            throw new Error("Undefined 'optionItem.type' in selectOptionList cmpt creation.");
      }

      cmpt.hook("self").attach(_cmpt);
      index += 1;
   }

   return cmpt;

}

function createOptionCmpt({optionItem}) {
   if (optionItem.type !== "option") return;
   
   const cmpt = new UICmpt({
      name: "option",
      tagname: "div",
   });

   let downArrow = "";
   if (optionItem.haveNest) downArrow = "▼";

   cmpt.html = `
      <div class="${optionItem.id}">${optionItem.optionName}</div>
      <div class="optionNestingIndicator">${downArrow}</div>
   `;

   cmpt.css = `
      #----- {
         display: flex;
         align-items: center;
         gap: 1rem;
         width: 100%;
         margin-block: 0.3rem;
      }

      #----- .${optionItem.id} {
         color: var(--COLOR--light--dark);
         padding-block: 0.2rem;
         padding-inline: 0.5rem;
         border-radius: 0.4rem;
         width: 100%;
      }

      #----- .${optionItem.id}:hover {
         background-color: var(--COLOR--accent2);
         color: var(--COLOR--dark--dark);
      }

      #----- .${optionItem.id}:active{
         filter: brightness(150%);
      }

      #----- .optionNestingIndicator {
         width: 20px;
      }
   `;

   cmpt.addHook({
      name:"self",
      selector: "#-----",
      type: UICmpt.HOOKTYPE.GRAB,
   });


   // Setting callback
   if (!optionItem.callbackArgs) optionItem.callbackArgs = {};

   cmpt.bodyElmt.onclick = (event) => {
      if (optionItem.callback)
         optionItem.callback({event, ...optionItem.callbackArgs});
      if (optionItem.callbackOnce) cmpt.bodyElmt.onclick = null;
   };
   return cmpt;
}

function createOptionGroupCmpt({optionItem}, topLine=true, bottomLine=true) {
   if (optionItem.type !== "optionGroup") return;
   
   const cmpt = new UICmpt({
      name: "optionGroup",
      tagname: "div",
   });

   cmpt.addHook({
      name: "self",
      selector: "#-----",
      type: UICmpt.HOOKTYPE.CMPT_LIST,
   });

   if (topLine) cmpt.hook("self") .attach(createLineCmpt({}));
   
   for (let _optionItem of optionItem.value) {
      const _cmpt = createOptionCmpt({optionItem: _optionItem});
      if (_cmpt) cmpt.hook("self").attach(_cmpt);
   }
   
   if (bottomLine) cmpt.hook("self").attach(createLineCmpt({}));

   return cmpt;
}


function createOptionCatagoryCmpt({optionItem}, topLine=true, bottomLine=true) {
   if (optionItem.type !== "optionCatagory") return;
   
   const cmpt = new UICmpt({
      name: "optionCatagory",
      tagname: "div",
   });

   cmpt.addHook({
      name: "self",
      selector: "#-----",
      type: UICmpt.HOOKTYPE.CMPT_LIST,
   });

   if (topLine) cmpt.hook("self") .attach(createLineCmpt({}));
   
   if (optionItem.title) {
      cmpt.hook("self").attach(createOptionCatagoryTitleCmpt({
         title: optionItem.title
      }));
   } 

   for (let _optionItem of optionItem.value) {
      const _cmpt = createOptionCmpt({optionItem: _optionItem});
      _cmpt.css = `
         #----- {
            padding-left: 0.6rem;
         }
      `;
      if (_cmpt) cmpt.hook("self").attach(_cmpt);
   }
   
   if (bottomLine) cmpt.hook("self").attach(createLineCmpt({}));

   return cmpt;
}

function createOptionCatagoryTitleCmpt({title}) {
   const cmpt = new UICmpt({
      name: "optionCatagoryTitle",
      tagname: "div",
   });

   cmpt.html = `${title}`;
   
   cmpt.css = `
      #----- {
         text-transform: uppercase;
         width: 100%;
         padding-inline: 0.5rem;
         padding-top: 0.5rem;
         font-weight: 600;
         
      }
   `;

   return cmpt;
}

function createLineCmpt({}) {
   const cmpt = new UICmpt({
      name: "line",
      tagname: "div",
   });

   cmpt.css = `
      #----- {
         border-top: 1px solid #333;
         width: 100%;
         margin-block: 0.25rem;

      }
   `;

   return cmpt;
}
