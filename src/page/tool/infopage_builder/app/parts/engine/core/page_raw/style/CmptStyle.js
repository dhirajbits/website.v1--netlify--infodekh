import { Style } from "./Style.js";


export class CmptStyle extends Style{
    constructor ({idLikeClassName, declerations}) {
        super({
            selector: "." + idLikeClassName
        });
        this.bodyElmt.classList = "--cmptstyle-- " + this.bodyElmt.className;
        if (declerations) {
            this.addDeclerations(declerations);
        }

    }
}