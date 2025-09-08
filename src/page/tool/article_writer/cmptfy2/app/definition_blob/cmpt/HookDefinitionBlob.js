export class HookDefinitionBlob {
    constructor ({hookName, hookType, definedScopes, style}) {
        this._hookName = "";
        this._hookType = ""
        this._definedScopes = [];
        this._style = {}

        this.hookName = hookName;
        this.hookType = hookType;
        this.definedScopes = definedScopes;
        this.style = style;
    }


    get hookName() {return this._hookName;}
    get hookType() {return this._hookType;}
    get definedScopes() {return this._definedScopes;}
    get style() {return this._style;}


    set hookName (value) {
        if (value) {this._hookName = value;}
    }
    set hookType (value) {
        if (value) {this._hookType = value}
    }
    set definedScopes (value) {
        if (value.length) {this._definedScopes = value;}
    }
    set style (value) {
        if (typeof value === "object") {
            this._style = value;
        }
    }

    toDICT () {
        return {
            hookName: this.hookName,
            hookType: this.hookType,
            definedScopes: this.definedScopes,
            style: this.style
        }
    }
}