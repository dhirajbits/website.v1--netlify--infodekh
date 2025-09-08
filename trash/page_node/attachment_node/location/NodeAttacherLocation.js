export class NodeAttacherLocation {
   constructor ({seed_attacherLocationRaw}) {
      this.seed_attacherLocationRaw = seed_attacherLocationRaw; //AttacherLocationRaw(PageRaw)
      this.isActivated = false; //Boolean
      this.cmptNode = null //CmptNode
      this.cmptHookNode = null //CmptHookNode
   }

   activate({getCmptNodeByCmptRawRefId}) {
      if (this.isActivated) return false;
      this.cmptNode = getCmptNodeByCmptRawRefId({
         cmptRawRefId: this.seed_attacherLocationRaw.cmptRawRefId
      });
      
      const hookName = this.seed_attacherLocationRaw.hookName;
      this.cmptHookNode = this.cmptNode.hookNameToHookNode[hookName];
      this.isActivated = true;
   }
}