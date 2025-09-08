import { CmptHook0 } from "./CmptHook0.js";


export class CmptHook1__withTmptHook extends CmptHook0 {
    // constructor ({tmptHook:!gene, elmt:!gene})
    constructor ({tmptHook, elmt, id, idLikeClassName, base}) {
        super({
            id: id,
            idLikeClassName: idLikeClassName,
            base: base
        });

        this.tmptHook = null;
        this.name = null;
        this.definedScopes = null;
        this.type = null;
        this.bodyElmt = null;

        
        // Assigning properties
        this.tmptHook = tmptHook;
        this.name = this._getHookName();
        this.definedScopes = this._getHookDefinedScope();
        this.type = this._getHookType();
        this.bodyElmt = elmt;

        // Extra Logic
        this._addDefaultClassNamesToBodyElmt();
    }

    toGeneDict () {
        return super.toGeneDict();
    }

    _getHookName () {
        return this.tmptHook.name;
    }

    _getHookDefinedScope () {
        return this.tmptHook.definedScopes;
    }

    _getHookType () {
        return this.tmptHook.type;
    }

    _addDefaultClassNamesToBodyElmt () {
        const defaultClassNames = [
            "--cmpthook--",
            this.idLikeClassName,
            `--cmpthook--${this.type}`,
            `--cmpthook--${this.name}`
        ];

        for (let className of defaultClassNames) {
            this.bodyElmt.classList.add(className);
        }
    }


}