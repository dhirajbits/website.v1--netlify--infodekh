export class FeatureImplementableInFutureError extends Error {
   constructor (msg) {
      if (!msg) msg = "This feature will implement in future.";
      super(msg);
      this.name = "FeatureImplementableInFutureError";
   }
}