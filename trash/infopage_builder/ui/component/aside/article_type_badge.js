import { Cmpt } from "../../tools/cmpt/Cmpt.js";


export function articleTypeBadge () {
    const cmpt = new Cmpt({});

    cmpt.htmlCode = `
    <div>
        <p>ArticleType</p>
    </div>
    `;

    cmpt.styleCode = `
    #----- {
        text-align: left;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border-right: 2px solid #9E9E9E;
        background-color: #282828;
        font-size: 0.75rem;
        padding-left: 1.5em;
        padding-right: 0.5rem;
        padding-block: 0.5rem;
        display: inline;
    }

    #-----  p {
        display: inline;
    }
    `;

    // Adding hook
    cmpt.addHook({
        name: "articleType",
        cssSelectorForHookElmt: `.${cmpt.idLikeClassName} p`,
        type: "data"
    });

    return cmpt;
}