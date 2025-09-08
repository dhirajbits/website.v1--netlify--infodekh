import { TmptPool } from "../page/page_component/TmptPool.js";
import { TmptHub } from "../tmpthub/TmptHub.js";

const tmpthub = new TmptHub({
    dirFetchUrl: "app/template"
});
await tmpthub.basicLoad();

const tmptpool = new TmptPool({
    tmptsets : ["movie_update_article"],
    tmpthub : tmpthub
});
