import { Hook } from "./Hook.js";
import { HOOK_TYPE } from "./HOOK_TYPE.js";


export class CmptTemplate {
    constructor ({htmlCode}) {
        this._htmlCode = htmlCode;
        this._htmlDoc = null;
        this._name = null;
        this._rootElmt = null;
        this._hook = {};
        this._livingScopes = [];
        this._isScopeIsolated = false;


        this._htmlDoc = this._getHtmlDoc({htmlCode: this._htmlCode})
        this._name = this._getName({htmlDoc: this._htmlDoc});
        this._rootElmt = this._getRootElmt({htmlDoc: this._htmlDoc});
        this._hook = this._getHook({htmlDoc: this._htmlDoc});
        this._livingScopes = this._getLivingScopes({htmlDoc: this._htmlDoc});
        this._isScopeIsolated = this._getIsScopeIsolated(
            {htmlDoc: this._htmlDoc}
        );

    }


    get name() {return this._name;}
    get rootElmt() {return this._rootElmt;}
    get hook() {return this._hook;}
    get livingScopes() {return this._livingScopes;}
    get isScopeIsolated() {return this._isScopeIsolated;}


    _getHtmlDoc({htmlCode}) {
        let htmlDoc = document.createElement("template");
        htmlDoc.innerHTML = htmlCode;
        return htmlDoc.content.firstElementChild
    }


    _getName({htmlDoc}) {
        return htmlDoc.dataset.cmpt;
    }


    _getRootElmt({htmlDoc}) {
        return htmlDoc;
    }


    _getHook({htmlDoc}) {
        let hook = {};

        
        let externalWrapper = document.createElement("div");
        externalWrapper.appendChild(htmlDoc)
        let hookNodes = externalWrapper.querySelectorAll("[data-hook]");

        
        for (let hookNode of hookNodes) {
            let hookObj = Utility.createHookFromHookNode({
                hookNode: hookNode
            });
            hook[hookObj.name] = hookObj;
        }
        return hook;
    }


    _getLivingScopes({htmlDoc}) {
        let livingScopes = [];
        let livingScopesStr = htmlDoc.dataset.livingScopes;
        if (livingScopesStr) {
            let scopeParts = livingScopesStr.split(" ");
            livingScopes = Utility.removeEmptyStringFromArray({
                arr: scopeParts
            })
        }
        return livingScopes;
    }


    _getIsScopeIsolated({htmlDoc}) {
        let isScopeIsolatedValue = htmlDoc.dataset.isScopeIsolated;
        if (isScopeIsolatedValue === "true") {
            return true;
        }
        return false;
    }
}



class Utility {
    static createHookFromHookNode({hookNode}) {
        let dataHookValueParts = hookNode.dataset.hook.split(".");
        let name = dataHookValueParts[dataHookValueParts.length-1];
        let hookType = Utility.getHookTypeFromStr({
            hookTypeStr: dataHookValueParts[0]
        });
        let definedScopes = Utility.getDefinedScopesFromHtmlValue({
            definedScopesValueInHtml: hookNode.dataset.definedScopes
        });
        return new Hook({
            name: name,
            type: hookType,
            definedScopes: definedScopes,
            rootElmt: hookNode
        });
    }


    static getHookTypeFromStr({hookTypeStr}) {
        let hookTypeStrToHookType = {
            "c": HOOK_TYPE.CMPT,
            "d": HOOK_TYPE.DATA,
            "h": HOOK_TYPE.HTML,
            "s": HOOK_TYPE.STYLE,
            "cl": HOOK_TYPE.CMPT_LIST,
            "cmpt": HOOK_TYPE.CMPT,
            "data": HOOK_TYPE.DATA,
            "html": HOOK_TYPE.HTML,
            "style": HOOK_TYPE.STYLE,
            "cmpt-list": HOOK_TYPE.CMPT_LIST,
            "cmptList": HOOK_TYPE.CMPT_LIST,
            "cmpt_list": HOOK_TYPE.CMPT_LIST,
        }
        return hookTypeStrToHookType[hookTypeStr];
    }


    static getDefinedScopesFromHtmlValue({definedScopesValueInHtml}) {
        let definedScopes = []
        if (definedScopesValueInHtml) {
            let tempDefinedScopes = definedScopesValueInHtml.split(" ");
            definedScopes = Utility.removeEmptyStringFromArray({
                arr: tempDefinedScopes
            })
        }
        return definedScopes
    }


    static removeEmptyStringFromArray({arr}) {
        if (!arr) {return arr;}
        
        let newArr = [];
        for (let item of arr) {
            if (item !== "") {
                newArr.push(item);
            }
        }
        return newArr;
    }
}