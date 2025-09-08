import { CmptHook } from "./CmptHook.js"


export class CHook extends CmptHook{
    constructor ({name, elmt}) {
        super ({
            name: name,
            elmt: elmt,
            type: "cmpt"
        });

    }

    attachTo ({cmpt}) {
        cmpt.fillInsideElmt({elmt: this.bodyElmt});
        this.attached = true;
    }

    detachHook () {
        this.attached = false;
        this.bodyElmt.innerHTML = "";
    }
}