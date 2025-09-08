import { TmptStyle } from "../../style/TmptStyle.js";
import { TmptHook } from "./TmptHook.js";
import { removeEmptyStringFromArray } from "../../utility/array.js";



export class Tmpt {
    static fromDefinitionBlob ({tmptDefinitionBlob}) {
        return new Tmpt({tmptDefinitionBlob: tmptDefinitionBlob})
    }

    constructor ({tmptDefinitionBlob}) {
        this.tmptDefinitionBlob = tmptDefinitionBlob;
        this.id = null;
        this.idLikeClassName = null;
        this.name = null;
        this.livingScopes = null;
        this.isScopeIsolated = null;
        this.hook = null;


        this.bodyElmt = null;
        this.bodyStyle = null;
        this.thumbnail = null;
        


        // Aliasing...
        this.rootElmt = this.bodyElmt;
        this.style = this.bodyStyle;

        // Assigning id
        if (tmptDefinitionBlob.id) {
            this.id = tmptDefinitionBlob.id;
        } else {
            this.id = this._generateTmptId();
            tmptDefinitionBlob.id = this.id;
        }

        this.idLikeClassName = this._generateIdLikeClassName();
        this.bodyElmt = this._getBodyElmt({
            tmptDefinitionBlob: tmptDefinitionBlob
        })
        this.bodyStyle = this._getBodyStyle({
            tmptDefinitionBlob: tmptDefinitionBlob
        })
        this.name = this._getTmptName();
        this.livingScopes = this._getLivingScopesOfTmpt();
        this.isScopeIsolated = this._getIsScopeIsolated();
        this.hook = this._createHooks();
        // this.thumbnail = this._createThumbnail();


        this._addDefaultClassesToTmptElmt();
        this._removeDataAttrsFromTmptElmt();


        // Aliasing...
        this.rootElmt = this.bodyElmt;
        this.style = this.bodyStyle;
    }

    toDefinitionBlob () {
        return this.tmptDefinitionBlob;
    }

    _generateTmptId () {
        return String(IdUtility.generateUniqueId());
    }

    _generateIdLikeClassName () {
        return "--temp--idLikeClassName--" + this.id;
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
        return styleCode.replaceAll("#-----", "." + this.idLikeClassName);
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

    _createHooks () {
        const hooks = {}
        const hookNodes = this.bodyElmt.querySelectorAll("[data-hook]");
        for (let hookNode of hookNodes) {
            const hook = new TmptHook({
                hookElmt: hookNode,
                base: this
            });
            hooks[hook.name] = hook;
        }
        return hooks;
    }

    _addDefaultClassesToTmptElmt() {
        const defaultClasses = [
            this.idLikeClassName,
            "--tmpt--" + this.name,
            "--tmpt--",
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
    static generateUniqueId () {
        this.counter += 1;
        return "tmptId" + Date.now() + this.counter;
    }
}