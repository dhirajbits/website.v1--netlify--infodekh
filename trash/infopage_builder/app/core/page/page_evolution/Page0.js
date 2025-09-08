
export class Page0 {
    constructor ({id, refId}) {
        this.id = id || this._generateId();
        this.refId = refId || this._generateRefId()
    }

    toGeneDict () {
        return {
            id: this.id,
            refId: this.refId
        };
    }

    _generateId () {
        return IdUtility.getUniqueId();
    }

    _generateRefId () {
        return `--page--RefId${this.id}--`;
    }
}



class IdUtility {
    static counter = 0;

    static getUniqueId () {
        this.counter += 1;
        return `${Date.now()}${this.counter}`;
    }
}