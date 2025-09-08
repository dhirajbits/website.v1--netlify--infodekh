import { Style } from "./Style.js";


export class HookStyle extends Style {
    constructor({idLikeClassName, declerations}){
        super({
            selector: "." + idLikeClassName
        });
        this.bodyElmt.classList = "--hookstyle-- " + this.bodyElmt.className;

        this.addDeclerations(declerations);
    }
}