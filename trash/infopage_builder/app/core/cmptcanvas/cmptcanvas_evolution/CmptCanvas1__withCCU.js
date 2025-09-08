import { CmptPool } from "../../page/page_component/CmptPool.js";
import { TmptPool } from "../../page/page_component/TmptPool.js";
import { TmptHub } from "../../tmpthub/TmptHub.js";
// import { CmptCanvas0 } from "./CmptCanvas0.js";


export class CmptCanvas1__withCCU  {
    constructor () {
        this.cc1 = "cc1";
        this.CCUStyleElmt = null;
        this.CCUCmptPool = null;
        this.rootHookFillerCmpt = null;
        this.reset(this.cc1);
    }

    async zInit () {
        this.CCUCmptPool = await this._zCreateCmptPool();
        this.rootHookFillerCmpt = await this._zGetRootHookFillerCmpt();
        this.CCUStyleElmt.appendChild(
            this.rootHookFillerCmpt.tmpt.style.bodyElmt
        )
    }

    reset (cc) {
        if ((cc !== this.cc1) && (cc !== undefined)) {return super.reset()}
        this.CCUStyleElmt = document.createElement("div");
        this.CCUStyleElmt.classList.add("--ccustyle--");
        this.CCUCmptPool = null;
        this.rootHookFillerCmpt = null;
    }

    async zAddCmpt ({cmpt, parentCmpt, hookName}) {
        for (let hookName in cmpt.hooks) {
            const hook = cmpt.hooks[hookName];
            
            if ((hook.type !== "cmpt") && (hook.type !== "cmptlist")) {
                continue;
            }
            
            const hookFillerCmpt = await NewCCUCmptPoolCmpt.hookFiller({
                ccuPool: this.CCUCmptPool
            });
            
            this.CCUStyleElmt.appendChild(
                hookFillerCmpt.tmpt.style.bodyElmt
            );

            hook.bodyElmt.appendChild(hookFillerCmpt.bodyElmt);
            hook.CCUHookFillerCmpt = hookFillerCmpt
            
            hookFillerCmpt.attachedToCmptRefId = cmpt.refId;
            hookFillerCmpt.attachedToHookName = hook.refID;
            hookFillerCmpt.attachedToCmpt = cmpt;
        }
    }


    async _zCreateCmptPool () {
        const tmpthub = new TmptHub({
            dirFetchUrl: "./app/template"
        });
        await tmpthub.zInit();

        const tmptpool = new TmptPool({
            tmptsets: ["cmpt_canvas_utility"],
            tmpthub: tmpthub
        });

        const cmptpool = new CmptPool({
            tmptpool: tmptpool
        });

        return cmptpool;
    }

    async _zGetRootHookFillerCmpt () {
        const hookFillerCmpt = await NewCCUCmptPoolCmpt.hookFiller({
            ccuPool: this.CCUCmptPool
        });

        hookFillerCmpt.bodyElmt.style.minHeight = "150px";
        
        return hookFillerCmpt;
    }

}



class NewCCUCmptPoolCmpt {
    static async hookFiller ({ccuPool}) {
        const cmpt = await ccuPool.zCreateAndAddCmpt({
            tmptRefId: "cmpt_canvas_utility..hook_filler"
        });

        return cmpt;
    }
}