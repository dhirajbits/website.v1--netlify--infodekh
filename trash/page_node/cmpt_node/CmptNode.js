import { AttachingPoint } from "../attachment_node/attaching_point/AttachingPoint.js";
import { NodeAttacherLocation } from "../attachment_node/location/NodeAttacherLocation.js";
import { NodeAttachingPointLocation } from "../attachment_node/location/NodeAttachingPointLocation.js";
import { CmptHookNode } from "../cmpt_hook_node/CmptHookNode.js";

export class CmptNode {
   constructor({seed_cmptRaw}) {
      // DATA-PROPERTIES
      this.isActivated = false //Boolean
      this.id = null //Number
      this.refId = "" //String
      this.idLikeClassName = "" //String

      // RELATIONAL-PROPERTIES
      this.seed_cmptRaw = seed_cmptRaw; //PageRaw:CmptRaw
      this.tmpt = null //Tmpt
      this.style = null //CmptRawStyle
      this.styleConfig = null //CmptRawStyleConfig
      this.attachingPoint = null //PageNode:AttachingPoint
      this.hookNameToHookNode = {}; //Object{String:CmptHookNode}

      // ASSIGNING PROPERTIES
      this.id = this.seed_cmptRaw.id;
      this.refId = this.seed_cmptRaw.refId
      this.idLikeClassName = this.seed_cmptRaw.idLikeClassName;

      this.tmpt = this.seed_cmptRaw.tmpt;
      this.style = this.seed_cmptRaw.style;
      this.styleConfig = this.seed_cmptRaw.styleConfig;
      this.attachingPoint = this._createAttachingPoint({
         seed_attachingPoint: this.seed_cmptRaw.attachingPoint
      });
      
      this.hookNameToHookNode = this._createHookNameToHookNode({
         seed_hookNameToHookRaw: this.seed_cmptRaw.hookNameToHookRaw,
      });
   }

   activate ({getCmptNodeByCmptRawRefId}) {
      if (this.isActivated) return;
      this.attachingPoint.activate({
         getCmptNodeByCmptRawRefId: getCmptNodeByCmptRawRefId
      });
      for (let hookName in this.hookNameToHookNode) {
         const hookNode = this.hookNameToHookNode[hookName];
         hookNode.activate({
            getCmptNodeByCmptRawRefId: getCmptNodeByCmptRawRefId
         });
      }
      this.isActivated = true;
   }

   _createAttachingPoint({seed_attachingPoint}) {
      const apLocation = new NodeAttachingPointLocation({
         seed_attachingPointLocationRaw: seed_attachingPoint.location
      });

      return new AttachingPoint({
         seed_attachingPoint: seed_attachingPoint,
         nodeAttachingPointLocation: apLocation,
      });
   }

   _createHookNameToHookNode({seed_hookNameToHookRaw}) {
      const hookNameToHookNode = {};
      for (const hookName in seed_hookNameToHookRaw) {
         const seed_cmptHookRaw = seed_hookNameToHookRaw[hookName];
         const cmptHookNode = new CmptHookNode({
            seed_cmptHookRaw: seed_cmptHookRaw,
            cmptNode: this,
         });
         hookNameToHookNode[hookName] = cmptHookNode;
      }
      return hookNameToHookNode;
   }
}