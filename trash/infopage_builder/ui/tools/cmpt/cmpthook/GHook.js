import { CmptHook } from "./CmptHook.js";

export class GHook extends CmptHook{
    constructor ({name, elmt}) {
        super({
            name: name,
            elmt: elmt,
            type: "grab"
        });
    }
}