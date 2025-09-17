import { VBRadioStation } from "../../../vb_radio_station/VBRadioStation.js";

export function addVBEventListener({withoutPageView}) {

   VBRadioStation.createAndAddVBEventListener({
      eventName: "newCmptAddedOnPage",
      viewName: "WithoutPage",
      callback: (vbEvent, callbackArgDict) => {
         const cmptDoc = vbEvent.data.cmpt;
         withoutPageView.panel.Page.mtd__savePageToLocalStorage();
         
         for (let [hookName, hook] of Object.entries(cmptDoc.hookNameToHookDoc)) {
            
            if (hook.type === "data") {
               withoutPageView.makeIntractiveCmptDataHook({
                  cmptDataHook: hook
               });
            }
         }
      }
   });
}