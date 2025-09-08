import { TmptTranslator } from "../translator/TmptTranslator.js";
import { TmptReader } from "../reader/TmptReader.js";
import { getTextContentOfFileUrl } from "../../utility/fetch_file.js";


export class TmptHWD {
    constructor ({fileFetchUrl}) {
        this.fileFetchUrl = fileFetchUrl;
        this.definitionText = null;
        this.translatedDefinitionText = null;
        this.definitionBlob = null;
        this.isLoaded = false;
    }

    async load () {
        if (this.isLoaded) {return}
        await this.fetchFile();
        this.runTranslator();
        this.runReader();
        this.isLoaded = true;
    }

    async fetchFile () {
        this.definitionText = await getTextContentOfFileUrl({
            fileUrl: this.fileFetchUrl,
            clean: true,
        });
    }

    runTranslator () {
        this.translatedDefinitionText = TmptTranslator.translate({
            definitionText: this.definitionText
        });
    }

    runReader () {
        if (this.translatedDefinitionText) {
            this.definitionBlob = TmptReader.read({
                definitionText: this.translatedDefinitionText
            });
        }
    }

    getDefinitionBlob () {
        return this.definitionBlob;
    }
}