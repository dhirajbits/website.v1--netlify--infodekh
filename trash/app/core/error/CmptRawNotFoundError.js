export class CmptRawNotFoundError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "CmptRawNotFoundError";
   }
}