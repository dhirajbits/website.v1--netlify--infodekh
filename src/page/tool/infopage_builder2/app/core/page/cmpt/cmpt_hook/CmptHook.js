import { HookStyle as CmptHookStyle } from "../../style/HookStyle.js";




export class CmptHook {
   constructor ({tmptHook, base}) {
      // DEFINING PROPERTIES
      this.id = null; // Number
      this.refId = null; // String
      this.idLikeClassName = null; // String
      this.name = null; // String
      this.style = null; // CmptStyle
      this.styleConfig = null; // CmptStyleConfig
      this.attacher = null; // FemaleAttacher
      this.base = null; // Cmpt


      // ASSIGNING PROPERTIES
      this.id = IdUtility.getUniqueId();

      this.refId = this._generateRefId({id: this.id});

      this.idLikeClassName = this._generateIdLikeClassName({id: this.id});

      this.name = tmptHook.name
      this.style = this._createCmptHookStyleObj();
      this.styleConfig = this._createCmptHookStyleConfigObj();
      this.attacher = this._createMaleAttacher();
      this.base = base;
   }

   _generateRefId ({id}) {
      return `cmptRefId${id}`;
   }

   _generateIdLikeClassName ({refId}) {
      return `cmptIdLikeClassName${refId}`;
   }

   _createCmptHookStyleObj () {
      return new CmptHookStyle();
   }

   _createCmptHookStyleConfigObj () {
      return new CmptStyleConfig();
   }

   _createMaleAttacher () {
      return new MaleAttacher();
   }
}





class IdUtility {
   static counter = 0;

   getUniqueId () {
      this.counter += 1;
      return Number(`${Date.now()}${this.counter}`);
   }
}