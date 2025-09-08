export class CmptNotActivatedError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "CmptNotActivatedError";
   }
}