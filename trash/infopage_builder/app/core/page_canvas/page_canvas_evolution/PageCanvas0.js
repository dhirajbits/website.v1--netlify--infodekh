export class PageCanvas0 {
    constructor () {
        this.bodyElmt = document.createElement("div")
        this.bodyElmt.classList.add("--pagecanvas--");
    }

    fitInsideElmt ({elmt}) {
        this.fitInsideElmtAtBelow({elmt});
    }

    fitInsideElmtAtBelow ({elmt}) {
        elmt.appendChild(this.bodyElmt);
    }

    fitInsideElmtAtAbove ({elmt}) {
        elmt.prepend(this.bodyElmt);
    }

    fillInsideElmt ({elmt}) {
        elmt.innerHTML = "";
        this.fitInsideElmt({elmt});
    }
}