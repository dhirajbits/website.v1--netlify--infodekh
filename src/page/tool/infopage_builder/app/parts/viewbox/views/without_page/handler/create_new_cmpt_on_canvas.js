import { create2dPanelCmpt } from "../../_common_cmpts/utility/2d_panel.js";

let _2dPanelCmpt = null;
let EHPEListenerCallback = null;

export async function zCreateNewCmptOnCanvas({view, panel, callback}) {
   EHPEListenerCallback = callback;

   const tmptGroupNameToTmptNames = {};

   const allTmptDetails = await panel.Tmpt.zMtd__getAllAvaiableTmptWithDetails();

   setDefaultGroupNameToUngroupedTmpts({allTmptDetails});
   const groupNameToTmptDetailsList = getGroupNameToTmptDetailsList({allTmptDetails});
   
   // Creating 2d Panel definition object
   const _2dPanelDefObj = []; 
   for (let groupName in groupNameToTmptDetailsList) {
      _2dPanelDefObj.push(createCatagoryOptionObj({
         groupName: groupName,
         tmptDetailsList: groupNameToTmptDetailsList[groupName],
         panel: panel
      }));
   }

   // Creating 2d Panel cmpt from defintion object
   _2dPanelCmpt = create2dPanelCmpt({
      _2dPanelDefArr: _2dPanelDefObj
   });
   
   // Attaching on view
   _2dPanelCmpt.putInsideElmtWithStyle({elmt: document.body});

   _2dPanelCmpt.bodyElmt.onclick = (event) => {
      event.stopPropagation();
   }

   document.body.onclick = remove2dPanel;

}

function remove2dPanel() {
   _2dPanelCmpt.pullFromElmtWithStyle({elmt: document.body});
   document.body.onclick = null;
   EHPEListenerCallback();
}

async function optionSelectionHndr({panel, tmptDetails}) {
   // console.log("panel: ", panel);
   // console.log("tmptDetails: ", tmptDetails);
   // console.log("tmptRefId: ", tmptDetails.refId);
   remove2dPanel();
	console.log(tmptDetails.refId)

   await panel.Page.zMtd__createAndAddCmptToPage({tmptRefId: tmptDetails.refId})
   // console.log(panel.Page.zMtd__createAndAddCmpt({tmptRefId: }));
}

function createCatagoryOptionObj({groupName, tmptDetailsList, panel}) {
   const options = [];
   for (let tmptDetails of tmptDetailsList) {
      options.push(createOptionObj({tmptDetails, panel}));
   }

   return {
      id: groupName,
      optionName: groupName,
      type: "catagoryOption",
      value: options,
   }
}

function createOptionObj({tmptDetails, panel}) {
   return {
      id: tmptDetails.refId,
      type: "option",
      optionName: tmptDetails.name,
      callback: async (event) => {
         await optionSelectionHndr({panel, tmptDetails});
         // event.stopPropagation();
      }
   }
}


function setDefaultGroupNameToUngroupedTmpts({allTmptDetails}) {
   for (let tmptRefId in allTmptDetails) {
      const tmptDetails = allTmptDetails[tmptRefId];
      if (tmptDetails.groupName === "") {
         tmptDetails.groupName = "main";
      }
   }
}

function getGroupNameToTmptDetailsList({allTmptDetails}) {
   const groupNameToTmptDetailsList = {};

   for (let tmptRefId in allTmptDetails) {
      const tmptDetails = allTmptDetails[tmptRefId];

      // Skipping plateform tmpt (it is use to make plateform for page, it should be only one on page and that is auto created by PageRaw constructor.)
      if (tmptDetails.name === "plateform") continue;

      if (tmptDetails.groupName in groupNameToTmptDetailsList) {
         groupNameToTmptDetailsList[tmptDetails.groupName].push(tmptDetails);
      }
      else {
         groupNameToTmptDetailsList[tmptDetails.groupName] = [tmptDetails];
      }
   }

   return groupNameToTmptDetailsList;

}

function getGroupNameToTmptNames({allTmptDetails}) {
   const groupNameToTmptNames = {};
   for (let tmptRefId in allTmptDetails) {
      const tmptDetails = allTmptDetails[tmptRefId];

      // Skipping plateform tmpt (it is use to make plateform for page, it should be only one on page and that is auto created by PageRaw constructor.)
      if (tmptDetails.name === "plateform") continue;

      if (tmptDetails.groupName in groupNameToTmptNames) {
         groupNameToTmptNames[tmptDetails.groupName].push(tmptDetails.name);
      }
      else {
         groupNameToTmptNames[tmptDetails.groupName] = [tmptDetails.name];
      }
   }

   return groupNameToTmptNames;
}