import { CHook } from "../cmpthook/CHook.js";
import { DHook } from "../cmpthook/DHook.js";
import { GHook } from "../cmpthook/GHook.js";
import { HHook } from "../cmpthook/HHook.js";
import { LHook } from "../cmpthook/LHook.js";
import { Cmpt0 } from "./Cmpt0.js";


export class Cmpt1__withHooks extends Cmpt0 {
    constructor () {
        super();
        this.hooks = {}
        this._hookNameToHookConfig = {}
    }

    set htmlCode (code) {
        super.htmlCode = code;
        this._updateHooks();
    }

    addHook ({name, cssSelectorForHookElmt, type}) {
        cssSelectorForHookElmt = this._preprocessCssSelector({
            cssSelector: cssSelectorForHookElmt
        });
        
        this._hookNameToHookConfig[name] = {
            name: name,
            cssSelector: cssSelectorForHookElmt,
            type: type
        }

        if (!this.bodyElmt) {return}

        // Getting hook class
        const hookClass = HookTypeCollection.getHookClassOfType({type: type});
        if (!hookClass) {return}

        // Getting hook elmt
        const hookElmt = this._getHookElmtFromCssSelector({
            cssSelector: cssSelectorForHookElmt
        })
        if (!hookElmt) {return}

        // Creating hook
        const hook = new hookClass({
            name: name,
            elmt: hookElmt,
        });
        this.hooks[name] = hook;
    }


    getHook ({name}) {
        return this.hooks[name];
    }

    removeHook ({name}) {
        // Getting hookObject
        const hook = this.hooks[name];
        if (!hook) {return}

        // Removing hook html element from component body element
        this.bodyElmt.removeChild(hook.bodyElmt);

        // Removing hook from this class
        delete this.hooks[name];
        delete this._hookNameToHookConfig[name];
    }

    _updateHooks () {
        this.hooks = {}
        for (let hookName in this._hookNameToHookConfig) {
            const hookConfig = this._hookNameToHookConfig[hookName];
            this.addHook({
                name: hookConfig.name,
                cssSelectorForHookElmt: hookConfig.cssSelector,
                type: hookConfig.type
            });
        }
    }

    _getHookElmtFromCssSelector ({cssSelector}) {
        if (this.bodyElmt) {
            return this.bodyElmt.querySelector(cssSelector);
        }
        return null;
    }

    _preprocessCssSelector ({cssSelector}) {
        return cssSelector.replace("#-----", `.${this.idLikeClassName}`);
    }
}


class HookTypeCollection {
    static hookTypeToHookClass = {
        "cmpt": CHook,
        "data": DHook,
        "grab": GHook,
        "html": HHook,
        "cmptlist": LHook,
    }

    static getHookClassOfType ({type}) {
        return this.hookTypeToHookClass[type];
    }
}