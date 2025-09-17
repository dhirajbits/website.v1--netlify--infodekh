export class CmptDocSET {
   constructor() {
      this.refIdToCmptDoc = {}; //Object[String:CmptDoc]
   }

   isExists({cmptDoc}) {
      return Boolean(this.refIdToCmptDoc[cmptDoc.refId]);
   }

   addCmptDoc({cmptDoc}) {
      this.refIdToCmptDoc[cmptDoc.refId] = cmptDoc;
   }

   removeCmptDoc({cmptDoc}) {
      if (!(cmptDoc.refId in this.refIdToCmptDoc)) return;
      delete this.refIdToCmptDoc[cmptDoc.refId];
   }

   getCmptDocByRefId({cmptDocRefId}) {
      return this.refIdToCmptDoc[cmptDocRefId];
   }

   removeCmptDocByRefId({cmptDocRefId}) {
      const cmptDoc = this.refIdToCmptDoc[cmptDocRefId];
      if (cmptDoc) this.removeCmptDoc({cmptDoc: cmptDoc})
   }

   getAllCmptDocInRefIdToCmptDocFormat() {
      return {...this.refIdToCmptDoc};
   }
}