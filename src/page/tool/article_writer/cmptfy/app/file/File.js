import { TmptSet } from "../tmpt/TmptSet.js";
import { CmptSet } from "../cmpt/CmptSet.js";
import { FileDefinitionBlob } from "../file_definition/FileDefinitionBlob.js";


export class File {
    static fromDefinitionBlob ({definitionBlob}) {
        return new File({
            tmptset: TmptSet.fromDefinitionBlob({
                definitionBlob: definitionBlob.tmptsetDefinitionBlob
            }),
            cmptset: CmptSet.fromDefinitionBlob({
                definitionBlob: definitionBlob.cmptsetDefinitionBlob
            }),
            // cmptcanvas: definitionBlob.cmptcanvas,
            // page: definitionBlob.page
        });
    }

    constructor ({tmptset, cmptset, cmptcanvas, page}) {
        this.tmptset = tmptset || new TmptSet({name: ""});
        this.cmptset = cmptset || new CmptSet({name: ""});
        this.cmptcanvas = null;
        this.page = null;
    }

    toDefinitionBlob () {
        return new FileDefinitionBlob({
            tmptsetDefinitionBlob: this.tmptset.toDefinitionBlob(),
            cmptsetDefinitionBlob: this.cmptset.toDefinitionBlob(),
            // cmptcanvasDefinitionBlob: this.cmptcanvas.toDefinitionBlob(),
            // pageDefinitionBlob: this.page.toDefinitionBlob()
        });
    }
}