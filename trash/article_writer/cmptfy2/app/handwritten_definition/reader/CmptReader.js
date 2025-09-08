import { Reader } from "./Reader.js";
import { CmptDefinitionBlob } from "../../definition_blob/cmpt/CmptDefinitionBlob.js";


export class CmptReader extends Reader {
    static read ({definitionText}) {
        return this.getCmptDefinitionBlob({definitionText: definitionText});
    }

    static getCmptDefinitionBlob ({definitionText}) {
        try {
            const defDict = JSON.parse(definitionText);
            const blob = new CmptDefinitionBlob ({
                cmptName: defDict.cmptName,
                tmptName: defDict.tmptName,
                livingScopes: defDict.livingScopes,
                isScopeIsolated: defDict.isScopeIsolated,
                hook: defDict.hook,
                style: defDict.style
            });
            return blob; 
        } catch {
            console.error("Error generated during cmpt-defintion-blob creation from definitionText.");
            return null;
        }
    }
}