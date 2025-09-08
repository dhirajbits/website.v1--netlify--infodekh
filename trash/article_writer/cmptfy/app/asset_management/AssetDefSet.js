import { AssetDef } from "./AssetDef.js";
import { getRegisterFromDir } from "../utility/fetch_file.js";



export class AssetDefSet {
    constructor ({dirFetchUrl, translator, reader}) {
        this.dirFetchUrl = dirFetchUrl;
        this.translator = translator;
        this.reader = reader;
        this.assetNameToDirFetchUrl = {};
        this.assetNameToAssetDef = {};

        // Object state management variables
        this.isBasicLoaded = false;
        this.isLoaded = false;
    }

    async basicLoad () {
        if ((this.isLoaded) || (this.isBasicLoaded)) {return}
        const registerEntries = await this._fetchRegisterEntries();
        this.assetNameToDirFetchUrl = this._getAssetNameToDirFetchUrl({
            registerEntries: registerEntries
        });
        
        this.isBasicLoaded = true;
    }

    async basicReload () {
        this.basicReload = false;
        
        const assetLoadState = this.isLoaded;
        this.isLoaded = false;
        await this.basicLoad();
        
        this.isLoaded = assetLoadState;
    }

    async load () {
        if (!this.isBasicLoaded) {await this.basicLoad()}

        for (let assetName in this.assetNameToDirFetchUrl) {
            const assetDefObj = new AssetDef({
                fileFetchUrl: this.assetNameToDirFetchUrl[assetName],
                translator: this.translator,
                reader: this.reader
            });
            await assetDefObj.load();
            this.assetNameToAssetDef[assetName] = assetDefObj;
        }
        this.isLoaded = true;
    }

    async reload () {
        this.isLoaded = false;
        await this.load()
    }

    async _fetchRegisterEntries () {
        return await getRegisterFromDir({
            dirUrl: this.dirFetchUrl
        });
    }

    _getAssetNameToDirFetchUrl ({registerEntries}) {
        const assetNameToDirFetchUrl = {}
        for (let assetPath of registerEntries) {
            const assetName = Utility.getAssetNameFromFileUrl({
                fileUrl: assetPath
            });
            assetNameToDirFetchUrl[assetName] = assetPath;
        }
        return assetNameToDirFetchUrl;
    } 
}


class Utility {
    static getAssetNameFromFileUrl ({fileUrl}) {
        const pathParts = fileUrl.split("/");
        let assetName = "";
        if (fileUrl.endsWith("/")) {
            assetName = pathParts[pathParts.length-2];
        }

        else {
            assetName = pathParts[pathParts.length-1];
        }

        // Removing file extension from assetname
        const assetNameParts = assetName.split(".");
        assetName = "";
        for (let i=0; i < assetNameParts.length-1; i++) {
            assetName += assetNameParts[i];
            if (i !== assetNameParts.length-2) {
                assetName += ".";
            }
        }
        return assetName;
    }
}