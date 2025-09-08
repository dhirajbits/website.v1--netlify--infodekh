import { InfopageBuilderApp } from "../app/exports.js";
import { Cmpt } from "../app/core/cmpt/Cmpt.js";

const app = new InfopageBuilderApp();
await app.loadTemplates();

const movieTmptSet = app.tmptHub.getTmptSet({
    tmptSetName: "movie_update_article"
});

const helloworldTmpt = await movieTmptSet.getTmpt({
    tmptName: "helloworld",
    groupName: "listing"
});

// console.log(helloworldTmpt)

document.querySelector("body").appendChild(helloworldTmpt.bodyElmt)
document.querySelector("body").appendChild(helloworldTmpt.style.bodyElmt)

const cmpt = new Cmpt({tmpt: await app.tmptHub.getTmptByRefId({tmptRefId: "movie_update_article.listing.helloworld"}), tmptHub: app.tmptHub});

cmpt.fitInsideElmt({elmt: document.querySelector("body")})