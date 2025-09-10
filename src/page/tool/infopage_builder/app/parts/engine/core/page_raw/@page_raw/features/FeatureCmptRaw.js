import { TmptNotFoundError } from "../../error/TmptNotFoundError.js";
import { CmptRaw } from "../../cmpt_raw/CmptRaw.js";


export class FeatureCmptRaw {
   constructor({base}) {
      this.base = base;
   }

   async zCreate({ tmptRefId }) {
      let tmpt = null;
      
      try {
         tmpt = await this.base.tmptSET.zGetTmptByRefId({
            tmptRefId: tmptRefId,
         });
      } catch {
         throw new TmptNotFoundError();
      }
      if (!tmpt) throw new TmptNotFoundError();

      return new CmptRaw({
         tmpt: tmpt,
         relationalUnitRefRegister: this.base.relationalUnitRefRegister,
      });
   }

   add({ cmptRaw }) {
      return this.base.cmptRawBUSH.addCmptRaw({ cmptRaw: cmptRaw });
   }

   async zCreateAndAdd({ tmptRefId }) {
      const cmptRaw = await this.zCreate({
         tmptRefId: tmptRefId,
      });

      return this.add({ cmptRaw: cmptRaw });
   }

   remove({ cmptRawRefId, cmptRaw }) {
      if (cmptRaw) {
         return this.base.cmptRawBUSH.removeCmptRaw({
            cmptRaw: cmptRaw
         });
      }

      else if (cmptRawRefId) {
         return this.base.cmptRawBUSH.removeCmptRawByRefId({
            cmptRawRefId: cmptRawRefId,
         });
      }
   }

   getByRefId({cmptRawRefId}) {
      return this.base.cmptRawBUSH.getCmptRawByRefId({
         cmptRawRefId: cmptRawRefId,
      });
   }

   getAllCmptRawsInRefIdToCmptRawFormat() {
      return this.base.cmptRawBUSH.getAllCmptRawsInRefIdToCmptRawFormat();
   }
}