export class CmptAttacher {
   constructor ({cmpt}) {
      this.cmpt = cmpt;
      this.isAttached = false // Boolean
      this.attachedAtCmpt = null // Cmpt
      this.attachedAtHook = null // CmptHook
      this.attachedAtIndex = null // Number
   }
}