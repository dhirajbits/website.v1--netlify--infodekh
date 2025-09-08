import { Tmpt } from "./Tmpt.js";
import { TmptDefinitionReader } from "./TmptDefinitionReader.js";



export class TmptMngr {
    constructor ({name}) {
        this.name = name;
        this.translator = {};
        this.tmpt = {};
    }


    async addTranslater ({url, absUrl}) {
        let finalUrl = absUrl || url;
        let readerModule = await import(finalUrl);
        let translator = readerModule.translator;
        let name = readerModule.name;
        this.translator[name] = translator;
    }


    removeTranslater ({name}) {
        const translator = this.translator[name];
        delete this.translator[name];
        return translator;
    }


    async createTmpt({definitionText, url, absUrl}) {
        // Get Definition text from url
        if ((absUrl) || (url)) {
            definitionText = await Utility.getDefinitionTextFromUrl({
                absUrl: absUrl,
                url: url
            });
        }

        // Cleaning Definition text
        if (!definitionText) {return null;}
        definitionText = definitionText.replaceAll("\r", "\n").trim()

        // Get translator name from template definition file text
        const translatorName = Utility.getTranslatorNameFromDefinitionText({
            definitionText: definitionText
        });

        // Run translator
        if (translatorName) {
            if (this.translator[translatorName]) {
                definitionText = this.translator[translatorName](definitionText);
            }
            
            else {
                console.error(`Unable to create template --> translator : '${translatorName}' does not exit.`);
                return null;
            }
        }

        // Run template definition reader (tmptDefinitionReader)
        const tmptDefinitionBlob = TmptDefinitionReader.getTmptDefinitionBlob({
            definitionText: definitionText
        })

        if (!tmptDefinitionBlob) {
            console.error("Unable to create template --> template definition is invalid.");
            return null;
        }

        
        // Create Tmpt object
        const template = new Tmpt({
            tmptDefinitionBlob: tmptDefinitionBlob
        })


        // Store Tmpt object
        this.tmpt[template.name] = template;
        return template;
    }


    getTmpt({name}) {
        return this.tmpt[name];
    }

    get (name) {
        return this.getTmpt({name: name});
    }

    removeTmpt({name}) {
        const template = this._templates[name];
        delete this._templates[name];
        return template;
    }

    remove (name) {
        return this.removeTmpt({name: name});
    }
}



class Utility {
    static async getDefinitionTextFromUrl ({absUrl, url}) {
        if ((absUrl) || (url)) {
            let response = null;
            if (absUrl) {
                response = await fetch(absUrl);
            }
            else if (url) {
                response = await fetch(url);
            }
            
            if (response) {
                return await response.text();
            }
            
            else {
                console.error(
                    `Unable to create template --> Bad response on url: '${absUrl||url}' \nResposeCode: '${response.status}'`
                )
                return null;
            }
        }
        return null;
    }


    static getTranslatorNameFromDefinitionText ({definitionText}) {
        if (definitionText.startsWith("#!")) {
            const firstLine = definitionText.split("\n")[0];
            return firstLine.replace("#!", "");
        }
        return null;
    }
}
