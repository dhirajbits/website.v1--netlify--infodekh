import { UnitHook } from "./UnitHook.js";


export class Unit {
    constructor ({cmpt}) {
        this.cmpt = cmpt;
        this.refId = cmpt.refId
        this.bodyElmt = document.createElement("ul");
        this.hooks = {};
        this.attachedToHook = null;

        this._createHooks();
        this._addDefaultClassToBodyElmt();
    }

    _createHooks () {
        for (let hookName in this.cmpt.hooks) {
            this.hooks[hookName] = new UnitHook({
                name: hookName,
                base: this
            });
        }
    }

    _addDefaultClassToBodyElmt () {
        const defaultClassNames = [
            "--canvas-structure--unit--"
        ];

        for (let className of defaultClassNames) {
            this.bodyElmt.classList.add(className);
        }
    }
}