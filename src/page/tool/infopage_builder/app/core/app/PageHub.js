import { MovieUpdatePage } from "../page/MovieUpdatePage.js";


export class PageHub {
    static pageTypeToPageClass = {
        "MovieUpdate": MovieUpdatePage
    };

    static getPageClass ({pageType}) {
        return this.pageTypeToPageClass[pageType];
    }
}