import { TmptDefinitionBlob } from "./TmptDefinitionBlob.js";

export class TmptSetDefinitionBlob {
    
    static fromJSON ({json}) {
        const dict = JSON.parse(json);
        const idToTmptDefinitionBlob = dict.idToTmptDefinitionBlob;
        const nameToTmptDefinitionBlob = dict.nameToTmptDefinitionBlob;

        for (let id in idToTmptDefinitionBlob) {
            idToTmptDefinitionBlob[id] = TmptDefinitionBlob.fromJSON({
                json: idToTmptDefinitionBlob[id]
            })
        }

        for (let name in nameToTmptDefinitionBlob) {
            nameToTmptDefinitionBlob[name] = TmptDefinitionBlob.fromJSON({
                json: nameToTmptDefinitionBlob[name]
            })
        }

        return new TmptSetDefinitionBlob({
            idToTmptDefinitionBlob: idToTmptDefinitionBlob,
            nameToTmptDefinitionBlob: nameToTmptDefinitionBlob
        });  
    }

    constructor ({idToTmptDefinitionBlob, nameToTmptDefinitionBlob}) {
        this.idToTmptDefinitionBlob = idToTmptDefinitionBlob || {};
        this.nameToTmptDefinitionBlob = nameToTmptDefinitionBlob || {};
    }

    toJSON () {
        const idToTmptDefBlobJson = {};
        for (let id in this.idToTmptDefinitionBlob) {
            idToTmptDefBlobJson[id] = this.idToTmptDefinitionBlob[id].toJSON();
        }

        const nameToTmptDefBlobJson = {};
        for (let name in this.nameToTmptDefinitionBlob) {
            nameToTmptDefBlobJson[name] = this.nameToTmptDefinitionBlob[name].toJSON();
        }

        return JSON.stringify({
            idToTmptDefinitionBlob: idToTmptDefBlobJson,
            nameToTmptDefinitionBlob: nameToTmptDefBlobJson
        });
    }
}