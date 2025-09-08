import { TmptHook } from "./TmptHook.js";
import { TmptStyle } from "../style/TmptStyle.js";
import { StyleConfigFieldSet } from "../style_config/StyleConfigFieldSet.js";
import { removeEmptyStringFromArray } from "../utility/array.js";
import { TmptStyleConfig } from "../style_config/TmptStyleConfig.js";



export class Tmpt {
    constructor ({definitionBlob}) {
        // Defining properties
        this.definitionBlob = null;
        this.id = null;
        this.refId = null;
        this.styleId = null;
        this.idLikeClassName = null;

        this.bodyElmt = null;
        this.style = null;
        this.styleConfig = null;

        this.name = null;
        this.livingScopes = [];
        this.isScopeIsolated = false;
        this.hooks = {};

        // Assigning properties
        this.definitionBlob = definitionBlob;
        this.id = IdUtility.getUniqueId();
        this.styleId = this._getStyleId();
        this.idLikeClassName = this._getIdLikeClassName();

        this.bodyElmt = this._getBodyElmt({
            tmptDefinitionBlob: definitionBlob
        });

        this.style = this._getBodyStyle({
            tmptDefinitionBlob: definitionBlob
        });
        
        this.styleConfig = this._getStyleConfigFieldSetObject({
            tmptDefinitionBlob: definitionBlob
        });

        this.name = this._getTmptName();
        this.livingScopes = this._getLivingScopesOfTmpt();
        this.isScopeIsolated = this._getIsScopeIsolated();

        this.hooks = this._createHooks({
            tmptDefinitionBlob: definitionBlob
        });

        this.refId = definitionBlob.refId || this._getRefId({
            tmptDefinitionBlob: definitionBlob
        });

        this._addDefaultClassesToTmptElmt();
        this._removeDataAttrsFromTmptElmt();

    }

    _getStyleId () {
        return `--tmpt--styleId${this.id}--`;
    }

    _getIdLikeClassName () {
        return `--tmpt--idLikeClassName${this.id}--`;
    }

    _getBodyElmt ({tmptDefinitionBlob}) {
        let bodyHtmlCode = tmptDefinitionBlob.body;
        if (bodyHtmlCode) {
            const htmlDoc = document.createElement("template");
            htmlDoc.innerHTML = bodyHtmlCode;
            return htmlDoc.content.firstElementChild
        }
        const defaultDoc = document.createElement("div");
        defaultDoc.textContent = "Component Template's Body-Definition is empty";
        defaultDoc.style.backgroundColor = "red";
        return defaultDoc;
    }

    _getBodyStyle ({tmptDefinitionBlob}) {
        let bodyStyleHtmlCode = tmptDefinitionBlob.bodystyle;
        if (!bodyStyleHtmlCode) {bodyStyleHtmlCode = "";}
        
        bodyStyleHtmlCode = this._preprocessBodyStyleCode ({
            styleCode: bodyStyleHtmlCode
        });

        return new TmptStyle({innerHtml: bodyStyleHtmlCode});

    }

    _preprocessBodyStyleCode ({styleCode}) {
        return styleCode.replaceAll("#-----", "." + this.styleId);
    }

    _getStyleConfigFieldSetObject ({tmptDefinitionBlob}) {
        return TmptStyleConfig.fromGeneDict({
            geneDict: tmptDefinitionBlob.bodystyleconfig
        });
    }

    _getTmptName () {
        return this.bodyElmt.dataset.tmpt || "";
    }

    _getLivingScopesOfTmpt () {
        const scopeStr = this.bodyElmt.dataset.livingScopes;
        if (scopeStr) {
            let scopes = scopeStr.split(" ");
            scopes = removeEmptyStringFromArray({arr: scopes});
            return scopes;
        }
        return [];
    }

    _getIsScopeIsolated () {
        if (this.bodyElmt.dataset.isScopeIsolated) {
            return true;
        }
        else {
            return false;
        }
    }

    _createHooks ({tmptDefinitionBlob}) {
        const hooks = {}
        const hookNodes = this.bodyElmt.querySelectorAll("[data-hook]");
        for (let hookNode of hookNodes) {
            const hook = new TmptHook({
                hookElmt: hookNode,
                definitionBlob: tmptDefinitionBlob,
                base: this,
            });
            hooks[hook.name] = hook;
        }
        return hooks;
    }

    _getRefId ({tmptDefinitionBlob}) {
        return tmptDefinitionBlob.setName + "." + tmptDefinitionBlob.groupName + "." + this.name;
    }

    _addDefaultClassesToTmptElmt() {
        const defaultClasses = [
            "--tmpt--",
            "--tmpt--" + this.name,
            this.idLikeClassName,
            this.styleId,
        ]
        for (let className of defaultClasses) {
            this.bodyElmt.classList.add(className);
        }
    }

    _removeDataAttrsFromTmptElmt () {
        this.bodyElmt.removeAttribute("data-tmpt");
        this.bodyElmt.removeAttribute("data-living-scopes");
        this.bodyElmt.removeAttribute("data-is-isolated-scope");
    }
}

class IdUtility {
    static counter = 0;

    static getUniqueId () {
        this.counter += 1;
        return this.counter;
    }
}