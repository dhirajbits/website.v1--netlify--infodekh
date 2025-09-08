export class CmptNodeSET {
   constructor () {
      this.cmptNodeRefIdToCmptNode = {};
   }

   addCmptNode({cmptNode}) {
      this.cmptNodeRefIdToCmptNode[cmptNode.refId] = cmptNode;
   }

   removeCmptNode({cmptNode}) {
      if (cmptNode.refId in this.cmptNodeRefIdToCmptNode) {
         delete this.cmptNodeRefIdToCmptNode[cmptNode.refId];
      }
   }

   getCmptNodeByRefId({cmptNodeRefId}) {
      return this.cmptNodeRefIdToCmptNode[cmptNodeRefId];
   }

   getAllCmptNodesInRefIdToCmptNodeFormat() {
      return this.cmptNodeRefIdToCmptNode;
   }
}