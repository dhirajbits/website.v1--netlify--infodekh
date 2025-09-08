export class TmptNotFoundError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "TmptNotFoundError";
   }
}