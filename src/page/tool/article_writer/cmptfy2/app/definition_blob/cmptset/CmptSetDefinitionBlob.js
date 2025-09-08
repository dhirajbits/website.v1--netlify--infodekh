import { CmptDefinitionBlob } from "../cmpt/CmptDefinitionBlob.js";

export class CmptSetDefinitionBlob {
    static fromHWD({}) {}

    static fromJSON ({json}) {
        const dict = JSON.parse(json);
        return this.fromDICT({dict: dict})
          
    }

    static fromDICT({dict}) {
        const idToCmptDefinitionBlob = dict.idToCmptDefinitionBlob;
        const nameToCmptDefinitionBlob = dict.nameToCmptDefinitionBlob;

        for (let id in idToCmptDefinitionBlob) {
            idToCmptDefinitionBlob[id] = CmptDefinitionBlob.fromDICT({
                json: idToCmptDefinitionBlob[id]
            })
        }

        for (let name in nameToCmptDefinitionBlob) {
            nameToCmptDefinitionBlob[name] = CmptDefinitionBlob.fromDICT({
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
        return JSON.stringify(this.toDICT());
    }

    toDICT () {
        const idToTmptDefBlobJson = {};
        for (let id in this.idToCmptDefinitionBlob) {
            idToTmptDefBlobJson[id] = this.idToCmptDefinitionBlob[id].toDICT();
        }

        const nameToTmptDefBlobJson = {};
        for (let name in this.nameToCmptDefinitionBlob) {
            nameToTmptDefBlobJson[name] = this.nameToCmptDefinitionBlob[name].toDICT();
        }

        return {
            idToCmptDefinitionBlob: idToTmptDefBlobJson,
            nameToCmptDefinitionBlob: nameToTmptDefBlobJson
        };
    }
}