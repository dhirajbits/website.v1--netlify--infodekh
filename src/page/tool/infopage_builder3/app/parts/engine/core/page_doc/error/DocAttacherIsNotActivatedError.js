export class DocAttacherIsNotActivatedError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "DocAttacherIsNotActivatedError";
   }
}