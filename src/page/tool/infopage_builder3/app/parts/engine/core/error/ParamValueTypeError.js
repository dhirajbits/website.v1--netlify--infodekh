export class ParamValueTypeError extends Error {
   constructor(msg) {
      super(msg);
      this.name = "ParamValueTypeError";
   }
}