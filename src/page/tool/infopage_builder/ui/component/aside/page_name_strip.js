import { Cmpt } from "../../tools/cmpt/Cmpt.js";


export function pageNameStrip () {
    const cmpt = new Cmpt({});

    cmpt.htmlCode = `
    <div>
        <div>
            <div class="pagename">
                Untitled
            </div>
            <div class="articleTypeBadge">
            </div>
        </div>/
    </div>
    `;

    cmpt.styleCode = `
    #----- {
        padding: var(--_WIDTH--aside-padding);
        padding-block: 1rem;
        border-bottom: 2px solid var(--_COLOR--aside-strip-border);
    }

    #----- > div {
        display: flex;
        justify-content: space-between;
    }

    #----- .pagename {
        font-weight: bolder;
        min-width: 140px;
        max-width: 140px;
        overflow: auto;
        scrollbar-width: none;
        text-wrap: nowrap;
    }

    #----- .pagename input {
        color: white;
        max-width: 160px;
        
        padding: 0.3rem 0.8rem;
        padding-left: var(--_WIDTH--aside-padding);
        padding-bottom: 0.4rem;
        margin-left: calc(-1 * var(--_WIDTH--aside-padding));
        
        position: absolute;
        border: none;
        transform: translateY(-5px);
        background-color: #222222;
    }
    `;

    cmpt.addHook({
        name: "pageName",
        cssSelectorForHookElmt: "#----- .pagename",
        type: "data",
    });

    cmpt.addHook({
        name: "articleTypeBadge",
        cssSelectorForHookElmt: "#----- .articleTypeBadge",
        type: "cmpt"
    });

    const pageNameChangeHndr = () => {
        const hook = cmpt.hooks["pageName"];
        const pageName = hook.bodyElmt.textContent;

        hook.bodyElmt.innerHTML = `
        <input type="text" id="pageName" value="${pageName}">
        `;

        hook.bodyElmt.querySelector("input").focus()
        hook.bodyElmt.querySelector("input").setSelectionRange(0, pageName.length)
        hook.bodyElmt.onclick = null;
        hook.bodyElmt.querySelector("input").onkeydown = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                hook.value = hook.bodyElmt.querySelector("input").value;
            }
            hook.bodyElmt.onclick = pageNameChangeHndr;
        }
    }

    cmpt.hooks["pageName"].bodyElmt.onclick = pageNameChangeHndr;
    return cmpt;

    
}