import { getTextContentOfFileUrl } from "../utility/fetch_file.js";


export class AssetDef {
    constructor ({fileFetchUrl, translator, reader}) {
        this.fileFetchUrl = fileFetchUrl;
        this.translator = translator;
        this.reader = reader;
        this.assetDefBlob = null;
    }

    async load () {
        if (this.assetDefBlob) {return this.assetDefBlob;}

        const fileContent = await this._fetchFileContentFromUrl({
            fileFetchUrl: this.fileFetchUrl
        });

        const translatedFileContent = this._translateFileContent({
            fileContent: fileContent
        });

        const assetDefBlob = this._readFileContentWithReader({
            translatedFileContent: translatedFileContent
        });
        
        this.assetDefBlob = assetDefBlob;
        return assetDefBlob;
    }

    async reload () {
        this.assetDefBlob = null;
        return this.load();
    }

    async _fetchFileContentFromUrl ({fileFetchUrl}) {
        return await getTextContentOfFileUrl({
            fileUrl: fileFetchUrl,
            clean: true
        })
    }

    _translateFileContent ({fileContent}) {
        return this.translator.translate({
            definitionText: fileContent
        });
    }

    _readFileContentWithReader ({translatedFileContent}) {
        return this.reader.read({
            definitionText: translatedFileContent
        });
    }
}