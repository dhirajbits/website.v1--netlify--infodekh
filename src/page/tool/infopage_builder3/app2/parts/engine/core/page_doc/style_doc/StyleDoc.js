export class StyleDoc {
   constructor({seed_styleRaw}) {
      this.seed_styleRaw = seed_styleRaw; //StyleRaw
      this.bodyElmt = document.createElement("style");

      this.bodyElmt.classList.add("--cmptHookStyle--");
   }

   get_bodyElmt() {
      return this.bodyElmt;
   }

   addDecleration({decleration}, update=false) {
      this.seed_styleRaw.addDecleration({
         decleration: decleration
      });
      if (update) this.update();
   }

   removeDecleration({cssProperty}, update=false) {
      this.seed_styleRaw.removeDecleration({
         cssProperty: cssProperty
      });
      if (update) this.update();
   }

   addTempDecleration({decleration}, update=false) {
      this.seed_styleRaw.addTempDecleration({
         decleration: decleration
      });
      if (update) this.update();
   }

   removeTmptDecleration({cssProperty}, update=false) {
      this.seed_styleRaw.removeTmptDecleration({
         declerationToRemove: cssProperty
      });
      if (update) this.update();
   }

   clearDecleration(update=true) {
      this.seed_styleRaw.clearDecleration();
      if (update) this.update()
   }

   clearTempDecleration(update=true) {
      this.seed_styleRaw.clearTempDecleration();
      if (update) this.update();
   }

   update() {
      this.bodyElmt.innerHTML = this.generateCSS();
   }

   generateCSS(includeTemp=true) {
      const totalCssDecleration = {...this.seed_styleRaw.declerations};
      
      if (includeTemp) totalCssDecleration = {
         ...this.seed_styleRaw.declerations,
         ...this.seed_styleRaw.tempDeclerations
      }

      const declerationBlockString = CSSGenerationUtility.declerationDictToString({
         declerationDict: totalCssDecleration,
      });

      const cssCode = `${this.seed_styleRaw.cssSelector} {${declerationBlockString}}`;
      return cssCode;
   }
}


class CSSGenerationUtility {
   static declerationDictToString({declerationDict}) {
      let declerationBlockString = "";
      for (let [property, value] of Object.entries(declerationDict)) {
         declerationBlockString += `${property} : ${value};`;
      }
      return declerationBlockString.trim();
   }
}