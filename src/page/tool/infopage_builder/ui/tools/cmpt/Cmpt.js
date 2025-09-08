import { Cmpt1__withHooks } from "./cmpt_evolution/Cmpt1_withHooks.js";


export class Cmpt extends Cmpt1__withHooks {
    constructor ({htmlCode, styleCode}) {
        super();
        if (htmlCode) {
            this.htmlCode = htmlCode;
        }

        if (styleCode) {
            this.styleCode = styleCode;
        }
    }
}