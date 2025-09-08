import { CanvasStructure } from "../CanvasStructure.js";
import { CanvasStyle } from "../CanvasStyle.js";
import { CanvasHtmlElmt } from "../CanvasHtmlElmt.js";
import { CmptCanvas1__withCCU } from "./CmptCanvas1__withCCU.js";


export class CmptCanvas2 extends CmptCanvas1__withCCU {
    constructor ({page}) {
        super();
        this.cc2 = "cc2";
        this.cmptpool = page.cmptPool;
        this.canvasStructure = null;
        this.canvasStyle = null;
        this.canvasHtmlElmt = null;
        this.bodyElmt = null;
        this.reset(this.cc2, false);
    }

    async zInit () {
        await super.zInit();
        this.bodyElmt.appendChild(this.rootHookFillerCmpt.bodyElmt);
        this.bodyElmt.appendChild(this.CCUStyleElmt);
    }

    isCmptOnCanvas ({cmpt}) {
        return this.canvasStructure.isCmptInStructure({cmpt: cmpt});
    }

    reset (cc, deepReset) {
        if ((cc !== this.cc2) && (cc !== undefined)) {return super.reset()}
        
        deepReset = (deepReset === null) || true;
        if (deepReset) {super.reset();}
        
        this.canvasStructure = new CanvasStructure();
        this.canvasStyle = new CanvasStyle();
        this.canvasHtmlElmt = new CanvasHtmlElmt();

        this.bodyElmt = document.createElement("div");
        this.bodyElmt.classList.add("--cmptcanvas--");
        this.bodyElmt.appendChild(this.canvasHtmlElmt.bodyElmt);
        this.bodyElmt.appendChild(this.canvasStyle.bodyElmt);
        
        this.structureElmt = this.canvasStructure.bodyElmt;
    }

    fitInsideElmt ({elmt}) {
        elmt.appendChild(this.bodyElmt);
    }

    fillInsideElmt ({elmt}) {
        elmt.innerHTML = "";
        this.fitInsideElmt({elmt: elmt});
    }

    async zAddAllCmptOfCmptpool () {
        await CmptPoolOnCanvasLoader.zLoadCmptPoolOnCanvas({
            cmptpool: this.cmptpool,
            cmptcanvas: this
        });
    }

    async zAddCmpt ({cmpt, parentCmpt, hookName}) {
        await super.zAddCmpt({
            cmpt: cmpt,
            parentCmpt: parentCmpt,
            hookName: hookName
        });

        if (this.isCmptOnCanvas({cmpt: cmpt})) {return}
        Utility.updateCmptAttachedCmpts({
            cmpt: cmpt,
            cmptpool: this.cmptpool
        });

        const unit = CanvasStructure.convertCmptToUnit({cmpt: cmpt});
        
        const parentUnit = CanvasStructure.convertCmptToUnit({
            cmpt: parentCmpt
        });
        
        this.canvasStructure.addUnit({
            unit: unit,
            parentUnit: parentUnit,
            hookName: hookName
        });
        
        this.canvasHtmlElmt.addCmpt({cmpt: cmpt});
        this.canvasStyle.addCmpt({cmpt: cmpt})
    }

    removeCmpt ({cmpt}) {
        const unit = CanvasStructure.convertCmptToUnit({cmpt: cmpt});

        this.canvasHtmlElmt.removeCmpt({cmpt: cmpt});
        this.canvasStructure.removeUnit({
            unit: unit
        });
        return cmpt;
    }

    moveCmpt ({cmpt, parentCmpt, hookName}) {
        const unit = CanvasStructure.convertCmptToUnit({cmpt: cmpt});
        const parentUnit = CanvasStructure.convertCmptToUnit({
            cmpt: parentCmpt
        });
        
        this.canvasStructure.moveUnit({
            unit: unit,
            parentUnit: parentUnit,
            hookName: hookName
        });
    }
}


class CmptPoolOnCanvasLoader {
    static async zLoadCmptPoolOnCanvas ({cmptpool, cmptcanvas}) {
        const cmpts = cmptpool.getAllCmptsInRefIdToCmptFormat();
        for (let cmptRefId in cmpts) {
            const cmpt = cmpts[cmptRefId];
            if (cmptcanvas.isCmptOnCanvas({cmpt: cmpt})) {continue;}
            const rootNodesTowardShoot = this.findRootNodesTowardShoot({
                cmpt: cmpt,
                cmptpool: cmptpool
            });
            await this.zAddRootNodesTowardShootOnCanvas({
                rootNodesTowardShoot: rootNodesTowardShoot,
                cmptcanvas: cmptcanvas,
                cmptpool: cmptpool
            });
        }
    }

    static findRootNodesTowardShoot ({cmpt, cmptpool}) {
        const rootNodesTowardShoot = [cmpt];
        while (cmpt.attachedToHookName) {
            cmpt = cmptpool.getCmptByRefId({
                refId: cmpt.attachedToCmptRefId
            });
            if (!cmpt) {break}
            else {rootNodesTowardShoot.push(cmpt);}
        }
        return rootNodesTowardShoot;
    }

    static async zAddRootNodesTowardShootOnCanvas ({rootNodesTowardShoot, cmptcanvas, cmptpool}) {
        for (let i=rootNodesTowardShoot.length-1; i >= 0; i--) {
            const cmpt = rootNodesTowardShoot[i];
            if (!cmptcanvas.isCmptOnCanvas({cmpt: cmpt})) {
                let parentCmpt = null;
                let hookName = null;
                if (cmpt.attachedToHookName) {
                    parentCmpt = cmptpool.getCmptByRefId({
                        refId: cmpt.attachedToCmptRefId
                    })
                    hookName = cmpt.attachedToHookName;
                }
                await cmptcanvas.zAddCmpt({
                    cmpt: cmpt,
                    parentCmpt: parentCmpt,
                    hookName: hookName
                });
            }   
        }
    }
}



class Utility {
    static updateCmptAttachedCmpts ({cmpt, cmptpool}) {
        for (let hookName in cmpt.hooks) {
            const hook = cmpt.hooks[hookName];
            hook.attachedCmpts = [];
            for (let cmptRefId of hook.attachments) {
                hook.attachedCmpts.push(cmptpool.getCmptByRefId({
                    refId: cmptRefId
                }));
            }
        }
    }
}




