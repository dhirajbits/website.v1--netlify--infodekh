export class IdUtility {
    static counter = 0;

    static getUniqueIdWithinUI () {
        this.counter += 1;
        return this.counter;
    }
}