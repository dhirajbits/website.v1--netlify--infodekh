export class PageStyle {
    static counter = 0;
    constructor ({name}) {
        this.name = name;
        this.id = this._createPageSytleId();
        this.bodyElmt = document.createElement("div");
        this.rootElmt = this.bodyElmt;
        this.objs = {};
        this.parentElmt = null;

        this.bodyElmt.id = this._createPageSytleId();
    }


    add ({obj}) {
        this.objs[obj.id] = obj;
        this.bodyElmt.appendChild(obj.bodyElmt);
    }


    remove ({obj}) {
        delete this.objs[obj.id];
        this.bodyElmt.removeChild(obj.bodyElmt);
    }


    addUnique ({obj}) {
        if (!this.objs[obj.id]) {
            this.add({obj: obj});
        }
    }


    fitInsideElmt ({elmt}) {
        elmt.appendChild(this.bodyElmt);
        this.parentElmt = elmt;
    }

    
    fitAndCoverElmt ({elmt}) {
        elmt.innerHTML = "";
        this.fitInsideElmt({elmt: elmt});
    }


    _createPageSytleId () {
        this.couter += 1;
        return "--pagestyle--" + this.couter;
    }


}
