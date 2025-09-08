export class DocAttachingPointIsNotActivatedError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "DocAttachingPointIsNotActivatedError";
   }
}