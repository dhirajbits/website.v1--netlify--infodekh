export class ErrorInSeedError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "ErrorInSeedError";
   }
}