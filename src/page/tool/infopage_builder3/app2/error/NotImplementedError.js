export class NotImplementedError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "NotImplementedError";
   }
}