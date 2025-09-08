export class AttacherDetachingError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "AttacherDetachingError";
   }
}