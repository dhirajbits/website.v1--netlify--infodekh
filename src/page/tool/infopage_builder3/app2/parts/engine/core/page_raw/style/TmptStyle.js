import { StyleElmt } from "./StyleElmt.js";


export class TmptStyle extends StyleElmt {
    constructor ({innerHtml}) {
        super({
            innerHtml: innerHtml
        })
        this.bodyElmt.classList = "--tmptstyle-- " + this.bodyElmt.className;
    }
}