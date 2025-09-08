import { CmptHook } from "./CmptHook.js";


export class HHook extends CmptHook {
    constructor ({name, elmt}) {
        super({
            name: name,
            elmt: elmt,
            type: "html"
        });

    }

    set value (code) {
        this.bodyElmt.innerHTML = code;
        this.attached = false;
    }


}