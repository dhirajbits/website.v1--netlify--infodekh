export class CmptHookNodeAttacherCreationError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "CmptHookNodeAttacherCreationError";
   }
}