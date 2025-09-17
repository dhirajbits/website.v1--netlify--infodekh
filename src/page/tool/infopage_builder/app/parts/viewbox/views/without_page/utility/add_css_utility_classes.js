export function addCSSUtilityClasses ({styleElmtWrapper}) {
   const styleElmt = document.createElement("style");
   styleElmt.classList.add("--VBCC--viewUtilityClasses--");

   styleElmt.innerHTML = `
      .--VBCC--viewUtilityClass--textHook--:hover {
         outline: 1px solid green;
      }
      
      .--VBCC--viewUtilityClass--textHook--withEditBtn-- {
         position: relative;
      }

      .--VBCC--viewUtilityClass--textHook--withEditBtn--:after {
         content: "edit";
         position: absolute;
         font-size: 0.7rem;
         background-color: var(--COLOR--light--dark, whitesmoke);
         color: var(--COLOR--dark, black);
         right: 0;
         top: 0;
         display: inline-block;
         padding: 0.2rem 0.4rem;
      }
   `;
   
   styleElmtWrapper.appendChild(styleElmt);
}