export class WithoutPage {
   constructor({vbpanel}) {
      this.vbpanel = vbpanel; //VBPanel
   }

   mtd__makeCmptDataHookIntractive({cmptDataHook}) {
      this.vbpanel.assertViewboxBootStatus();
      console.log("vbpanel");
   }
}