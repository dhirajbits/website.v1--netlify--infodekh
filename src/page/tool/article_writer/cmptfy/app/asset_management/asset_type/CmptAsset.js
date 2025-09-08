import { AssetType } from "./AssetType.js";
import { CmptTranslator } from "../translator/CmptTranslator.js";
import { CmptReader } from "../reader/CmptReader.js";


export class CmptAsset extends AssetType {
    constructor ({dirUrl}) {
        super({
            dirUrl: dirUrl,
            translator: CmptTranslator,
            reader: CmptReader
        });
    }
}