export class AttacherAttachingError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "AttacherAttachingError";
   }
}