export class StyleWrapper {
    static counter = 0;
    constructor ({name}) {
        this.name = name;
        this.bodyElmt = document.createElement("div");
        this.rootElmt = this.bodyElmt;
        this.styleObjs = {}

        this.bodyElmt.id = this._createStyleWrapperId()
    }


    addStyleObj ({styleObj}) {
        this.styleObjs[styleObj.id] = styleObj;
        this.bodyElmt.appendChild(styleObj.bodyElmt);
    }


    removeStyleObj ({styleObj}) {
        delete this.styleObjs[styleObj.id];
        this.bodyElmt.removeChild(styleObj.bodyElmt);
    }


    addUniqueStyleObj ({styleObj}) {
        if (!this.styleObjs[styleObj.id]) {
            this.addStyleObj({styleObj: styleObj});
        }
    }


    _createStyleWrapperId () {
        this.counter += 1;
        return "--stylewrapper--" + this.counter;
    }
}