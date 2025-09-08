import { Page2__withMeta } from "./Page2__withMeta.js";


export class Page3__withTmptHub  extends Page2__withMeta {
    constructor ({tmpthub, pageMetaDefDict, pageGeneralInfoDefDict, id, refId}) {
        super({
            pageMetaDefDict: pageMetaDefDict,
            pageGeneralInfoDefDict: pageGeneralInfoDefDict,
            id: id,
            refId: refId
        });

        this.tmpthub = tmpthub;
    }

    toGeneDict () {
        return super.toGeneDict();
    }
}