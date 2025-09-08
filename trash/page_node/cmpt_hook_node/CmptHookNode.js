import { CmptHookNodeAttacherCreationError } from "../../error/CmptHookNodeAttacherCreationError.js";
import { APAttacher } from "../attachment_node/attacher/APAttacher.js";
import { AttacherHub } from "../attachment_node/attacher/AttacherHub.js";
import { HtmlAttacher } from "../attachment_node/attacher/HtmlAttacher.js";
import { TextAttacher } from "../attachment_node/attacher/TextAttacher.js";
import { NodeAttacherLocation } from "../attachment_node/location/NodeAttacherLocation.js";


export class CmptHookNode {
   constructor ({seed_cmptHookRaw, cmptNode}) {
      // RELATIONAL-PROPERTIES
      this.seed_cmptHookRaw = seed_cmptHookRaw; //PageRaw:CmptHookRaw
      this.cmptNode = cmptNode; //PageNode:CmptNode
      this.tmptHook = seed_cmptHookRaw.tmptHook; //TmptHook
      this.style = seed_cmptHookRaw.style; //CmptHookStyle
      this.styleConfig = seed_cmptHookRaw.styleConfig; //CmptHookStyleConfig
      
      // DATA-PROPERTIES
      this.isActivated = false; //Boolean
      this.attacher = null; //PageNode:Attacher
      this.id = null; //Number
      this.refId = ""; //String
      this.idLikeClassName = ""; //String
      this.name = ""; //String
      this.type = ""; //String
      this.definedScopes = []; //Array

      // ASSIGNING PROPERTIES
      this.id = seed_cmptHookRaw.id;
      this.refId = seed_cmptHookRaw.refId;
      this.idLikeClassName = seed_cmptHookRaw.idLikeClassName;
      this.name = seed_cmptHookRaw.name;
      this.type = seed_cmptHookRaw.type;
      this.definedScopes = seed_cmptHookRaw.definedScopes;
      this.attacher = this._createAttacher({
         seed_cmptHookRaw: seed_cmptHookRaw
      });
   }

   activate ({getCmptNodeByCmptRawRefId}) {
      if (this.isActivated) return;
      this.attacher.activate({
         getCmptNodeByCmptRawRefId: getCmptNodeByCmptRawRefId
      });
      this.isActivated = true;
   }

   _createAttacher({seed_cmptHookRaw}) {
      const attacherLocation = new NodeAttacherLocation({
         seed_attacherLocationRaw: seed_cmptHookRaw.attacher.location
      });

      const attacher = createAttacherObjectOfType({
         type: seed_cmptHookRaw.attacher.attacherType,
         seed_attacher: seed_cmptHookRaw.attacher,
         nodeAttacherLocation: attacherLocation,
      });

      return attacher;
   }
}



function createAttacherObjectOfType({type, seed_attacher, nodeAttacherLocation}) {
   switch (type) {
      case "ap":
         return new APAttacher({
            seed_apAttacher: seed_attacher,
            nodeAttacherLocation: nodeAttacherLocation,
         });
         break;
      case "text":
         return new TextAttacher({
            seed_textAttacher: seed_attacher,
            nodeAttacherLocation: nodeAttacherLocation,
         });
         break;
      case "html":
         return new HtmlAttacher({
            seed_htmlAttacher: seed_attacher,
            nodeAttacherLocation: nodeAttacherLocation,
         });
         break;
      case "multiAP":
         return new APAttacher({
            seed_multiAPAttacher: seed_attacher,
            nodeAttacherLocation: nodeAttacherLocation,
         });
         break;
      default:
         const msg = `Unknown attacher type '${type}'.`
         throw new CmptHookNodeAttacherCreationError(msg);
   }
}