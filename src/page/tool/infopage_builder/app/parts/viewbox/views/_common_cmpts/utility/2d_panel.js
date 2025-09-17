import { UICmpt } from "../../../utility/ui_cmpt/UICmpt.js";

/*
[
   {
      id: "unique name (use as hook name)",
      type: "catogoryOption",
      optionName: "name of option that is visible to user",
      value : [
         {
            id: "unique name (use as hook name)",
            type: "option",
            optionName: "name of option that is visible to user.",
            isMutued: false,
            callback: function() {},
            callbackArgs: {},
            callbackOnce: false,
         },
         {
            id: "unique name (use as hook name)",
            type: "option",
            optionName: "name of option that is visible to user.",
            isMutued: false,
            callback: function() {},
            callbackArgs: {},
            callbackOnce: false,
         }
      ]
   },
   {
      ...
   }
]
*/

export function create2dPanelCmpt({ _2dPanelDefArr }) {
	const cmpt = new UICmpt({
		name: "_2dPanel",
		tagname: "div",
	});

	cmpt.html = `
      <div class="--VBCC--catagoryPanel--"></div>
      <div class="--VBCC--optionPanel--"></div>
   `;

	cmpt.css = `
      #----- {
         background-color: var(--COLOR--dark--dark, black);
         border: 2px solid #303030ff;
         border-radius: 0.5rem;
         box-shadow: 0px 0px 50px #00000082;
         opacity: 0.97;
         width: 500px;
         display: flex;
         position: absolute;
         left: 50%;
         top: 50%;
         
         transform: translateX(-50%) translateY(-70%);
         min-height: 200px;
         // padding: 0 0.5rem;
         overflow: hidden;
      }

      #-----  .--VBCC--catagoryPanel-- {
         width: 40%;
         height: 100%;
         min-height: 200px;
         border-right: 1px solid #3d3d3d8f;
         padding: 1rem 0.4rem;
         flex-grow: 1;
         padding-inline: 1rem;

      }

      #-----  .--VBCC--optionPanel-- {
         width: 50%;
         height: 100%;
         min-height: 200px;

         padding: 1rem 0.4rem;
         flex-grow: 1;
         padding-inline: 1rem;
         background-color:var(--COLOR--dark, #171717ff)
      }
   `;

	cmpt.addHook({
		name: "catagoryPanel",
		selector: "#----- .--VBCC--catagoryPanel--",
		type: UICmpt.HOOKTYPE.CMPT,
	});

	cmpt.addHook({
		name: "optionPanel",
		selector: "#----- .--VBCC--optionPanel--",
		type: UICmpt.HOOKTYPE.CMPT,
	});

	const catagoryPanelCmpt = createCatagoryPanelUICmpt({
		_2dPanelDefArr: _2dPanelDefArr,
		optionPanelHolderHook: cmpt.hook("optionPanel"),
	});

	cmpt.hook("catagoryPanel").attach(catagoryPanelCmpt);
	return cmpt;
}

function createCatagoryPanelUICmpt({ _2dPanelDefArr, optionPanelHolderHook }) {
	const cmpt = new UICmpt({
		name: "catagoryPanel",
		tagname: "div",
	});

	cmpt.css = `
      #----- {
         width: 100%;
         // background-color: red;
      }
   `;

	cmpt.addHook({
		name: "self",
		selector: "#-----",
		type: UICmpt.HOOKTYPE.CMPT_LIST,
	});

	const optionCatIdToOptionPanelUICmpt = {};

	for (let catagoryOption of _2dPanelDefArr) {
		if (catagoryOption.type !== "catagoryOption") continue;
		const optionItemCmpt = createOptionItemUICmpt({
			optionItemDefDict: {
				id: catagoryOption.id,
				type: "option",
				optionName: catagoryOption.optionName,

				callback: () => {
					for (let _optionItemCmpt of cmpt.hook().childUICmpts) {
						if (
							_optionItemCmpt.bodyElmt.firstElementChild.classList.contains(
								"selected"
							)
						) {
							_optionItemCmpt.bodyElmt.firstElementChild.classList.remove(
								"selected"
							);
						}
					}
					const optionPanelCmpt =
						optionCatIdToOptionPanelUICmpt[catagoryOption.id];

					if (optionPanelHolderHook.firstChild === optionPanelCmpt)
						return;

					optionPanelHolderHook.detach();

					if (optionPanelCmpt) {
						optionPanelHolderHook.attach(
							optionCatIdToOptionPanelUICmpt[catagoryOption.id]
						);
					}
				},
			},
		});

		cmpt.hook().attach(optionItemCmpt);
		optionCatIdToOptionPanelUICmpt[catagoryOption.id] =
			createOptionPanelUICmpt({optionDefArr: catagoryOption.value});
	}

	return cmpt;
}

function createOptionPanelUICmpt({optionDefArr}) {
	const cmpt = new UICmpt({
		name: "optionPanel",
		tagname: "div",
	});


	cmpt.addHook({
      name: "self",
      selector: "#-----",
      type: UICmpt.HOOKTYPE.CMPT_LIST,
   });

   for (let optionDef of optionDefArr) {
      const optionCmpt = createOptionItemUICmptWithLightHoverEffect({
         optionItemDefDict: optionDef,
      });
      cmpt.hook().attach(optionCmpt);
   }

	return cmpt;
}

function createOptionItemUICmptWithLightHoverEffect({optionItemDefDict}) {
   const cmpt = createOptionItemUICmpt({optionItemDefDict});
   const className = `--VBCC--${optionItemDefDict.id.replaceAll(".", "___")}`;
   cmpt.css = `
      #----- .${className}.selected,
      #----- .${className}:hover {
         background-color: #545454ff;
         color: inherit;
      }
   `;
   return cmpt;
}

function createOptionItemUICmpt({ optionItemDefDict }) {
	if (optionItemDefDict.type !== "option") return;

	const cmpt = new UICmpt({
		name: "option",
		tagname: "div",
	});

   const className = `--VBCC--${optionItemDefDict.id.replaceAll(".", "___")}`;

	cmpt.html = `
         <div class="${className}">${optionItemDefDict.optionName}</div>
      `;
      
	cmpt.css = `
         #----- {
            display: flex;
            align-items: center;
            gap: 1rem;
            width: 100%;
            margin-block: 0.3rem;
            cursor: pointer;
         }
   
         #----- .${className} {
            color: var(--COLOR--light--dark);
            padding-block: 0.3rem;
            padding-inline: 0.6rem;
            border-radius: 0.4rem;
            width: 100%;
         }
   
         #----- .${className}.selected,
         #----- .${className}:hover {
            background-color: var(--COLOR--accent2);
            color: var(--COLOR--dark--dark);
         }
   
         #----- .${className}:active{
            filter: brightness(150%);
         }
   
      `;

	cmpt.addHook({
		name: "self",
		selector: "#-----",
		type: UICmpt.HOOKTYPE.GRAB,
	});

	// Setting callback
	if (!optionItemDefDict.callbackArgs) optionItemDefDict.callbackArgs = {};

	cmpt.bodyElmt.onclick = (event) => {
		if (optionItemDefDict.callback)
			optionItemDefDict.callback({
				event,
				...optionItemDefDict.callbackArgs,
			});
		cmpt.bodyElmt.firstElementChild.classList.add("selected");
		if (optionItemDefDict.callbackOnce) cmpt.bodyElmt.onclick = null;
	};
	return cmpt;
}
