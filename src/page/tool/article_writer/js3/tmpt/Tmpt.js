
export class Tmpt {
    constructor ({tmptDefinitionBlob}) {
        this.rootElmt = null;
        this.styleElmt = null;
        this.bodyElmt = null;
        this.bodyStyleElmt = null;
        this.thumbnailElmt = null;
        this.thumbnailStyleElmt = null;

        this.id = null;
        this.name = null;
        this.hook = null;
        this.livingScopes = [];
        this.isScopeIsolated = false;

        this._bodyHtmlDoc = null;
        this._bodyStyleHtmlDoc = null;
        this._thumbnailHtmlDoc = null;
        this._thumbnailStyleHtmlDoc = null;
    

        if (!tmptDefinitionBlob.body) { return }


        this._bodyHtmlDoc = HtmlUtility.getBodyHtmlDoc({
            bodyHtmlCode: tmptDefinitionBlob.body
        });
        this._bodyStyleHtmlDoc = HtmlUtility.getBodyStyleHtmlDoc({
            bodyStyleHtmlCode: tmptDefinitionBlob.bodystyle
        });
        this._thumbnailHtmlDoc = HtmlUtility.getThumbnailHtmlDoc({
            thumbnailHtmlCode: tmptDefinitionBlob.thumbnail
        });
        this._thumbnailStyleHtmlDoc = HtmlUtility.getThumbnailStyleHtmlDoc({
            thumbnailStyleHtmlCode: tmptDefinitionBlob.thumbnailstyle
        });


        this.rootElmt = this._bodyHtmlDoc;
        this.styleElmt = this._bodyStyleHtmlDoc;
        this.bodyElmt = this.rootElmt;
        this.bodyStyleElmt = this.styleElmt;
        this.thumbnailElmt = this._thumbnailHtmlDoc;
        this.thumbnailStyleElmt = this._thumbnailStyleHtmlDoc;


        this.id = IdUtility.getTmptUniqueId();
        this.name = Utility.getTmptName({tmptElmt: this.bodyElmt});
        // this.hook = Utility.createTmptHooks({tmptElmt: this.bodyElmt})
        

        this.livingScopes = Utility.getLivingScopes({
            tmptElmt: this.bodyElmt
        });
        

        this.isScopeIsolated = Utility.getIsScopeIsolated({
            tmptElmt: this.bodyElmt
        });

        
        this._addTmptClassToBodyElmt();
        this._fillVariablePlaceholderOfBodyStyle();

    }


    _addTmptClassToBodyElmt () {
        this.bodyElmt.classList.add(this._getTmptClassName());
    }

    _fillVariablePlaceholderOfBodyStyle () {
        let styleCode = this.bodyStyleElmt.innerHTML;
        styleCode = styleCode.replace("#-----", this._getTmptClassName());
        this.bodyStyleElmt.innerHTML = styleCode;
    }


    _getTmptClassName () {
        return "--tmpt--" + this.name;
    }
    
}



class HtmlUtility {
    static getBodyHtmlDoc ({bodyHtmlCode}) {
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


    static getBodyStyleHtmlDoc ({bodyStyleHtmlCode}) {
        if (bodyStyleHtmlCode) {
            const wrapperElmt = document.createElement("div");
            wrapperElmt.innerHTML = bodyStyleHtmlCode;
            return wrapperElmt.firstElementChild;
        }
        return document.createElement("style");
    }


    static getThumbnailHtmlDoc ({thumbnailHtmlCode}) {
        if (thumbnailHtmlCode) {
            const htmlDoc = document.createElement("template");
            htmlDoc.innerHTML = thumbnailHtmlCode;
            return htmlDoc.content.firstElementChild
        }
        const defaultDoc = document.createElement("div");
        defaultDoc.textContent = "Component Template's ThumbnailBody-Definition is empty";
        defaultDoc.style.backgroundColor = "red";
        return defaultDoc;
    }


    static getThumbnailStyleHtmlDoc ({thumbnailStyleHtmlCode}) {
        if (thumbnailStyleHtmlCode) {
            const wrapperElmt = document.createElement("div");
            wrapperElmt.innerHTML = thumbnailStyleHtmlCode;
            return wrapperElmt.firstElementChild;
        }
        return document.createElement("style");
    }
}


class IdUtility {
    static counter = 0;
    
    static getTmptUniqueId () {
        this.counter += 1;
        return String(this.counter);
    }
}

class Utility {
    static getTmptName ({tmptElmt}) {
        const tmptName = tmptElmt.dataset.tmpt;
        if (!tmptName) {
            tmptName = tmptElmt.dataset.cmpt;
        }
        return tmptName;
    }


    static getLivingScopes ({tmptElmt}) {
        const livingScopesStr = tmptElmt.dataset.livingScopes;
        if (livingScopesStr) {
            let livingScopes = livingScopesStr.split(" ");
            livingScopes = Utility.removeEmptyStringFromArray({
                arr: livingScopes
            })
            return livingScopes;
        }
        return [];
    }


    static getIsScopeIsolated({tmptElmt}) {
        return Boolean(tmptElmt.dataset.isScopeIsolated) || false;
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


/* 
class Utility {
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
 
}
*/