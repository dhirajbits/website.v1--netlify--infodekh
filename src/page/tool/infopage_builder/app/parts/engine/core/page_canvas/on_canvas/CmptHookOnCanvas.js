export class CmptHookOnCanvas {
	constructor({ cmptHookDoc }) {
		this.cmptHookDoc = cmptHookDoc; //CmptHookDoc
		this.emptyHookPlaceholderElmt = null; //:HtmlElmt
      this.isEHPEPresent = false;
      
      this.emptyHookPlaceholderElmt = EmptyHookPlaceholderElmtUtility.createEmptyHookPlaceHolderElmt();
      
      this.addEmptyHookPlaceholderElmt();
	}

	addEmptyHookPlaceholderElmt() {
		if (this.isEHPEPresent) return;

      if (!this.emptyHookPlaceholderElmt) {
         this.emptyHookPlaceholderElmt = EmptyHookPlaceholderElmtUtility.createEmptyHookPlaceHolderElmt();
      }

		switch (this.cmptHookDoc.type) {
			case "cmptlist":
            EmptyHookPlaceholderElmtUtility.addElmtToCmptListHolderHook({
               cmptHookDoc: this.cmptHookDoc, 
               EHPE: this.emptyHookPlaceholderElmt,
            });
            break;
			case "cmpt":
            EmptyHookPlaceholderElmtUtility.addElmtToCmptHolderHook({
               cmptHookDoc: this.cmptHookDoc, 
               EHPE: this.emptyHookPlaceholderElmt,
            });
            break;
			case "data":
            EmptyHookPlaceholderElmtUtility.addElmtToDataHolderHook({
               cmptHookDoc: this.cmptHookDoc, 
               EHPE: this.emptyHookPlaceholderElmt,
            });
            break;
			case "html":
            EmptyHookPlaceholderElmtUtility.addElmtToHtmlHolderHook({
               cmptHookDoc: this.cmptHookDoc, 
               EHPE: this.emptyHookPlaceholderElmt,
            });
            break;
         default:
            throw new Error(`Unable to add 'EmptyHookPlaceHolderElmt' --> Undefined cmptHookDoc type: '${this.cmptHookDoc.type}'.`);
		}
      this.isEHPEPresent = true;
	}

   removeEmptyHookPlaceholderElmt() {
      if (this.emptyHookPlaceholderElmt) {
         this.cmptHookDoc.bodyElmt.removeChild(this.emptyHookPlaceholderElmt);
         this.isEHPEPresent = false;
      }
   }
}

class EmptyHookPlaceholderElmtUtility {
	static createEmptyHookPlaceHolderElmt() {
		const elmt = document.createElement("div");
		elmt.classList.add("--ECC--emptyHookPlaceholderElmt--");
		elmt.innerHTML = `
         <div class="--ECC--emptyHookPlaceholderElmt--plus-icon--">
            <p>++</p>
         </div>
         <style>
            .--ECC--emptyHookPlaceholderElmt-- {
               display: flex;
               justify-content: center;
               align-items: center;
               width: 100%;
               height: 100%;
               min-height: 200px;
               min-width: 50px;
               border: 1px dashed #178f4780;
            }

            .--ECC--emptyHookPlaceholderElmt--:hover {
               border: 1px solid #178f47ff;
               transition: border 80ms;
            }
            .--ECC--emptyHookPlaceholderElmt--plus-icon-- {
               min-width: 30px;
               min-height: 30px;
               width: 35px;
               height: 35px;
               background-color: #178f47ff;
               color: black;
               display: flex;
               justify-content: center;
               align-items: center;
               cursor: default;
            }

            
            // .--ECC--emptyHookPlaceholderElmt--plus-icon--:hover {
            //    transform: scale(1.2);
            //    transition: transform 100ms;
            // }
            
            .--ECC--emptyHookPlaceholderElmt--plus-icon--:active {
               filter: brightness(150%);
            }
         </style>
      `;

		return elmt;
	}

   static addElmtToCmptListHolderHook({cmptHookDoc, EHPE}) {
      cmptHookDoc.bodyElmt.appendChild(EHPE);
   }

	static addElmtToCmptHolderHook({ cmptHookDoc, EHPE}) {
      if (cmptHookDoc.attacher.isAttached) return;
		return this.addElmtToCmptListHolderHook({ cmptHookDoc, EHPE});
	}

	static addElmtToDataHolderHook({ cmptHookDoc }) {}

	static addElmtToHtmlHolderHook({ cmptHookDoc }) {}
}
