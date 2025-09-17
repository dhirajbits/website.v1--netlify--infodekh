import { createSelectOptionListCmpt as oldCreateSelectOptionList} from "./select_option_list.js";

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


export function createSelectOptionListCmpt ({ cmptName, optionItemList, left, right, top, buttom, coverBg, callbackOnSOLClosing, callbackArgDict}) {
   const cmpt = oldCreateSelectOptionList({ cmptName, optionItemList });
   const coverElmt = document.createElement("div");

   if (left) cmpt.bodyElmt.style.left = left;
   if (right) cmpt.bodyElmt.style.right = right;
   if (top) cmpt.bodyElmt.style.top = top;
   if (buttom) cmpt.bodyElmt.style.buttom = buttom;
   
   coverElmt.style.position = "fixed";
   coverElmt.style.width = "100%";
   coverElmt.style.height = "100vh";
   coverElmt.style.left = "0";
   coverElmt.style.top = "0";
   if (coverBg) coverElmt.style.backgroundColor = coverBg;
   else coverElmt.style.backgroundColor = "#76767600";


   cmpt.putInsideElmtWithStyle({elmt: coverElmt});
   document.body.appendChild(coverElmt);

   coverElmt.onclick = (event) => {
      try {document.body.removeChild(coverElmt);} catch (e) {};
      if (callbackOnSOLClosing) callbackOnSOLClosing({event, ...callbackArgDict});
      event.stopPropagation();
   }
   
   return [coverElmt, cmpt];
}

