import { TmptStyle } from "../style/TmptStyle.js";
import { ThumbnailStyle } from "../style/ThumbnailStyle.js";


export class Tmpt {
    constructor ({tmptDefinitionBlob}) {
        this.id = null;
        this.idLikeClassName = null;
        this.name = null;
        this.livingScopes = null;
        this.isScopeIsolated = null;
        this.hook = null;


        this.bodyElmt = null;
        this.bodyStyle = null;
        this.thumbnail = null;
        this.thumbnailElmt = null;
        this.thumbnailStyle = null;



        this.rootElmt = this.bodyElmt;
        this.style = this.bodyStyle;
    

        if (!tmptDefinitionBlob.body) { return }


        const bodyHtmlDoc = HtmlUtility.getBodyHtmlDoc({
            bodyHtmlCode: tmptDefinitionBlob.body
        });
        const bodyStyleHtmlDoc = HtmlUtility.getBodyStyleHtmlDoc({
            bodyStyleHtmlCode: tmptDefinitionBlob.bodystyle
        });
        const thumbnailHtmlDoc = HtmlUtility.getThumbnailHtmlDoc({
            thumbnailHtmlCode: tmptDefinitionBlob.thumbnail
        });
        const thumbnailStyleHtmlDoc = HtmlUtility.getThumbnailStyleHtmlDoc({
            thumbnailStyleHtmlCode: tmptDefinitionBlob.thumbnailstyle
        });


        this.bodyElmt = bodyHtmlDoc;
        this.thumbnailElmt = thumbnailHtmlDoc;
        

        this.id = IdUtility.getTmptUniqueId();
        this.idLikeClassName = this._getIdLikeClassName();
        this.name = Utility.getTmptName({tmptElmt: this.bodyElmt});
        this.name = PRIVATE.temp();
        // this.hook = Utility.createTmptHooks({tmptElmt: this.bodyElmt})
        

        this.livingScopes = Utility.getLivingScopes({
            tmptElmt: this.bodyElmt
        });
        

        this.isScopeIsolated = Utility.getIsScopeIsolated({
            tmptElmt: this.bodyElmt
        });


        this._addIdLikeClassNameToBodyElmt({className: this.idLikeClassName});
        this._addDefaultTmptClassesToBodyElmt();
        this._fillVariablePlaceholderOfBodyStyle();


        this.tmptStyle = new TmptStyle({
            innerHtml: this._bodyStyleHtmlDoc.innerHTML
        });
        this.style = this.tmptStyle;


        this.thumbnailStyle = new ThumbnailStyle({
            innerHtml: this._thumbnailStyleHtmlDoc.innerHTML
        });

    }


    _addDefaultTmptClassesToBodyElmt () {
        this.bodyElmt.classList.add(this.id);
        this.bodyElmt.classList.add("--tmpt--");
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

class $TmptElmt {

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

