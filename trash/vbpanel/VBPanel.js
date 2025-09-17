export class VBPanel {
   constructor({viewbox}) {
      this.viewbox = viewbox;
      this.View = new View({vbpanel: this});
   }

   boot() {}

   

   assertViewboxBootStatus() {
      if (!this.viewbox) {
         new Error ("Viewbox is not boot and someone tries to intract with viewbox.");
      }
   }
}