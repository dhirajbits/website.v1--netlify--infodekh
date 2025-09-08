import { TmptHub } from "../tmpthub/TmptHub.js";
import { PageHub } from "./PageHub.js";


export class InfopageBuilderApp {
    constructor () {
        this.refIdToPage = {}
        this.tmptHub = new TmptHub({
            dirFetchUrl: "./app/template"
        });
    }

    async zInit () {
        return await this.tmptHub.zInit();
    }

    async zCreateNewPage ({pageType}) {
        const pageClass = PageHub.getPageClass({pageType: pageType});
        
        if (!pageClass) {
            throw new Error(`Page: '${pageType} not defined.`)
        }

        else {
            const page = await pageClass.zConstructor({
                tmpthub: this.tmptHub
            });
            await page.zInit();
            return page;
        }
    }


    createNewPageFromJSON () {}
    
    getPage () {}
    deletePage () {}
}