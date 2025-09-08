import { CmptTemplate } from "./CmptTemplate.js";
import { TemplateDefinitionBlob } from "./TemplateDefinitionBlob.js";




export class CmptTemplateMngr {
    constructor ({name}) {
        this._name = name;
        this._readers = {};
        this._templates = {};
        this.defaultTemplateDefinitionTextReader = Utility.defaultTemplateDefinitionTextReader;
    }

    async addReader ({url, absoluteUrl}) {
        let finalUrl = absoluteUrl || url;
        let readerModule = await import(finalUrl);
        let reader = readerModule.reader;
        let name = readerModule.name;
        this._readers[name] = reader;
    }


    removeReader ({name}) {
        delete this._readers[name];
    }
    

    async createTemplate ({text, url, absoluteUrl,}) {
        let finalUrl = url || absoluteUrl;
        if ((!text) && (finalUrl)) {
            text = await Utility.getTextFromFileUrl({url: finalUrl})
        }
        if (!text) {return null;}

        let templateDefinitionBlog = null;
        let readerName = Utility.getReaderFromFileTexts({text: text});
        if (readerName) {
            if (this._readers[readerName]) {
                templateDefinitionBlog = this._readers[readerName]({
                    text: text,
                    TemplateDefinitionBlob: TemplateDefinitionBlob,
                    defaultTemplateDefinitionTextReader: this.defaultTemplateDefinitionTextReader,
                });
            }
            
            else {
                console.error(
                    `Undefined 'Template definition text reader': '${readerName}'`
                )
            }
        }

        else {
            templateDefinitionBlog = this.defaultTemplateDefinitionTextReader({text: text});
        }
        
        let cmptTemplate = null;
        if (templateDefinitionBlog.body) {
            cmptTemplate = new CmptTemplate({
                htmlCode: templateDefinitionBlog.body
            })
            this._templates[cmptTemplate.name] = cmptTemplate
        }
        return cmptTemplate;
    }


    removeTemplate ({name}) {
        const template = this._templates[name];
        delete this._templates[name];
        return template;
    }


    getTemplate ({name}) {
        return this._templates[name];
    }

}


class Utility {
    static async getTextFromFileUrl ({url}) {
        let text = null;
        let response = await fetch(url)
        if (response.ok) {
            text = await response.text();
        }
        
        else {
            console.error(
                `Unable to add template --> Bad response on url: '${url}`
            )
        }
        return text;
    }

    static getReaderFromFileTexts({text}) {
        if (!text) {return null;}
        let readerName = null;
        text = text.trim().replaceAll("\r", "\n");
        const lines = text.split("\n");
        if (lines.length > 0) {
            if (lines[0].startsWith("#!")) {
                const readerNameLine = lines[0];
                readerName = readerNameLine.replace("#!", "").trim()
            }            
        }
        return readerName;
    }

    static defaultTemplateDefinitionTextReader ({text}) {
        if (!text) {return null;}
        text = text.trim().replaceAll("\r", "\n")

        let bodyText = null;
        let previewText = null;
        let readerName = null;

        // Find reader and Remove Reader name Line
        readerName = Utility.getReaderFromFileTexts({text: text});
        if (readerName) {
            const textParts = text.split("\n");
            text = ""
            for (let i=1; i < textParts.length; i++) {
                text += textParts[i];
            }
            text = text.trim()
        }

        // Find Template Body
        const regexForBody = /@body\n[^]*\n[@/\0]/m;
        let bodyTextMatches = text.match(regexForBody);
        if ((bodyTextMatches) && (bodyTextMatches.length === 1)) {
            bodyText = bodyTextMatches[0];
            bodyText = bodyText.replace(/^.*\r?\n/, "");
            bodyText = bodyText.replace(/\r?\n[@]*$/ , "").trim();
        }


        // Find Template Preview
        const regexForPriview = /@preview\n[^]*\n@/m;
        let previewTextMatch = text.match(regexForPriview);
        if ((previewTextMatch) && (previewTextMatch.length === 1)) {
            previewText = previewTextMatch[0];
            previewText = previewText.replace(/^.*\r?\n/, "");
            previewText = previewText.replace(/\r?\n[@]*$/ , "").trim();
        }


        return new TemplateDefinitionBlob({
            body: bodyText,
            preview: previewText,
            reader: readerName,
        });
    }

    static removeEmptyStringFromArray({arr}) {
        if (!arr) {return arr;}
        
        let newArr = [];
        for (let item of arr) {
            if (item !== "") {
                newArr.push(item);
            }
        }
        return newArr;
    }
}



