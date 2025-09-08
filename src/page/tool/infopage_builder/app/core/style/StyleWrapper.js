export class StyleWrapper {
    constructor({styles}) {
        this.id = IdUtility.generateUniqueId();
        this.idLikeClassName = this._generateIdLikeClassName();
        this.bodyElmt = null;
        this.rootElmt = null;
        this.containedStyles = {};

        this.bodyElmt = this._createStyleWrapperElmt();
        this.rootElmt = this.bodyElmt;
        
        if (styles) {
            for (let style of styles) {
                this.addStyle({style: style});
            }
        }

    }


    addStyle ({style}) {
        this.containedStyles[style.id] = style;
        this.bodyElmt.appendChild(style.bodyElmt);
    }


    removeStyle ({style}) {
        delete this.containedStyles[style.id];
        this.bodyElmt.removeChild(style.bodyElmt);
    }


    _createStyleWrapperElmt () {
        const elmt = document.createElement("div");
        elmt.classList.add(this.idLikeClassName)
        return elmt;
    }


    _generateIdLikeClassName() {
        return "--stylewrapper--" + this.id;
    }
}




class IdUtility {
    static counter = 0;
    static generateUniqueId () {
        this.counter += 1;
        return this.counter;
    }
}