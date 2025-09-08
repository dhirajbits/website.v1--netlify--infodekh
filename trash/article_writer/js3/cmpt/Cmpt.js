import { Style } from "../style/Style.js";
import { Hook } from "./Hook.js";


export class Cmpt {
    constructor ({name, template, config}) {
        this.name = name;
        this.template = template;
        this.config = config;
        this.rootElmt = null;
        this.styleElmt = null;
        this.style = null;
        this.styleElmtWrapper = null;
        this.id = null;
        this.livingScopes = [];
        this.hook = {};
        this.opacity = 1;
        this.layer = 0;
        this.hidden = false;
        this.hiddenButReadable = false;
        


        this.rootElmt = this._createRootElmtFromTmpt({
            template: template
        });
        

        this.id = Utility.createUniqueCmptId();
        this.rootElmt.id = this.id;


        this.rootElmt.classList.value = String([
            ...Utility.getDefaultClassesForCmpt({
                template: template,
                cmptName: this.name
            }),
            ...this.rootElmt.classList
        ]).replaceAll(",", " ");


        this.livingScopes = [...this.template.livingScopes];
        this.opacity = this.rootElmt.style.opacity;
        
        
        this.styleElmt = this._createStyleElmt();
        this.styleElmtWrapper = this._createStyleElmtWrapper();
        this.style = new Style({
            name: this.name,
            elmt: this.styleElmtWrapper
        });


        this.hook = this._createHooksOfCmpt({
            cmptElmt: this.rootElmt
        })

    }

    
    fitInsideElmt ({elmt}) {
        elmt.appendChild(this.rootElmt);
        elmt.appendChild(this.styleElmtWrapper);
    }


    fitAndCoverInsideElmt ({elmt}) {
        elmt.innerHTML = "";
        this.fitInsideElmt({elmt: elmt});
    }



    _createRootElmtFromTmpt({template}) {
        return template.rootElmt.cloneNode(true);
    }
    

    _createHooksOfCmpt ({cmptElmt}) {
        const hooks = {};

        const wraperDiv = document.createElement("div")
        wraperDiv.appendChild(cmptElmt);
        
        const hookNodes = wraperDiv.querySelectorAll("[data-hook]");
        for (let hookNode of hookNodes) {
            const hook = new Hook({
                hookElmt: hookNode,
                parentStyleElmtWrapper: this.styleElmtWrapper,
                config: null,
            })
            hooks[hook.name] = hook;
        }
        return hooks;
    }

    _createStyleElmt () {
        const styleElmt = document.createElement("style");
        styleElmt.innerHTML = `
        #${this.id} {
        
}
        `;
        return styleElmt;
    }

    _createStyleElmtWrapper () {
        const styleElmtWrapper = document.createElement("div");
        styleElmtWrapper.appendChild(this.styleElmt);
        return styleElmtWrapper;
    }


    
}



class Utility {
    static counter = 0

    static createUniqueCmptId () {
        this.counter += 1;
        return "--cmpt--" + this.counter;
    }

    
    static getDefaultClassesForCmpt ({template, cmptName}) {
        return [
            "--cmpt--" + cmptName,
            "--cmpt--",
        ]
    }


    static createUniqueHookId () {
        this.counter += 1;
        return "--hook--" + this.counter;
    }


    static getDefaultClassesForHook ({hook}) {
        return [
            "--hook--" + hook.name,
            "--" + hook.type.lower().split("-")[0][0] + "hook--",
            "--hook--",
        ]
    }
}