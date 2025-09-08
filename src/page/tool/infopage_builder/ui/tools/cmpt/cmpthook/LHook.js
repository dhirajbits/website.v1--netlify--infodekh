import { CmptHook } from "./CmptHook.js";


export class LHook extends CmptHook {
    constructor ({name, elmt}) {
        super ({
            name: name,
            elmt: elmt,
            type: "cmptlist"
        });

        this.attachments = []
    }

    appendAttachment ({cmpt, cmptList}) {
        const cmpts = [];
        if (cmpt) {cmpts.push(cmpt)}
        if (cmptList) {
            for (let cmpt of cmptList) {
                cmpts.push(cmpt)
            }
        }

        for (let cmpt of cmpts) {
            cmpt.fitInsideElmt({elmt: this.bodyElmt})
            this.attachments.push(cmpt)
        }

        this.attached = Boolean(this.attachments.length);
    }

    removeAttachment ({cmpt}) {
        const noOfAttachments = this.attachments.length;
        this.attachments = this.attachments.filter(item => item !== cmpt);
        if (noOfAttachments !== this.attachments.length) {
            this.bodyElmt.removeChild(cmpt.bodyElmt);
        }

        this.attached = Boolean(this.attachments.length);
    }

    clearAttachment () {
        this.attachments = [];
        this.bodyElmt.innerHTML = "";
        this.attached = false;
    }

}