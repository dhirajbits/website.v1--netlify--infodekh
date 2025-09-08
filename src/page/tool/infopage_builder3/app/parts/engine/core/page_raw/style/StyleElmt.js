export class StyleElmt {
    constructor ({innerHtml}) {
        this.id = IdUtility.generateUniqueId();
        this.idLikeClassName = this._generateIdLikeClassName();
        this.bodyElmt = null;
        this.rootElmt = null;
        this.bodyElmt = this._createStyleElmt()

        this.bodyElmt.innerHTML = innerHtml
        this.rootElmt = this.bodyElmt;
    }


    _createStyleElmt () {
        const elmt = document.createElement("style");
        elmt.classList.add(this.idLikeClassName);
        return elmt;
    }


    _generateIdLikeClassName () {
        return "--style--" + this.id;
    }
}


class IdUtility {
    static counter = 0;
    static generateUniqueId () {
        this.counter += 1;
        return "styleId" + this.counter;
    }
}