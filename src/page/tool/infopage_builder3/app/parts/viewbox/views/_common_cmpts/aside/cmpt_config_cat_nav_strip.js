import { UICmpt } from "../../../utility/ui_cmpt/UICmpt.js";

export function createCmptConfigCatNavStripCmpt () {
    const cmpt = new UICmpt({
        name: "cmptConfigCatNavStrip",
        tagname: "section",
    });

    cmpt.html = `
        <div class="configCat configCatStructure selected">Structure</div>
        <div class="configCat configCatStyle">Style</div>
        <div class="configCat configCatHookStyle">Hook</div>
        <div class="configCat configCatPageMeta">Meta</div>
    `;

    cmpt.css = `
        #----- {
            padding: var(--_WIDTH--aside-padding);
            border-bottom: 1px dashed var(--_COLOR--aside-strip-border);
            display: flex;
            gap: 1rem;
        }

        #----- > div {
            color: #656565;
            cursor: pointer;
            transition: color 80ms;
        }

        #----- > div.selected {
            color: #C0C0C0;
        }
    `;

    cmpt.addHook({
        name: "configCatStructure",
        selector: "#----- .configCatStructure",
        type: UICmpt.HOOKTYPE.GRAB,
    });

    cmpt.addHook({
        name: "configCatStyle",
        selector: "#----- .configCatStyle",
        type: UICmpt.HOOKTYPE.GRAB,
    });

    cmpt.addHook({
        name: "configCatHookStyle",
        selector: "#----- .configCatHookStyle",
        type: UICmpt.HOOKTYPE.GRAB,
    });

    cmpt.addHook({
        name: "configCatPageMeta",
        selector: "#----- .configCatPageMeta",
        type: UICmpt.HOOKTYPE.GRAB,
    });

    for (let hook of cmpt.hooks) {
        hook.bodyElmt.onclick = () => {
            for (let _hook of cmpt.hooks) {
                _hook.bodyElmt.classList.remove("selected");
            }
            hook.bodyElmt.classList.add("selected");
        }
    }

    return cmpt;
}