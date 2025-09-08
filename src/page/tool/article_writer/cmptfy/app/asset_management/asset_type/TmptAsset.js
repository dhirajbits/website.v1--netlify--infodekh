import { AssetType } from "./AssetType.js";
import { TmptTranslator } from "../translator/TmptTranslator.js";
import { TmptReader } from "../reader/TmptReader.js";


export class TmptAsset extends AssetType {
    constructor ({dirUrl}) {
        super({
            dirUrl: dirUrl,
            translator: TmptTranslator,
            reader: TmptReader
        });
    }
}