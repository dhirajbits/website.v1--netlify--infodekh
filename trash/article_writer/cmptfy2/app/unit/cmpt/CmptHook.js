import { HookDefinitionBlob } from "../../defintion_blob/cmpt/HookDefinitionBlob.js";
import { HookStyle } from "../../style/HookStyle.js";



export class CmptHook {
    constructor ({tmptHook, elmt, base}) {
        this.id = null;
        this.idLikeClassName = null;
        this.name = null;
        this.type = null;
        this.definedScopes = [];
        this.base = base;
        this.bodyElmt = elmt;
        this.bodyStyle = null;

        
        // Alises...
        this.rootElmt = this.bodyElmt;
        this.style = this.bodyStyle;


        this.id = IdUtility.generateUniqueId();
        this.idLikeClassName = this._generateIdLikeClassName();
        this.name = tmptHook.name;
        this.type = tmptHook.type;
        this.definedScopes = tmptHook.definedScopes;
        this.bodyStyle = this._createHookStyle();

        this._addDefaultClassesToBodyElmt();


        // Alising...
        this.rootElmt = this.bodyElmt;
        this.style = this.bodyStyle;
    }

    attach({cmpt}) {
        if (this.attachedToHooks.length) {

        }
    }

    detach ({hook}) {

    }

    toHookDefinitionBlob () {
        return new HookDefinitionBlob({
            hookName: this.name,
            hookType: this.type,
            definedScopes: this.definedScopes,
            style: this.bodyStyle.configurations,
        });
    }

    _generateIdLikeClassName () {
        return "--cmpthook--idLikeClassName--" + this.id;
    }

    _createHookStyle () {
        return new HookStyle({
            idLikeClassName: this.idLikeClassName,
            declerations: null
        })
    }

    _addDefaultClassesToBodyElmt () {
        const defaultClasses = [
            this.idLikeClassName
        ]
        for (let className of defaultClasses) {
            this.bodyElmt.classList.add(className);
        }
    }
}


class IdUtility {
    static counter = 0;
    static generateUniqueId () {
        this.counter += 1;
        return this.counter;
    }
}


