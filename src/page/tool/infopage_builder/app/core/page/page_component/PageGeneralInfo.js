export class PageGeneralInfo {
    constructor ({definitionDict}) {
        if (!definitionDict) {definitionDict = {}}
        this._pageName = "Untitled";
        this._createdAt = null;
        this._lastUpdated = null;

        this.pageName = definitionDict.pageName || "Untitled";
        this.createdAt = definitionDict.createdAt || Date.now();
        this.lastUpdated = definitionDict.lastUpdated || Date.now();
    }

    get pageName () {return this._pageName;}
    get createdAt () {return this._createdAt;}
    get lastUpdated () {return this._lastUpdated;}


    set pageName (name) {
        name = String(name) || "Untitled";
        this._pageName = name;
    }

    set createdAt (timestamp) {
        this._createdAt = timestamp;
    }

    set lastUpdated (timestamp) {
        this._lastUpdated = timestamp;
    }

    toDefinitionDict () {
        return {
            pageName: this._pageName,
            createdAt: this._createdAt,
            lastUpdated: this._lastUpdated
        };
    }
}