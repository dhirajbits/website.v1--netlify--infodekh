import { CmptStyle } from "../../style/CmptStyle.js";
import { StyleWrapper } from "../../style/StyleWrapper.js";
import { CmptHook } from "./CmptHook.js";
import { CmptDefinitionBlob } from "../../defintion_blob/cmpt/CmptDefinitionBlob.js";


export class Cmpt {
    static fromDefinitionBlob ({definitionBlob, tmptset}) {
        const cmpt = new Cmpt({
            tmpt: tmptset.get({name: definitionBlob.tmptName}),
            name: definitionBlob.cmptName,
        });

        // cmpt.livingScopes = definitionBlob.livingScopes;
        // cmpt.isScopeIsolated = definitionBlob.isScopeIsolated;
        
        // configuring component style
        cmpt.bodyStyle.addDeclerations(definitionBlob.style);

        // configuring hook (only hook style is configurable)
        for (let hookName in definitionBlob.hook) {
            const hookDef = definitionBlob.hook[hookName];
            if (cmpt.hook[hookName]) {
                cmpt.hook[hookName].bodyStyle.addDeclerations(hookDef.style);
            }
        };
        return cmpt;
    }


    constructor ({tmpt, name}) {
        this.id = null;
        this.name = name || "";
        this.tmpt = tmpt;
        this.idLikeClassName = null;
        this.livingScopes = [];
        this.isScopeIsolated = false;
        this.hook = {};
        this.bodyElmt = null;
        this.bodyStyle = null;
        this.cmptAndHookStyleWrapper = null;

        // Alise...
        this.rootElmt = this.bodyElmt;
        this.style = this.bodyStyle;


        if (!tmpt) {return;}


        this.id = IdUtility.generateUniqueId();
        this.idLikeClassName = this._generateIdLikeClassName();
        this.livingScopes = this.tmpt.livingScopes;
        this.isScopeIsolated = this.tmpt.isScopeIsolated;
        this.bodyElmt = this._createBodyElmt();
        this.bodyStyle = this._createBodyStyle();
        this.hook = this._createHooks();
        this.cmptAndHookStyleWrapper = this._createCmptAndHookStyleWrapper();


        this._addDefaultClassesToBodyElmt();
        this._wrapeCmptAndHookStyle();

        // Aliasing...
        this.rootElmt = this.bodyElmt;
        this.style = this.bodyStyle;
    }


    fitInsideElmt ({elmt}) {
        elmt.appendChild(this.bodyElmt);
        elmt.appendChild(this.cmptAndHookStyleWrapper.bodyElmt);
    }

    fillInsideElmt ({elmt}) {
        elmt.innerHTML = "";
        this.fitInsideElmt({elmt: elmt});
    }

    toDefinitionBlob () {
        const hooks = {}
        for (let hookName in this.hook) {
            hooks[hookName] = this.hook[hookName].toHookDefinitionBlob()
                                                .toDict();
        }

        return new CmptDefinitionBlob({
            cmptName: this.name,
            tmptName: this.tmpt.name,
            livingScopes: this.livingScopes,
            isScopeIsolated: this.isScopeIsolated,
            hook: hooks,
            style: this.bodyStyle.configurations
        });
    }


    _generateIdLikeClassName () {
        return "--cmpt--idLikeClassName--" + this.id;
    }

    _createBodyElmt () {
        return this.tmpt.bodyElmt.cloneNode(true);
    }

    _createBodyStyle () {
        return new CmptStyle({
            idLikeClassName: this.idLikeClassName,
            declerations: null,
        });
    }

    _createHooks () {
        const hooks = {}
        for (let tmptName in this.tmpt.hook) {
            // Getting template hook
            const tmptHook = this.tmpt.hook[tmptName];
            
            // Getting hook element
            let selector = "";
            for (let className of tmptHook.bodyElmt.classList) {
                selector += "." + className;
            }

            const hookElmt = this.bodyElmt.querySelector(selector);

            // Creating hook
            let hook = new CmptHook({
                tmptHook: tmptHook,
                elmt: hookElmt,
                base: this,
            });

            hooks[hook.name] = hook;
        }
        return hooks;
    }

    _addDefaultClassesToBodyElmt () {
        const defaultClasses = [
            this.idLikeClassName,
            "--cmpt--" + this.name,
            "--cmpt--"
        ]
        for (let className of defaultClasses) {
            this.bodyElmt.classList.add(className);
        }
    }

    _createCmptAndHookStyleWrapper () {
        return new StyleWrapper({styles: null});
    } 

    _wrapeCmptAndHookStyle () {
        this.cmptAndHookStyleWrapper.addStyle({style: this.bodyStyle});
        for (let hookName in this.hook) {
            const hook = this.hook[hookName];
            this.cmptAndHookStyleWrapper.addStyle({style: hook.bodyStyle});
        }
    }
}



class IdUtility {
    static counter = 0;
    static generateUniqueId () {
        this.counter += 1;
        return "cmptId" + this.counter;
    }
}



