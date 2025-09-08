let mainNavOptions = document.querySelectorAll("#secondaryMainNav .secondaryMainNavOption")

console.log(mainNavOptions)
for (let navOption of mainNavOptions) {
    navOption.onclick = function (event) {
        for (let _navOption of mainNavOptions) {
            _navOption.classList.remove("selected")
        }

        
        let currentElement = event.target
        for (let i=0; i < 100; i++) {
            if (currentElement.classList.contains("secondaryMainNavOption")){
                currentElement.classList.add("selected");
                break
            }
            currentElement = currentElement.parentElement
        }
        

        
        
        
    }
}