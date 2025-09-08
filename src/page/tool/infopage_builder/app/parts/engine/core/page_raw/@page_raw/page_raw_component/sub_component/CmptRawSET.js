export class CmptRawSET {
   constructor () {
      this.cmptRawRefIdToCmptRaw = {};
   }

   addCmptRaw({cmptRaw}) {
      this.cmptRawRefIdToCmptRaw[cmptRaw.refId] = cmptRaw;
      return cmptRaw;
   }

   removeCmptRaw({cmptRaw}) {
      if (cmptRaw.refId in this.cmptRawRefIdToCmptRaw) {
         delete this.cmptRawRefIdToCmptRaw[cmptRaw.refId];
      }
   }

   getCmptRawByRefId({cmptRawRefId}) {
      return this.cmptRawRefIdToCmptRaw[cmptRawRefId];
   }

   getAllCmptRawsInRefIdToCmptRawFormat() {
      return this.cmptRawRefIdToCmptRaw;
   }
}