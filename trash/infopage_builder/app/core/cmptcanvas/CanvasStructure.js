import { Unit } from "./Unit.js";


export class CanvasStructure {
    
    static convertCmptToUnit ({cmpt}) {
        if (!cmpt) { return null;}
        return new Unit({cmpt: cmpt});
    }

    constructor () {
        this.unitRefIdToUnit = {};
        this.rootUnits = [];
        this.bodyElmt = document.createElement("div");
        
        this._addDefaultClassToBodyElmt();
    }

    isUnitInStructure ({unit}) {
        if (unit) {
            return (unit.refId in this.unitRefIdToUnit);
        }
        return false;
    }

    isCmptInStructure ({cmpt}) {
        if (cmpt) {
            return (cmpt.refId in this.unitRefIdToUnit);
            // since cmpt.refId === unit.refId
        }
        return false;
    }

    addUnit ({unit, parentUnit, hookName}) {
        if (unit.refId in this.unitRefIdToUnit) {return ;}
        
        // Adding unit as root unit
        if ((!parentUnit) || (!hookName)) {
            this.rootUnits.push(unit);
            this.unitRefIdToUnit[unit.refId] = unit;
            this.bodyElmt.appendChild(unit.bodyElmt);
            return;
        }
        
        // Adding unit at given position
        const hook = parentUnit.hooks[hookName];
        if (hook) {
            hook.attach({unit: unit});
        }
    }

    addUnitByParentRefId ({unit, parentUnitRefId, hookName}) {
        let parentUnit = null;

        if (parentUnitRefId) {
            parentUnit = this.unitRefIdToUnit[parentUnitRefId];
        }

        this.addUnit ({
            unit: unit,
            parentUnit: parentUnit,
            hookName: hookName
        });
    }

    removeUnit ({unit}) {
        if (unit.attachedToHook) {
            unit.attachedToHook.detach({unit: unit});
        }

        else {
            this.rootUnits = this.rootUnits.filter(_unit => _unit !== unit);
            this.bodyElmt.removeChild(unit.bodyElmt)
        }

        return unit;
    }

    moveUnit ({unit, parentUnit, hookName}) {
        // Remove unit from previous position
        unit = this.removeUnit({unit: unit})

        // Place unit at given position
        this.addUnit({
            unit: unit,
            parentUnit: parentUnit,
            hookName: hookName
        });
    }

    _addDefaultClassToBodyElmt () {
        const defaultClassNames = [
            "--canvas-structure--"
        ];
        for (let className of defaultClassNames) {
            this.bodyElmt.classList.add(className);
        }
    }
}