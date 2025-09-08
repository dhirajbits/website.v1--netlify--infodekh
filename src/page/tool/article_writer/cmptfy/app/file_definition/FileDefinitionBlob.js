import { TmptSetDefinitionBlob } from "../tmpt_definition/TmptSetDefinitionBlob.js";
import { CmptSetDefinitionBlob } from "../cmpt_definition/CmptSetDefinitionBlob.js";


export class FileDefinitionBlob {
    static fromJSON ({json}) {
        const dict = JSON.parse(json);
        dict.tmptsetDefinitionBlob = TmptSetDefinitionBlob.fromJSON({
            json: dict.tmptsetDefinitionBlob
        });
        dict.tmptsetDefinitionBlob = CmptSetDefinitionBlob.fromJSON({
            json: dict.tmptsetDefinitionBlob
        });
        // dict.tmptsetDefinitionBlob = TmptSetDefinitionBlob.fromJSON({
        //     json: dict.tmptsetDefinitionBlob
        // });
        // dict.tmptsetDefinitionBlob = TmptSetDefinitionBlob.fromJSON({
        //     json: dict.tmptsetDefinitionBlob
        // });
        return new FileDefinitionBlob(dict);
    }

    constructor ({tmptsetDefinitionBlob, cmptsetDefinitionBlob, cmptcanvasDefinitionBlob, pageDefinitionBlob}) {
        
        this.tmptsetDefinitionBlob = tmptsetDefinitionBlob;
        this.cmptsetDefinitionBlob = cmptsetDefinitionBlob;
        this.cmptcanvasDefinitionBlob = cmptcanvasDefinitionBlob;
        this.pageDefinitionBlob = pageDefinitionBlob;
    }

    toJSON () {
        return JSON.stringify({
            tmptsetDefinitionBlob: this.tmptsetDefinitionBlob.toJSON(),
            cmptsetDefinitionBlob: this.cmptsetDefinitionBlob.toJSON(),
            cmptcanvasDefinitionBlob: this.cmptcanvasDefinitionBlob.toJSON(),
            pageDefinitionBlob: this.pageDefinitionBlob.toJSON(),
        })
    }
}