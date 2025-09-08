import { CmptDefinitionBlob } from "./CmptDefinitionBlob.js";

export class CmptDefinitionReader {
    static read ({text}) {
        return this.getCmptDefinitionBlob({text: text});
    }

    static getCmptDefinitionBlob ({text}) {
        try {
            const defDict = JSON.parse(text);
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
            console.error("Error generated during cmpt-defintion-bloB creation from text.");
            return null;
        }
    }
}