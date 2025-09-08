export class Hook {
    constructor ({name, type, definedScopes, rootElmt}) {
        this._name = name;
        this._type = type;
        this._definedScopes = definedScopes;
        this._rootElmt = rootElmt;
    }

    get name() {return this._name;}
    get type() {return this._type;}
    get definedScopes() {return this._definedScopes;}
    get rootElmt() {return this._rootElmt;}
}