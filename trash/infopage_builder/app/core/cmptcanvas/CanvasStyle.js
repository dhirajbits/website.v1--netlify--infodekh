export class CanvasStyle {
    constructor () {
        this.cmptRefIds = null;
        this.tmptRefIds = null;

        this.bodyElmt = null;
        this._tmptStyleWrapperElmt = null;
        this._cmptStyleWrapperElmt = null;
        this._cmptStyleConfigWrapperElmt = null;

        this.reset();
    }

    fitInsideElmt ({elmt}) {
        elmt.appendChild(this.bodyElmt);
    }

    fillInsideElmt ({elmt}) {
        elmt.innerHTML = "";
        this.fitInsideElmt({elmt: elmt});
    }

    reset () {
        this.cmptRefIds = [];
        this.tmptRefIds = [];
        this.bodyElmt = this._createBodyElmt();

        this._tmptStyleWrapperElmt = this._createTmptStyleWrapperElmt();
        this._cmptStyleWrapperElmt = this._createCmptStyleWrapperElmt();
        this._cmptStyleConfigWrapperElmt = this._createCmptStyleConfigWrapperElmt();

        this.bodyElmt.appendChild(this._tmptStyleWrapperElmt);
        this.bodyElmt.appendChild(this._cmptStyleWrapperElmt);
        this.bodyElmt.appendChild(this._cmptStyleConfigWrapperElmt);
    }

    addCmpt ({cmpt}) {
        if (this.cmptRefIds.includes(cmpt.refId)) {return}
        else {this.cmptRefIds.push(cmpt.refId)}

        this._addCmptStyle ({cmpt: cmpt});
        this._addCmptStyleConfig ({cmpt: cmpt});
        
        if (!this.tmptRefIds.includes(cmpt.tmpt.refId)){
            this.tmptRefIds.push(cmpt.tmpt.refId);
            this._addTmptStyle({tmpt: cmpt.tmpt});
        }
    }

    removeCmpt ({cmpt}) {
        if (!this.cmptRefIds.includes(cmpt.refId)) {return}
        else {
            for (let i=0; i < this.cmptRefIds.length; i++) {
                if (this.cmptRefIds[i] === cmpt.refId) {
                    this.cmptRefIds[i] = null;
                    break;
                }
            }
        }
        this._removeCmptStyle({cmpt: cmpt});
        this._removeCmptStyleConfig({cmpt: cmpt});

    }

    _addTmptStyle ({tmpt}) {
        this._tmptStyleWrapperElmt.appendChild(tmpt.style.bodyElmt);
    }

    _addCmptStyle ({cmpt}) {
        const elmt = document.createElement("div");
        elmt.classList.add("--cmptcanvas--");
        elmt.classList.add(`--cmptcanvas--cmptstyle${cmpt.refId}--`);
        
        elmt.appendChild(cmpt.style.bodyElmt);

        for (let hookName in cmpt.hooks) {
            const hook = cmpt.hooks[hookName];
            elmt.appendChild(hook.style.bodyElmt);
        }

        this._cmptStyleWrapperElmt.appendChild(elmt);
        return elmt;
    }

    _addCmptStyleConfig ({cmpt}) {
        const elmt = document.createElement("div");
        elmt.classList.add("--cmptcanvas--");
        elmt.classList.add(`--cmptcanvas--cmptstyleconfig${cmpt.refId}--`);
        
        elmt.appendChild(cmpt.styleConfig.bodyElmt);

        for (let hookName in cmpt.hooks) {
            const hook = cmpt.hooks[hookName];
            // elmt.appendChild(hook.styleConfig.bodyElmt);
        }

        this._cmptStyleConfigWrapperElmt.appendChild(elmt);
        return elmt;
    }

    _removeCmptStyle ({cmpt}) {
        const cmptStyleElmt = this._cmptStyleWrapperElmt.querySelector(
            `--cmptcanvas--cmptstyle${cmpt.refId}--`
        );
        this._cmptStyleWrapperElmt.removeChild(cmptStyleElmt);
    }

    _removeCmptStyleConfig ({cmpt}) {
        const cmptStyleConfigElmt = this._cmptStyleConfigWrapperElmt.querySelector(
            `--cmptcanvas--cmptstyleconfig${cmpt.refId}--`
        );
        this._cmptStyleConfigWrapperElmt.removeChild(cmptStyleConfigElmt);
    }

    _createBodyElmt () {
        const elmt = document.createElement("div");
        elmt.classList.add("--cmptcanvas--");
        elmt.classList.add("--cmptcanvas--canvasstyle--");
        return elmt;
    }

    _createTmptStyleWrapperElmt () {
        const elmt = document.createElement("div");
        elmt.classList.add("--cmptcanvas--");
        elmt.classList.add("--cmptcanvas--canvasstyle--tmptstyle--");
        return elmt;
    }

    _createCmptStyleWrapperElmt () {
        const elmt = document.createElement("div");
        elmt.classList.add("--cmptcanvas--");
        elmt.classList.add("--cmptcanvas--canvasstyle--cmptstyle--");
        return elmt;
    }

    _createCmptStyleConfigWrapperElmt () {
        const elmt = document.createElement("div");
        elmt.classList.add("--cmptcanvas--");
        elmt.classList.add("--cmptcanvas--canvasstyle--cmptstyleconfig--");
        return elmt;
    }
}