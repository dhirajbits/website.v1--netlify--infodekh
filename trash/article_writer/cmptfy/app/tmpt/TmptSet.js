import { Tmpt } from "./Tmpt.js";
import { TmptSetDefinitionBlob } from "../tmpt_definition/TmptSetDefinitionBlob.js";



export class TmptSet {

    static fromDefinitionBlob ({definitionBlob}) {
        const idToTmpt = {};
        const nameToTmpt = {};

        for (let id in definitionBlob.idToTmptDefinitionBlob) {
            idToTmpt[id] = Tmpt.fromDefinitionBlob({
                tmptDefinitionBlob: definitionBlob.idToTmptDefinitionBlob[id]
            })
        }

        for (let name in definitionBlob.nameToTmptDefinitionBlob) {
            idToTmpt[name] = Tmpt.fromDefinitionBlob({
                tmptDefinitionBlob: definitionBlob.nameToTmptDefinitionBlob[name]
            })
        }

        const tmptset = new TmptSet({name: Date.now().toString()})
        tmptset.idToTmpt = idToTmpt;
        tmptset.nameToTmpt = nameToTmpt;
        return tmptset;
    }

    constructor ({name}) {
        this.name = name || "";
        this.idToTmpt = {};
        this.nameToTmpt = {};

    }

    add ({tmpt}) {
        this.idToTmpt[tmpt.id] = tmpt;
        this.nameToTmpt[tmpt.name] = tmpt;
    }


    get ({name, id}) {
        if (id) {
            return this.idToTmpt[id];
        }
        else if (name) {
            return this.nameToTmpt[name];
        }
    }

    remove ({tmpt, id, name}) {
        if (tmpt) {
            delete this.idToTmpt[tmpt.id]
            if (tmpt === this.nameToTmpt[tmpt.name]) {
                delete this.nameToTmpt[tmpt.name];
            }
        }
        
        else if (id) {
            const tmpt = this.idToTmpt[id];
            if (tmpt) {
                delete this.idToTmpt[id];
                if (tmpt === this.nameToTmpt[tmpt.name]) {
                    delete this.nameToTmpt[tmpt.name];
                }
            }
        }

        else if (name) {
            const tmpt = this.nameToTmpt[name];
            if (tmpt) {
                delete this.nameToTmpt[name];
                delete this.idToTmpt[tmpt.id];
            }
        }

    }

    toDict() {
        return this.idToTmpt;
    }

    toDictByName () {
        return this.nameToTmpt;
    }

    toDefinitionBlob () {
        const idToTmptDefinitionBlob = {};
        const nameToTmptDefinitionBlob = {};

        for (let id in this.idToTmpt) {
            idToTmptDefinitionBlob[id] = this.idToTmpt[id].toDefinitionBlob();
        }

        for (let name in this.nameToTmpt) {
            nameToTmptDefinitionBlob[name] = this.nameToTmpt[name].toDefinitionBlob();
        }

        return new TmptSetDefinitionBlob({
            idToTmptDefinitionBlob: idToTmptDefinitionBlob,
            nameToTmptDefinitionBlob: nameToTmptDefinitionBlob
        });
    }
}


