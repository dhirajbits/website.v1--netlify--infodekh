import { Cmpt } from "./Cmpt.js";
import { CmptSetDefinitionBlob } from "../../definition_blob/cmptset/CmptSetDefinitionBlob.js";



export class CmptSet {

    static fromDefinitionBlob ({definitionBlob}) {
        const idToCmpt = {};
        const nameToCmpt = {};

        for (let id in definitionBlob.idToCmptDefinitionBlob) {
            idToCmpt[id] = Cmpt.fromDefinitionBlob({
                definitionBlob: definitionBlob.idToCmptDefinitionBlob[id]
            });
        }

        for (let name in definitionBlob.nameToCmptDefinitionBlob) {
            nameToCmpt[name] = Cmpt.fromDefinitionBlob({
                definitionBlob: definitionBlob.nameToCmptDefinitionBlob[name]
            });
        }

        const cmptset = new CmptSet({name: Date.now().toString()});
        cmptset.idToCmpt = idToCmpt;
        cmptset.nameToCmpt = nameToCmpt;
        return cmptset;
    }

    constructor({name}) {
        this.name = name;
        this.idToCmpt = {};
        this.nameToCmpt = {};
    }

    add ({cmpt}) {
        this.idToCmpt[cmpt.id] = cmpt;
        this.nameToCmpt[cmpt.name] = cmpt;
    }

    get ({id, name}) {
        if (id) {
            return this.idToCmpt[id];
        }
        
        else if (name) {
            return this.nameToCmpt[name];
        }
    }
    
    remove ({cmpt, id, name}) {
        if (cmpt) {
            delete this.idToCmpt[cmpt.id];
            if (cmpt === this.nameToCmpt[cmpt.name]) {
                delete this.nameToCmpt[cmpt.name];
            }
        }
        
        else if (id) {
            const cmpt = this.idToCmpt[id];
            if (cmpt) {
                delete this.idToCmpt[id];
                if (cmpt === this.nameToCmpt[cmpt.name]) {
                    delete this.nameToCmpt[cmpt.name];
                }
            }
        }

        else if (name) {
            const cmpt = this.nameToCmpt[name];
            if (cmpt) {
                delete this.nameToCmpt[name];
                delete this.idToCmpt[cmpt.id];
            }
        }

    }


    toDict () {
        return this.idToCmpt;
    }

    toDictByName () {
        return this.nameToCmpt;
    }

    toDefinitionBlob () {
        const idToCmptDefinitionBlob = {};
        const nameToCmptDefinitionBlob = {};

        for (let id in this.idToCmpt) {
            idToCmptDefinitionBlob[id] = this.idToCmpt[id].toDefinitionBlob();
        }

        for (let name in this.nameToCmpt) {
            nameToCmptDefinitionBlob[name] = this.nameToCmpt[name].toDefinitionBlob();
        }

        return new CmptSetDefinitionBlob({
            idToCmptDefinitionBlob: idToCmptDefinitionBlob,
            nameToCmptDefinitionBlob: nameToCmptDefinitionBlob
        })
    }

}

