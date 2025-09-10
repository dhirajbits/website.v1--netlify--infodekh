export class CmptPosition {
   constructor({pageCanvas}) {
      this.pageCanvas = pageCanvas; //PageCanvas
   }

   moveCmptToNewParent({cmpt, parentCmpt, hookName, parentCmptHook}) {
      try {
         if (!parentCmptHook) parentCmptHook = parentCmpt.hookNameToHookDoc[hookName];
      } catch {}

      if (!parentCmptHook) throw new Error("Can't move 'cmpt' --> given 'parentCmptHook' not found.");

      parentCmptHook.onCanvas.removeEmptyHookPlaceholderElmt();
      parentCmptHook.attacher.attach(cmpt.attachingPoint);
      parentCmptHook.onCanvas.addEmptyHookPlaceholderElmt();
      // console.log(parentCmptHook.attacher);
   }
}