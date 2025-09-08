import { IdUtility } from "../../IdUtility.js";

export class Cmpt0 {
    constructor () {
        this.idLikeClassName = "UI--idLikeClassName" + IdUtility.getUniqueIdWithinUI();
        this.bodyElmt = null;
        this.styleElmt = null;
        this.wholeElmt = null;
    }
    
    
    set htmlCode (code) {
        const templateElmt = document.createElement("template");
        templateElmt.innerHTML = code;
        this.bodyElmt = templateElmt.content.firstElementChild;
        this._addDefaultClassToBodyElmt();
        this._updateBodyElmtInsideWholeElmt();
    }

    set styleCode (code) {
        code = this._preprocessStyleCode({styleCode: code});
        this.styleElmt = document.createElement("style");
        this.styleElmt.innerHTML = code;
        this._addDefaultClassToBodyElmt();
        this._updateStyleElmtInsideWholeElmt();
    }

    fitInsideElmt ({elmt}) {
        if (this.bodyElmt) {
            elmt.appendChild(this.wholeElmt);
        }
    }

    fillInsideElmt ({elmt}) {
        if (this.bodyElmt) {
            elmt.innerHTML = "";
            this.fitInsideElmt({elmt: elmt});
        }
    }

    _addDefaultClassToBodyElmt () {
        const defaultClasses = ["UI--cmpt", this.idLikeClassName]
        for (let className of defaultClasses) {
            if (!this.bodyElmt.classList.contains(className)) {
                this.bodyElmt.classList.add(className);
            }
        }
    }

    _addDefaultClassToStyleElmt () {
        const defaultClasses = ["UI--style"];
        for (let className of defaultClasses) {
            if (!this.styleElmt.classList.contains(className)) {
                this.styleElmt.classList.add(className);
            }
        }
    }

    _updateBodyElmtInsideWholeElmt () {        
        this.wholeElmt = document.createElement("div");
        if (this.bodyElmt) {
            this.wholeElmt.appendChild(this.bodyElmt);
        }
        
        if (this.styleElmt) {
            this.wholeElmt.appendChild(this.styleElmt);
        }
    }

    _updateStyleElmtInsideWholeElmt () {
        this._updateBodyElmtInsideWholeElmt();
    }

    _preprocessStyleCode ({styleCode}) {
        return styleCode.replaceAll("#-----", `.${this.idLikeClassName}`);
    }
}