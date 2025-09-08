export class StyleSet {
    constructor ({name}) {
        this.name = name || "";
        this.style = {}
    }

    add ({style}) {
        this.style[style.idLikeClassName] = style;
    }

    getByIdLikeClassName ({idLikeClassName}) {
        if (idLikeClassName) {
            return this.style[idLikeClassName]
        }
    }

    remove ({style}) {
        delete this.style[style.idLikeClassName];
    }

    removeByIdLikeClassName ({idLikeClassName}) {
        if (idLikeClassName) {
            delete this.style[idLikeClassName];
        }
    }

    fitInsideElmt ({elmt}) {
        for (let idLikeClassName in this.style) {
            elmt.appendChild(this.style[idLikeClassName].bodyElmt);
        }
    }

    fillInsideElmt ({elmt}) {
        elmt.innerHTML = "";
        this.fitInsideElmt({elmt: elmt});
    }
}