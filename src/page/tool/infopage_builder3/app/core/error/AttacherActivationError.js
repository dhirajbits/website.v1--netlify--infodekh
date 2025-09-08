export class AttacherActivationError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "AttacherActivationError";
   }
}