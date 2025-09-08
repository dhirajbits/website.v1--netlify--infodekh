import { AppCaches } from "./models/AppCaches.js";
import { AppConfig } from "./models/AppConfig.js";
import { AppData } from "./models/AppData.js";


export class Model {
   constructor () {
      if (Model._instance) return Model._instance;
      else Model._instance = this;

      this.AppCaches = new AppCaches();
      this.AppConfig = new AppConfig();
      this.AppData = new AppData();
   }

   boot() {
      
   }
}