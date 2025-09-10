import { RelationalUnitRefRegister } from "./components/RelationalUnitRefRegister.js";
import { FeatureCmptDoc } from "./feature/FeatureCmptDoc.js";
import { CmptDocBUSH } from "./components/CmptDocBUSH.js";
import { CmptDoc } from "../cmpt_doc/CmptDoc.js";

export class PageDoc {
   constructor({seed_pageRaw}) {
      this.seed_pageRaw = seed_pageRaw; //PageRaw
      this.generalInfo = null; //PageRaw:PageGeneralInfo
      this.meta = null; //PageRaw:PageMeta
      this.tmptHub = null; //TmptHub
      this.tmptSET = null; //TmptSET
      this.relationalUnitRefRegister = null; //RelationalUnitRefRegister
      this.cmptDocBUSH = null; //CmptDocBUSH

      // ASSIGNING FEATURE CLASSES
      this.CmptDoc = new FeatureCmptDoc({base: this});

      // ASSIGNING VARIABLE
      this.generalInfo = seed_pageRaw.generalInfo;
      this.meta = seed_pageRaw.meta;
      this.tmptHub = seed_pageRaw.tmptHub;
      this.tmptSET = seed_pageRaw.tmptSET;
      this.relationalUnitRefRegister = new RelationalUnitRefRegister();
      this.cmptDocBUSH = new CmptDocBUSH();


      // OTHER ACTIONS
      this._loadCmptDocsFromSeed();
      // console.log(this);
   }


   _loadCmptDocsFromSeed() {
      const refIdToCmptRaw = this.seed_pageRaw.cmptRawBUSH.getAllCmptRawsInRefIdToCmptRawFormat();

      const refIdToCmptDoc = {};
      for (let refId in refIdToCmptRaw) {
         const cmptDoc = new CmptDoc({
            seed_cmptRaw: refIdToCmptRaw[refId],
            relationalUnitRefRegister: this.relationalUnitRefRegister,
         });
         refIdToCmptDoc[cmptDoc.refId] = cmptDoc;
      }

      for (let [refId, cmptDoc] of Object.entries(refIdToCmptDoc)) {
         cmptDoc.updateHtmlDoc();
         this.cmptDocBUSH.addCmptDoc({cmptDoc: cmptDoc});
      };
   }
}