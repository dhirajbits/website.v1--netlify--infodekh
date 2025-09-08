import { CanvasStructure } from "../CanvasStructure.js";
import { CanvasStyle } from "../CanvasStyle.js";
import { CanvasHtmlElmt } from "../CanvasHtmlElmt.js";


export class CmptCanvas0 {
    constructor ({page}) {
        this.cmptpool = page.cmptPool;
        this.canvasStructure = null;
        this.canvasStyle = null;
        this.canvasHtmlElmt = null;
        this.bodyElmt = null;
        
        this.reset();
    }

    isCmptOnCanvas ({cmpt}) {
        return this.canvasStructure.isCmptInStructure({cmpt: cmpt});
    }

    reset () {
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

    addAllCmptOfCmptpool () {
        CmptPoolOnCanvasLoader.loadCmptPoolOnCanvas({
            cmptpool: this.cmptpool,
            cmptcanvas: this
        });
    }

    addCmpt ({cmpt, parentCmpt, hookName}) {
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
    static loadCmptPoolOnCanvas ({cmptpool, cmptcanvas}) {
        const cmpts = cmptpool.getAllCmptsInRefIdToCmptFormat();
        for (let cmptRefId in cmpts) {
            const cmpt = cmpts[cmptRefId];
            if (cmptcanvas.isCmptOnCanvas({cmpt: cmpt})) {continue;}
            const rootNodesTowardShoot = this.findRootNodesTowardShoot({
                cmpt: cmpt,
                cmptpool: cmptpool
            });
            this.addRootNodesTowardShootOnCanvas({
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

    static addRootNodesTowardShootOnCanvas ({rootNodesTowardShoot, cmptcanvas, cmptpool}) {
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
                cmptcanvas.addCmpt({
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




