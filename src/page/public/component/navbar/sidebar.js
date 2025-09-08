let body = document.querySelector("#body")
let bodycover = document.querySelector("#bodycover");
let sidebar = document.querySelector("#navbar .sidebar")
let sidebarOpenBtn = document.querySelector("#navbar .primaryNavOptions .navMenuBtn")
let sidebarCloseBtn = sidebar.querySelector(".sidebarCloseBtn")


let isSidebarOpened = false;


function openSidebar(event) {
    sidebar.style.transform = "translateX(0%)"
    isSidebarOpened = true
    bodycover.style.transform = "translate(0%)"
    body.style.overflowY = "clip";
    event.stopPropagation()
}


function closeSidebar() {
    sidebar.style.transform = "translateX(100%)"
    isSidebarOpened = false

    bodycover.style.transform = "translate(100%)"
    body.style.overflowY = "auto";
}


sidebarOpenBtn.onclick = openSidebar
sidebarCloseBtn.onclick = closeSidebar


body.addEventListener("click", function(){
    if (isSidebarOpened) {
        closeSidebar()
    }
})

sidebar.onclick = function(event) {
    event.stopPropagation()
}



// Automatic selecting sidebar option a/c to page url
const sidebarOptions = sidebar.querySelectorAll(".sidebarOption")
const firstPartOfUrlPath = getFirstPartOfActualUrl(window.location.href);

for (let sidebarOption of sidebarOptions) {
    let navRef = getFirstPartOfActualUrl(sidebarOption.firstElementChild.href)
    if ((navRef === "infopage") && (navRef !== firstPartOfUrlPath)) {
        navRef = "infopages";
    }
    else if ((navRef === "infopages") && (navRef !== firstPartOfUrlPath)) {
        navRef = "infopage";
    }

    if ((navRef === firstPartOfUrlPath) 
        && (!sidebarOption.classList.contains("selected"))) {
        sidebarOption.classList.add("selected");
    }
}





function getFirstPartOfActualUrl(url) {
    const regex = /http[s]*:\/\/[^\/]+\/(src\/page)*[\/]*/
    url = url.replace(regex, "")
    return url.split("/")[0] || null
}





