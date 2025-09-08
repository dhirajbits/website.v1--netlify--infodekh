export class CanvasHtmlElmt {
    constructor () {
        this.bodyElmt = null;
        this.cmptRefIds = null;
        this.reset();
    }

    fitInsideElmt ({elmt}) {
        elmt.appendChild(this.bodyElmt);
    }

    fillInsideElmt ({elmt}) {
        this.bodyElmt.innerHTML = "";
        this.fitInsideElmt({elmt: elmt});
    }

    reset () {
        this.bodyElmt = document.createElement("div");
        this.bodyElmt.classList.add("--cmptcanvas--");
        this.bodyElmt.classList.add("--cmptcanvas--htmlelmt--");
        this.cmptRefIds = []
    }

    addCmpt ({cmpt}) {
        if (this.cmptRefIds.includes(cmpt.refId)) { return}
        
        this.cmptRefIds.push(cmpt.refId);
        this.bodyElmt.appendChild(cmpt.bodyElmt);
    }

    removeCmpt ({cmpt}) {
        if (!this.cmptRefIds.includes(cmpt.refId)) {return}

        for (let i=0; i < this.cmptRefIds.length; i++) {
            if (this.cmptRefIds[i] === cmpt.refId) {
                this.cmptRefIds[i] = null;
                break;
            }
        }

        this.bodyElmt.removeChild(cmpt.bodyElmt);
    }
}