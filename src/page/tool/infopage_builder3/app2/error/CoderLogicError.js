export class CoderLogicError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "CodeLogicError";
   }
}