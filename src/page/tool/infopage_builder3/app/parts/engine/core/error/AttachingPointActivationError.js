export class AttachingPointActivationError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "AttachingPointActivationError";
   }
}