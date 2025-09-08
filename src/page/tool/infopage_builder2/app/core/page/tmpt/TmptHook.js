import { StyleConfigFieldSet } from "../style_config/StyleConfigFieldSet.js";
import { removeEmptyStringFromArray } from "../utility/array.js";


export class TmptHook {
    constructor ({hookElmt, definitionBlob, base}) {
        this.id = null;
        this.idLikeClassName = null;
        this.name = null;
        this.type = null;
        this.definedScopes = null;
        this.bodyElmt = null;
        this.styleConfig = null;
        this.base = base; // "base" is template from which "hook" belongs
        
        
        // Aliases...
        this.rootElmt = this.bodyElmt;

        if (!hookElmt) {return;}

        this.id = IdUtility.generateUniqueId();
        this.idLikeClassName = this._generateIdLikeClassName();
        this.bodyElmt = hookElmt;
        this.name = this._getHookName();
        this.type = this._getHookType();
        this.definedScopes = this._getDefinedScopes()
        // this.styleConfig = this._getStyleConfigFieldSetObject({
        //     tmptDefinitionBlob: definitionBlob
        // });

        this._addDefaultClassesToHookElmt();
        this._clearHookDataset();


        // Aliasing...
        this.rootElmt = this.bodyElmt;
    }

    _generateIdLikeClassName () {
        return `--tmpthook--${this.id}--`;
    }

    _getHookName () {
        return this.bodyElmt.dataset.hook || "";
    }

    _getHookType () {
        return this.bodyElmt.dataset.hookType || "grab";
    }

    _getDefinedScopes () {
        const definedScopesStr = this.bodyElmt.dataset.definedScopes || "";
        const definedScopes = definedScopesStr.split(" ");
        return removeEmptyStringFromArray({arr: definedScopes});
    }

    _getStyleConfigFieldSetObject ({tmptDefinitionBlob}) {
        return new StyleConfigFieldSet({
            dict: tmptDefinitionBlob.hookstyleconfig
        });
    }

    _clearHookDataset () {
        this.bodyElmt.removeAttribute("data-hook");
        this.bodyElmt.removeAttribute("data-hook-type");
        this.bodyElmt.removeAttribute("data-defined-scopes");
    }

    _addDefaultClassesToHookElmt () {
        const defaultClasses = [
            "--hook--",
            "--hook--" + this.type,
            "--hook--" + this.name,
            this.idLikeClassName,
        ]
        for (let className of defaultClasses) {
            this.bodyElmt.classList.add(className);
        }
    }
}


class IdUtility {
    static counter = 0;
    static generateUniqueId() {
        this.counter += 1;
        return this.counter;
    }
}