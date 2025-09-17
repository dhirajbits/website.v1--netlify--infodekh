export class VBEvent {
   constructor({eventName, viewName, data}) {
      this.eventName = eventName;
      this.viewName = viewName;
      this.data = {...data};
   };
}