import { StyleConfigFieldSet } from "./StyleConfigFieldSet.js";


export class TmptStyleConfig {
    static fromGeneDict ({geneDict}) {
        return new TmptStyleConfig({geneDict: geneDict})
    }
    constructor ({fields, geneDict}) {
        this.styleConfigFieldSet = new StyleConfigFieldSet({
            fields: fields,
            geneDict: geneDict
        });
    }

    toGeneDict () {
        return this.styleConfigFieldSet.toGeneDict()
    }

}