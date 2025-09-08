import { CmptDefinitionBlob } from "./CmptDefinitionBlob.js";

export class CmptSetDefinitionBlob {
    
    static fromJSON ({json}) {
        const dict = JSON.parse(json);
        const idToCmptDefinitionBlob = dict.idToCmptDefinitionBlob;
        const nameToCmptDefinitionBlob = dict.nameToCmptDefinitionBlob;

        for (let id in idToCmptDefinitionBlob) {
            idToCmptDefinitionBlob[id] = CmptDefinitionBlob.fromJSON({
                json: idToCmptDefinitionBlob[id]
            })
        }

        for (let name in nameToCmptDefinitionBlob) {
            nameToCmptDefinitionBlob[name] = CmptDefinitionBlob.fromJSON({
                json: nameToCmptDefinitionBlob[name]
            })
        }

        return new CmptSetDefinitionBlob({
            idToCmptDefinitionBlob: idToCmptDefinitionBlob,
            nameToCmptDefinitionBlob: nameToCmptDefinitionBlob
        });  
    }

    constructor ({idToCmptDefinitionBlob, nameToCmptDefinitionBlob}) {
        this.idToCmptDefinitionBlob = idToCmptDefinitionBlob || {};
        this.nameToCmptDefinitionBlob = nameToCmptDefinitionBlob || {};
    }

    toJSON () {
        const idToTmptDefBlobJson = {};
        for (let id in this.idToCmptDefinitionBlob) {
            idToTmptDefBlobJson[id] = this.idToCmptDefinitionBlob[id].toJSON();
        }

        const nameToTmptDefBlobJson = {};
        for (let name in this.nameToCmptDefinitionBlob) {
            nameToTmptDefBlobJson[name] = this.nameToCmptDefinitionBlob[name].toJSON();
        }

        return JSON.stringify({
            idToCmptDefinitionBlob: idToTmptDefBlobJson,
            nameToCmptDefinitionBlob: nameToTmptDefBlobJson
        });
    }
}