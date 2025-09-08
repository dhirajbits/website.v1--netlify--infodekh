import { CmptAsset } from "./asset_type/CmptAsset.js";
import { TmptAsset } from "./asset_type/TmptAsset.js";



export class AssetHub {
    static CMPT_ASSET_DIR_FETCH_PATH = "./cmptfy/asset/cmpt";
    static TMPT_ASSET_DIR_FETCH_PATH = "./cmptfy/asset/tmpt";


    constructor () {
        this.cmpt = new CmptAsset({
            dirUrl: AssetHub.CMPT_ASSET_DIR_FETCH_PATH
        });

        this.tmpt = new TmptAsset({
            dirUrl: AssetHub.TMPT_ASSET_DIR_FETCH_PATH
        });
    }

    async basicLoad () {
        await this.cmpt.basicLoad();
        await this.tmpt.basicLoad();
    }
}