export class UNViewbox {
   static counter = 0;

   static generateHistoricalUniqueNumber() {
      this.counter += 1;
      return Number(`${Date.now()}${this.counter}`);
   }

   static generateUniqueNumber() {
      this.counter += 1;
      return this.counter;
   }
}