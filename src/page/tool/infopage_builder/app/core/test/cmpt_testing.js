import { Cmpt } from "../cmpt/Cmpt.js";
import { TmptPool } from "../page/page_component/TmptPool.js";
import { TmptHub } from "../tmpthub/TmptHub.js";


const tmpthub = new TmptHub({
    dirFetchUrl: "app/template"
});

await tmpthub.basicLoad();


const tmptpool = new TmptPool({
    tmptsets: ["movie_update_article"],
    tmpthub: tmpthub
});

const cmpt = new Cmpt({
    tmpt: await tmpthub.getTmptByRefId({
        tmptRefId: "movie_update_article..helloworld"
    })
});
await cmpt.load();


cmpt.fitInsideElmtWithCmptAndTmptStyle({elmt: document.querySelector("body")})
console.log(cmpt.styleConfig);
console.log(cmpt.styleConfig.bodyElmt);

cmpt.styleConfig.setFieldValue({
    fieldName: "color",
    value: "black",
    render: true
});


cmpt.style.addDeclerations({
    "color" : "yellow"
}, true)

console.log(cmpt.hooks)
console.log(await tmptpool.getAllTmpts())
// cmpt.styleConfig.updateBodyElmt();
