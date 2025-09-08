import { FeatureImplementableInFutureError } from "../../page_raw/error/FeatureImplementableInFutureError.js";
import { CmptNode } from "../cmpt_node/CmptNode.js";
import { CmptNodeBUSH } from "./page_node_component/CmptNodeBUSH.js";

export class PageNode {
   constructor({seed_pageRaw}) {

      // RELATIONAL PROPERTIES
      this.seed_pageRaw = seed_pageRaw; //PageRaw
      this.generalInfo = null; //PageRaw:PageGeneralInfo
      this.meta = null; //PageRaw:PageMeta
      this.tmptHub = null; //TmptHub
      this.tmptSET = null; //PageRaw:TmptSET
      this.cmptNodeBUSH = null; //CmptNodeBUSH


      // ASSIGNING PROPERTIES
      this.generalInfo = this.seed_pageRaw.generalInfo;
      this.meta = this.seed_pageRaw.meta;
      this.tmptHub = this.seed_pageRaw.tmptHub;
      this.tmptSET = this.seed_pageRaw.tmptSET;
      this.cmptNodeBUSH = new CmptNodeBUSH();

      this._loadCmptNodeBUSH({
         seed_cmptRawBUSH: this.seed_pageRaw.cmptRawBUSH,
      });

      this.activate();
   }

   get isActivated() {
      return this.cmptNodeBUSH.isActivated;
   }

   activate() {
      if (this.isActivated) return;
      this.cmptNodeBUSH.activate();
   }

   createAndAddCmptNode ({tmptRefId}) {
      throw new FeatureImplementableInFutureError();
   }

   createAndAddCmptNodeFromCmptRaw ({cmptRaw}, activate=true) {
      const cmptNode = this.createCmptNodeFromCmptRaw({
         cmptRaw: cmptRaw,
      });
      return this.addCmptNode({
         cmptNode: cmptNode,
      }, activate);
   }

   createCmptNode({tmptRefId}) {
      throw new FeatureImplementableInFutureError();
   }

   createCmptNodeFromCmptRaw ({cmptRaw}) {
      const cmptNode = new CmptNode({
         seed_cmptRaw: cmptRaw
      });
      return cmptNode;
   }

   addCmptNode ({cmptNode}, activate=true) {
      this.seed_pageRaw.cmptRawBUSH.addCmptRaw({
         cmptRaw: cmptNode.seed_cmptRaw
      });

      return this._addCmptNodeToCmptBUSH({
         cmptNode: cmptNode
      }, activate);
   }

   _addCmptNodeToCmptBUSH ({cmptNode}, activate=true) {
      this.cmptNodeBUSH.addCmptNode({
         cmptNode: cmptNode
      });

      if (activate) cmptNode.activate({
         getCmptNodeByCmptRawRefId: this.cmptNodeBUSH.getCmptNodeByCmptRawRefId,
      });
   }

   _loadCmptNodeBUSH({seed_cmptRawBUSH}) {
      const cmptRawRefIdToCmptRaw = seed_cmptRawBUSH.getAllCmptRawsInRefIdToCmptRawFormat();

      for (let cmptRawRefId in cmptRawRefIdToCmptRaw) {
         this.createAndAddCmptNodeFromCmptRaw({
            cmptRaw: cmptRawRefIdToCmptRaw[cmptRawRefId]
         }, false);
      }
   }
}