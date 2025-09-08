export class CmptNodeSET {
   constructor () {
      this.refIdToCmptNode = {}; // Object //
   }

   isCmptNodeExistsInSET ({cmptNode}) {
      return (cmptNode.refId in this.refIdToCmptNode);
   }

   addCmptNode ({cmptNode}) {
      this.refIdToCmptNode[cmptNode.refId] = cmptNode;
      return false;
   }

   removeCmptNode ({cmptNode}) {
      try {
         delete this.refIdToCmptNode[cmptNode.refId]
      } catch {}
      return false;
   }
}