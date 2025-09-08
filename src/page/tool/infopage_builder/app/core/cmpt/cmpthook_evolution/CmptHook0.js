export class CmptHook0 {
    // constructor ({id:gene, idLikeClassName:gene, base:!gene})
    constructor ({id, idLikeClassName, base}) {
        this.id = id || IdUtility.getUniqueId();
        this.idLikeClassName = idLikeClassName || this._generateIdLikeClassName();
        this.base = base;
    }

    toGeneDict () {
        return {
            id: this.id,
            idLikeClassName: this.idLikeClassName 
        }
    }
    _generateIdLikeClassName () {
        return `--cmpthook--IdLikeClassName${this.id}--`;
    }
}


class IdUtility {
    static counter = 0;

    static getUniqueId () {
        this.counter += 1;
        return `${Date.now()}${this.counter}`;
    }
}