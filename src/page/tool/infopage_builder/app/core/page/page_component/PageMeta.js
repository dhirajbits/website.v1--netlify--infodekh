export class PageMeta {
    constructor ({definitionDict}) {
        if (!definitionDict) {definitionDict = {}}
        this._title = null;
        this.title = definitionDict.title;
    }

    get title () {return this._title;}

    set title (value) {
        value = value || "";
        this._title = value;
    }

    toDefinitionDict () {
        return {
            title: this._title
        };
    }
}