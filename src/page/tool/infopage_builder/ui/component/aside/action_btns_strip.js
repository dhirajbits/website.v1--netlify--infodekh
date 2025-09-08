import { Cmpt } from "../../tools/cmpt/Cmpt.js";


export function actionBtnsStrip() {
    const cmpt = new Cmpt({});

    cmpt.htmlCode = `
    <div>
        <button class="previewBtn">Preview</button>
        <button class="saveBtn">Save</button>
        <button class="moreBtn">:More:</button>
    </div>
    `;

    cmpt.styleCode = `
    #----- {
        display: flex;
        gap: 0.75rem;
        color: black;
        padding: var(--_WIDTH--aside-padding);
        font-size: 1rem;

    }

    #----- button {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        background-color: #D9D9D9;
        border: none;
    }

    #----- .previewBtn {
        background-color: #518AB8;
    }

    #----- button:hover {
        filter: brightness(150%);
    }

    #----- button:active {
        filter: brightness(100%);
    }
    `;

    cmpt.addHook({
        name: "previewBtn",
        cssSelectorForHookElmt: "#----- .previewBtn",
        type: "grab",
    });

    cmpt.addHook({
        name: "saveBtn",
        cssSelectorForHookElmt: "#----- .saveBtn",
        type: "grab",
    });

    cmpt.addHook({
        name: "moreBtn",
        cssSelectorForHookElmt: "#----- .moreBtn",
        type: "grab",
    });

    return cmpt;
}