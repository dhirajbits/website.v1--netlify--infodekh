export class VBEventListener {
   constructor({eventName, viewName, callback, callbackArgDict}) {
      this.eventName = eventName; //string
      this.viewName = viewName; //string
      this.callback = callback; //function
      this.callbackArgDict = {...callbackArgDict}; //object
   }
}