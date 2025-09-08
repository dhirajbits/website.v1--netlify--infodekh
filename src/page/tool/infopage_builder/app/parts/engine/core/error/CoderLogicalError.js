export class CoderLogicalError extends Error{
   constructor (msg) {
      super(msg);
      this.name = "CoderLogicalError";
   }
}