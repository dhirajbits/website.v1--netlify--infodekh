import { Cmpt } from "../../tools/cmpt/Cmpt.js";


export function cmptConfigCatNavStrip () {
    const cmpt = new Cmpt({});

    cmpt.htmlCode = `
    <div>
        <div class="configCat configCatStructure selected">Structure</div>
        <div class="configCat configCatStyle">Style</div>
        <div class="configCat configCatHookStyle">HookStyle</div>
    </div>
    `;

    cmpt.styleCode = `
    #----- {
        padding: var(--_WIDTH--aside-padding);
        border-bottom: 1px dashed var(--_COLOR--aside-strip-border);
        display: flex;
        gap: 1rem;
    }

    #----- > div {
        color: #656565;
        cursor: pointer;
        transition: color 150ms;
    }

    #----- > div.selected {
        color: #C0C0C0;
    }
    `;

    cmpt.addHook({
        name: "configCatStructure",
        cssSelectorForHookElmt: "#----- .configCatStructure",
        type: "grab"
    });

    cmpt.addHook({
        name: "configCatStyle",
        cssSelectorForHookElmt: "#----- .configCatStyle",
        type: "grab"
    });

    cmpt.addHook({
        name: "configCatHookStyle",
        cssSelectorForHookElmt: "#----- .configCatHookStyle",
        type: "grab"
    });


    for (let hookName in cmpt.hooks) {
        const cmptHook = cmpt.hooks[hookName];
        cmptHook.bodyElmt.onclick = () => {
            for (let _hookName in cmpt.hooks) {
                const _hook = cmpt.hooks[_hookName];
                _hook.bodyElmt.classList.remove("selected");
            }
            cmptHook.bodyElmt.classList.add("selected");
        }
    }

    return cmpt;
}