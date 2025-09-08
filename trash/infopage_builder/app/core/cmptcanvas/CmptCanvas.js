import { CmptCanvas2 } from "./cmptcanvas_evolution/CmptCanvas2.js";


export class CmptCanvas extends CmptCanvas2 {
    constructor ({page}) {
        super({page: page});
    }

    async zInit () {
        await super.zInit();
    }
}