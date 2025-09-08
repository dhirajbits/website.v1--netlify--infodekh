import { Tmpt } from "../tmpt/Tmpt.js";
import { getTextContentOfFileUrl } from "../utility/fetch_file.js";
import { Reader } from "./reader/Reader.js";
import { Translator } from "./translator/Translator.js";



export class TmptHWD {
    constructor ({fileUrl, setName, groupName}) {
        this.setName = setName;
        this.groupName = groupName;
        this.fileUrl = fileUrl;
        this.tmptHWDefinitionText = "";
        this.tmptDefinitionBlob = null;
        this.tmpt = null;
    }

    async zInit () {
        return await this.load();
    }

    async load () {
        const definitionText = await getTextContentOfFileUrl({
            fileUrl: this.fileUrl,
            clean: true
        });

        if (definitionText) {
            this.tmptHWDefinitionText = definitionText;
        }
    }

    toTmptDefinitionBlob () {
        // Translate template hand written definition text
        const tmptDefinitionText = Translator.defaultTranslator({
            tmptHWDefinition: this.tmptHWDefinitionText
        });

        // Use Reader to convert definition text to definitionBlob
        if (tmptDefinitionText) {
            this.tmptDefinitionBlob = Reader.defaultReader({
                tmptDefinitionText: tmptDefinitionText,
                setName: this.setName,
                groupName: this.groupName
            });
        }
        return this.tmptDefinitionBlob;
    }

    toTmpt () {
        if (!this.tmptDefinitionBlob) {this.toTmptDefinitionBlob()}
        if (this.tmptDefinitionBlob) {
            this.tmpt = new Tmpt({
                definitionBlob: this.tmptDefinitionBlob
            });
        }
        return this.tmpt;
    }
}