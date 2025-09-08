export class CmptHook {
    constructor ({name, elmt, type}) {
        this.name = name;
        this.bodyElmt = elmt;
        this.type = type;
        this.attached = false;
    }
}