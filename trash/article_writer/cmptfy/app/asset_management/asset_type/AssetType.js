import { getRegisterFromDir } from "../../utility/fetch_file.js";
import { removeEmptyStringFromArray } from "../../utility/array.js";
import { AssetDefSet } from "../AssetDefSet.js";



export class AssetType {
    constructor ({dirUrl, translator, reader}) {
        this.dirFetchUrl = dirUrl;
        this.assetDefSetNameToDirpath = {};
        this.assetDefSetNameToAssetDefSet = {};

        this.translator = translator;
        this.reader = reader;

        this.isBasicLoaded = false;
        this.isLoaded = false;
    }

    async basicLoad() {
        if (this.isBasicLoaded) {return}
        // Reading register of asset-type directory
        const assetDefSetDirpaths = await getRegisterFromDir({
            dirUrl: this.dirFetchUrl
        });

        // Getting setname from asset-set dirpath
        for (let path of assetDefSetDirpaths) {
            let pathParts = path.split("/");
            pathParts = removeEmptyStringFromArray({arr: pathParts});
            const setDirname = pathParts[pathParts.length-1];
            const setName = setDirname.replace("set.", "");
            this.assetDefSetNameToDirpath[setName] = path;
        }
        this.isBasicLoaded = true;
    }

    async basicReload() {
        this.isBasicLoaded = false;
        return await this.basicLoad();
    }

    
    

    async getAssetDefSet ({assetDefSetName}) {
        if (assetDefSetName in this.assetDefSetNameToDirpath) {
            if (assetDefSetName in this.assetDefSetNameToAssetDefSet) {
                return this.assetDefSetNameToAssetDefSet[assetDefSetName];
            }

            else {
                const assetDefSet = new AssetDefSet({
                    dirFetchUrl: this.assetDefSetNameToDirpath[assetDefSetName],
                    translator: this.translator,
                    reader: this.reader
                });
                await assetDefSet.load();
                this.assetDefSetNameToAssetDefSet[assetDefSetName] = assetDefSet;
                return assetDefSet;
            }
        }

        else {
            console.error(`Asset set '${assetDefSetName}' not found.`);
        }

        return null;
    }

    
    async getAssetDef ({assetDefSetName, assetName}) {
        let assetDef = null;

        const assetDefSet = await this.getAssetDefSet({
            assetDefSetName: assetDefSetName
        });

        if (assetDefSet) {
            if (assetName in assetDefSet.assetNameToAssetDef) {
                assetDef = assetDefSet.assetNameToAssetDef[assetName];
            }

            else {
                console.error(`Asset of asset name: '${assetName}' not found.`);
            }
        }
        return assetDef;
    }

    async getAssetDefBlob ({assetDefSetName, assetName}) {
        return (await this.getAssetDef({
            assetDefSetName: assetDefSetName,
            assetName: assetName
        })).assetDefBlob;
    }
}