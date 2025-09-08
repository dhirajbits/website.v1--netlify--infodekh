import { HOOK_TYPE } from "./HOOK_TYPE.js";

export class Hook {
    constructor ({hookElmt, parentStyleElmtWrapper, config}) {
        this.rootElmt = hookElmt;
        this.styleElmt = null;
        this.id = null;
        this.name = null;
        this.type = null;
        this.definedScopes = [];
        this.config = config;
        this.style = null;
        this.opacity = 1;
        this._hidden = false;
        this._hiddenButReadable = true;
        this._layer = 0;

        this.id = Utility.createUniqueHookId();
        this.name = Utility.getHookName({elmt: this.rootElmt});
        this.type = Utility.getHookType({elmt: this.rootElmt});
        this.definedScopes = Utility.getDefinedScopes({elmt: this.rootElmt});
        
        this.rootElmt.id = this.id;
        this.rootElmt.classList.value = String([
            ...Utility.getDefaultClassesForHook({
                hookName: this.name,
                hookType: this.type
            }),
            ...this.rootElmt.classList
        ]).replaceAll(",", " ");

        this.style = this.rootElmt.style;
        this.opacity = this.rootElmt.style.opacity;

        this.styleElmt = this._createStyleElmt();
        parentStyleElmtWrapper.appendChild(this.styleElmt);

    }

    get hidden() {return this._hidden;}
    get hiddenButReadable() {return this._hiddenButReadable;}

    set hidden(value) {
        const ZERO_DIM_BUT_READABLE = "ZeroDimButReadable"
        const ZERO_DIM = "ZeroDim"

        if (value === true) {
            if (this.hiddenButReadable) {
                if (this.rootElmt.classList.contains(ZERO_DIM)) {
                    this.rootElmt.classList.remove(ZERO_DIM);
                }

                if (!this.rootElmt.classList.contains(ZERO_DIM_BUT_READABLE)) {
                    this.rootElmt.classList.add(ZERO_DIM_BUT_READABLE);
                }
            }

            else {
                if (!this.rootElmt.classList.contains(ZERO_DIM)) {
                    this.rootElmt.classList.add(ZERO_DIM);
                }

                if (this.rootElmt.classList.contains(ZERO_DIM_BUT_READABLE)) {
                    this.rootElmt.classList.remove(ZERO_DIM_BUT_READABLE);
                }
            }
        }

        else {
            if (this.rootElmt.classList.contains(ZERO_DIM)) {
                this.rootElmt.classList.remove(ZERO_DIM);
            }

            if (this.rootElmt.classList.contains(ZERO_DIM_BUT_READABLE)) {
                this.rootElmt.classList.remove(ZERO_DIM_BUT_READABLE);
            }
        }
    }

    set hiddenButReadable(value) {
        if (value === true) {
            this._hiddenButReadable = true;
            this.hidden = true
        }
        
        else {
            this.hiddenButReadable = false;
            this.hidden = true;
        }
    }

    
    fill ({value}) {
        if (this.type === HOOK_TYPE.CMPT) {
            this.fillCmpt({cmpt: value});
        }

        else if (this.type === HOOK_TYPE.DATA) {
            this.fillData({text: value});
        }

        else if (this.type === HOOK_TYPE.HTML) {
            this.fillHtml({html: value});
        }

        else if (this.type === HOOK_TYPE.CMPT_LIST) {
            this.fillAppendableCmpt({cmpt: value});
        }

        
    }


    appendableFill ({value}) {}
    configure ({config}) {}

    
    fillCmpt({cmpt}) {
        cmpt.fitAndCoverInsideElmt({
            elmt: this.rootElmt
        });
    }

    fillData({text}) {
        this.rootElmt.textContent = text;
    }

    fillHtml({html}) {
        this.rootElmt.innerHTML = html;
    }

    fillStyle(value) {}

    fillAppendableCmpt({cmpt}) {
        cmpt.fitInsideElmt({
            elmt: cmpt.rootElmt
        });
    }


    addStyle (value) {
        let newStyle = ""
        for (let property in value) {
            newStyle += `${property}: ${value[property]};\n`;
        }
        
        let prevStyle = this.styleElmt.innerHTML;
        this.styleElmt.innerHTML = prevStyle.replace("\n}", "") + newStyle + "\n}";
    }


    removeStyle (value) {
        let newStyle = ""
        let prevStyle = this.styleElmt.innerHTML;
        for (let property in value) {
            const style = `${property}: ${value[property]};\n`;
            prevStyle = prevStyle.replace(style, "");
        }
        
        this.styleElmt.innerHTML = prevStyle;
    }


    _createStyleElmt () {
        const styleElmt = document.createElement("style");
        styleElmt.innerHTML = `
        #${this.id} {
        
}
        `;
        return styleElmt;
    }
   


}


class Utility {
    static counter = 0


    static createUniqueHookId () {
        this.counter += 1;
        return "--hook--" + this.counter;
    }


    static getDefaultClassesForHook ({hookName, hookType}) {
        return [
            "--hook--" + hookName,
            "--" + HOOK_TYPE.inOneLetter({HOOK_TYPE: hookType}) + "hook--",
            "--hook--",
        ]
    }


    static getHookName ({elmt}) {
        if (elmt.dataset.hook) {
            const hookNameParts = elmt.dataset.hook.split(".");
            return hookNameParts[hookNameParts.length-1];
        }
        return "_UNNAMED_";
    }


    static getHookType ({elmt}) {
        if (elmt.dataset.hookType) {
            const hookTypeValue = elmt.dataset.hookType;
            return HOOK_TYPE.from({textValue: hookTypeValue})
        }
        return HOOK_TYPE.default();
    }


    static getDefinedScopes ({elmt}) {
        if (elmt.dataset.definedScopes) {
            return this.removeEmptyStringFromArray({
                arr: elmt.dataset.definedScopes.split(" ")
            })
        }
        return [];
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