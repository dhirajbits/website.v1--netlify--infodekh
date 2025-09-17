import { UICmpt } from "../../../utility/ui_cmpt/UICmpt.js";

export class IntractiveDataHook {
   constructor({ cmptHook, panel}) {
      this.cmptHook = cmptHook; //CmptHookDoc
      this.panel = panel; //Panel
      
      if (this.cmptHook.type.toLowerCase() !== "data") return;
      this.cmptHook.bodyElmt.classList.add("--VBCC--viewUtilityClass--textHook--");


      this.cmptHook.bodyElmt.onmouseover = (event) => {
         this.addEditBtnInCmptHookBodyElmt();
         event.stopPropagation();
      }

      this.cmptHook.bodyElmt.onmouseleave = (event) => {
         this.removeEditBtnFromCmptHookBodyElmt();
         event.stopPropagation();
      }
      // console.log(this.cmptHook.bodyElmt )
   }


   addEditBtnInCmptHookBodyElmt() {
      if (this.isEditBtnAdded) return;

      const editBtnElmt = document.createElement("div");
      editBtnElmt.classList.add("--VBCC--viewUtilityClass--textHook--editBtn--");
      editBtnElmt.innerText = "edit";
      editBtnElmt.onclick = (event) => {
         console.log("Edit button clicked.");
         event.stopPropagation();
         this.openTextEditPanel();
      }

      this.cmptHook.bodyElmt.style.position = "relative";
      editBtnElmt.style.position = "absolute";
      editBtnElmt.style.right = "0";
      editBtnElmt.style.top = "0";
      editBtnElmt.style.fontSize = "0.7rem";
      editBtnElmt.style.fontFamily = "'Quicksand', sans-serif";
      editBtnElmt.style.backgroundColor = "var(--COLOR--light--dark, whitesmoke)";
      editBtnElmt.style.display = "inline-block";
      editBtnElmt.style.padding = "0.2rem 0.4rem";
      editBtnElmt.style.color = "var(--COLOR--dark, black)";
      editBtnElmt.style.cursor = "pointer";
      editBtnElmt.style.lineHeight = "1rem";
      editBtnElmt.style.fontWeight = "normal";
      editBtnElmt.style.letterSpacing = "0px";

      this.cmptHook.bodyElmt.appendChild(editBtnElmt);
      this.isEditBtnAdded = true;
   }

   removeEditBtnFromCmptHookBodyElmt() {
      if (!this.isEditBtnAdded) return;
      const editBtnElmt = this.cmptHook.bodyElmt.querySelector(".--VBCC--viewUtilityClass--textHook--editBtn--");
      if (editBtnElmt) {
         this.cmptHook.bodyElmt.removeChild(editBtnElmt);
      }
      this.isEditBtnAdded = false;
   }

   updateTextContent({text}) {
      this.removeEditBtnFromCmptHookBodyElmt();
      this.cmptHook.attacher.attach(text)
      this.addEditBtnInCmptHookBodyElmt();
      this.panel.Page.mtd__savePageToLocalStorage();
   }

   openTextEditPanel() {
      const cmpt = new UICmpt({
         name: "textEditPanel",
         tagname: "div",
      });

      console.log(`start${this.cmptHook.attacher.attachedText}end`)

      cmpt.html = `
         <div class="textEditPanel--wrapper--">
            <textarea class="textEditPanel--textarea--"></textarea>
            <div class="textEditPanel--btns--">
               <button class="textEditPanel--btn--save--">Save</button>
               <button class="textEditPanel--btn--cancel--">Cancel</button>
            </div>
         </div>
      `;

      cmpt.bodyElmt.querySelector("textarea").value = this.cmptHook.attacher.attachedText;

      cmpt.css = `
         // #----- {
         //    position: fixed;
         //    top: 0;
         //    left: 0;
         //    width: 100vw;
         //    height: 100vh;
         //    background-color: #000000a1;
         //    display: flex;
         //    justify-content: center;
         //    align-items: center;
         //    z-index: 10000;
         // }

         #----- {
            // width: 400px;
            // height: 250px;

            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-60%, -50%);

            background-color: var(--COLOR--dark--dark, #222);
            color: var(--COLOR--light--dark, #eee);
            border: 2px solid var(--COLOR--accent2, #178f47);
            // border: 2px solid var(--COLOR--dark--light, #555);
            border-radius: 0.5rem;
            box-shadow: 0px 0px 50px #00000082;
            z-index: 10001;
            // padding: 2rem;
            padding: 0.5rem;

            // display: flex;
            // flex-direction: column;
         }

         #----- .textEditPanel--textarea-- {
            width: 500px;
            height: 300px;
            padding: 1rem;
            outline: none;
            border: none;
            scrollbar-width: none;
         }

         #----- button {
            background-color: var--COLOR--light--dark, whitesmoke);
            // background-color: var(--COLOR--dark--dark, #222);
            color: var(--COLOR--dark--dark, #222);
            border: none;
            padding: 0.2rem 0.5rem;
            margin-top: 1rem;
            border-radius: 0.3rem;
            cursor: pointer;
         }

         #----- .textEditPanel--btns-- {
            padding-right: 1rem;
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            padding: 1rem;
            padding-top: 0;
         }
      `;


      cmpt.addHook({
         name: "cancelBtn",
         selector: "#----- .textEditPanel--btn--cancel--",
         type: UICmpt.HOOKTYPE.GRAB,
      });

      cmpt.addHook({
         name: "saveBtn",
         selector: "#----- .textEditPanel--btn--save--",
         type: UICmpt.HOOKTYPE.GRAB,
      });

      cmpt.hook("cancelBtn").bodyElmt.onclick = (event) => {
         this.closeTextEditPanel({cmpt});
         event.stopPropagation();
      }

      cmpt.hook("saveBtn").bodyElmt.onclick = (event) => {
         const textareaElmt = cmpt.bodyElmt.querySelector(".textEditPanel--textarea--");
         const textValue = textareaElmt.value;
         this.updateTextContent({text: textValue});
         this.closeTextEditPanel({cmpt});
         this.removeEditBtnFromCmptHookBodyElmt();
         event.stopPropagation();
      }

      cmpt.putInsideElmtWithStyle({elmt: document.body});

      cmpt.bodyElmt.onclick = (event) => {
         event.stopPropagation();
      }

      // document.onclick = (event) => {
      //    console.log("Body clicked.");
      //    this.closeTextEditPanel({cmpt});
      //    document.body.onclick = null;
      //    event.stopPropagation();
      // }
   }



   closeTextEditPanel({cmpt}) {
      if (cmpt && cmpt.bodyElmt && cmpt.bodyElmt.parentElement) {
         cmpt.bodyElmt.parentElement.removeChild(cmpt.bodyElmt);
      }
   }
}