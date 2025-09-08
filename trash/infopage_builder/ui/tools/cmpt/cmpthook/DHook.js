import { CmptHook } from "./CmptHook.js"


export class DHook extends CmptHook{
    constructor ({name, elmt}) {
        super ({
            name: name,
            elmt: elmt,
            type: "data"
        });

    }

    set value (text) {
        if (this.bodyElmt) {
            this.bodyElmt.textContent = text;
            this.attached = true;
        }
    }
}