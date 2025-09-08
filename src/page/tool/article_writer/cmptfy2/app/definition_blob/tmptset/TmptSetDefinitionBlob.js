import { TmptDefinitionBlob } from "../tmpt/TmptDefinitionBlob.js";

export class TmptSetDefinitionBlob {
    static fromHWD ({}) {}

    static fromJSON ({json}) {
        const dict = JSON.parse(json);
        return this.fromDICT({dict: dict})
    }

    static fromDICT ({dict}) {
        const idToTmptDefinitionBlob = dict.idToTmptDefinitionBlob;
        const nameToTmptDefinitionBlob = dict.nameToTmptDefinitionBlob;

        for (let id in idToTmptDefinitionBlob) {
            idToTmptDefinitionBlob[id] = TmptDefinitionBlob.fromDICT({
                json: idToTmptDefinitionBlob[id]
            })
        }

        for (let name in nameToTmptDefinitionBlob) {
            nameToTmptDefinitionBlob[name] = TmptDefinitionBlob.fromDICT({
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
        return JSON.stringify(this.toDICT());
    }

    toDICT () {
        const idToTmptDefBlobJson = {};
        for (let id in this.idToTmptDefinitionBlob) {
            idToTmptDefBlobJson[id] = this.idToTmptDefinitionBlob[id].toDICT();
        }

        const nameToTmptDefBlobJson = {};
        for (let name in this.nameToTmptDefinitionBlob) {
            nameToTmptDefBlobJson[name] = this.nameToTmptDefinitionBlob[name].toDICT();
        }

        return {
            idToTmptDefinitionBlob: idToTmptDefBlobJson,
            nameToTmptDefinitionBlob: nameToTmptDefBlobJson
        };
    }
}