import { CmptHook } from "../CmptHook.js";
import { Cmpt0 } from "./Cmpt0.js";


export class Cmpt1__withTmpt extends Cmpt0{
    constructor ({tmpt, tmptRefId, tmptpool, hookGeneDictDict, id, refId, styleId, idLikeClassName, nickname}) {
        // Setting default parameter value
        if (!hookGeneDictDict) {hookGeneDictDict = {}};

        super({id, refId, styleId, idLikeClassName, nickname})
        
        this.tmpt = null;
        this.tmptRefId = null;
        this.tmptpool = null;
        this.bodyElmt = null;
        this.livingScope = null;
        this.isScopeIsolated = null;
        this.hooks = {}


        // Assinging properties
        this.tmpt = tmpt;
        this.tmptRefId = tmptRefId;
        this.tmptpool = tmptpool;
        this.hookGeneDictDict = hookGeneDictDict;
    }

    async zInit () {
        return await this.load();
    }

    async load () {
        if (this.tmpt) {
            this.tmptRefId = this.tmpt.refId
        }

        else if (this.tmptRefId) {
            this.tmpt = await this.tmptpool.getTmptByRefId({
                refId: this.tmptRefId
            });
        }

        if (!this.tmpt) {return}
        this.bodyElmt = this.tmpt.bodyElmt.cloneNode(true);
        this.livingScope = this.tmpt.livingScope;
        this.isScopeIsolated = this.tmpt.isScopeIsolated;

        this.hooks = this._createHooks({
            hookGeneDictDict: this.hookGeneDictDict
        });
        delete this.hookGeneDictDict;

        this._addDefaultClasses();
    }

    _createHooks ({hookGeneDictDict}) {
        const hooks = {};
        for (let hookName in this.tmpt.hooks) {
            // Finding tmpthook
            const tmptHook = this.tmpt.hooks[hookName];

            // Finding hook element
            let hookElmtInCmptBodyElmt = null;
            let hookElmtSelector = "";
            for (let className of tmptHook.bodyElmt.classList) {
                hookElmtSelector += "." + className;
            }
            hookElmtInCmptBodyElmt = this.bodyElmt.querySelector(
                hookElmtSelector
            );

            hooks[hookName] = new CmptHook({
                geneDict: hookGeneDictDict[hookName],
                tmptHook: tmptHook,
                elmt: hookElmtInCmptBodyElmt,
                base: this
            });
        }
        return hooks;
    }

    _addDefaultClasses () {
        const defaultClasses = [
            "--cmpt--",
            this.styleId,
            this.idLikeClassName,
        ];

        for (let className of defaultClasses) {
            this.bodyElmt.classList.add(className);
        }
    }

    toDICT () {
        const dict = super.toDICT();
        dict["tmptRefId"] = this.tmptRefId;
        return dict;
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        geneDict["tmptRefId"] = this.tmptRefId;

        // Adding hook gene dict
        geneDict["hookGeneDictDict"] = {};
        for (let hookName in this.hooks) {
            const hook = this.hooks[hookName];
            geneDict["hookGeneDictDict"][hookName] = this.hooks[hookName].toGeneDict();
        }
        
        return geneDict;
    }
}