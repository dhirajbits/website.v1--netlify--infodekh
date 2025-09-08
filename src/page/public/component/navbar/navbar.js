import "./sidebar.js"


const ELMT = {
    navOptionBox: null,
    infopagesBtnNavOption: null,
    primaryNavOptions: null,
};
getELMT(ELMT);


// Selecting nav option of primary navbar
const firstPartOfUrlPath = getFirstPartOfActualUrl(window.location.href);

for (let navOption of ELMT.primaryNavOptions) {
    if (navOption.classList.contains("navMenuBtn")){ continue; }
    let navRef = getFirstPartOfActualUrl(navOption.firstElementChild.href);
    

    if ((navRef === "infopage") && (navRef !== firstPartOfUrlPath)) {
        navRef += "s";
    }
    else if ((navRef === "infopages") && (navRef !== firstPartOfUrlPath)) {
        navRef = "infopage";
    }

    if ((navRef === firstPartOfUrlPath) 
        && (!navOption.classList.contains("selected"))){
            navOption.classList.add("selected");
            break;
    }
}


// Selecting infopages btn in primary navbar (visible on mobile)
let infopagesBtnNavOptionHrefFirstPart = getFirstPartOfActualUrl(ELMT.infopagesBtnNavOption.parentElement.href)
if ((infopagesBtnNavOptionHrefFirstPart === "infopage") 
    && (infopagesBtnNavOptionHrefFirstPart !== firstPartOfUrlPath)) {
    infopagesBtnNavOptionHrefFirstPart = "infopages";
}
else if ((infopagesBtnNavOptionHrefFirstPart === "infopages") 
    && (infopagesBtnNavOptionHrefFirstPart !== firstPartOfUrlPath)) {
    infopagesBtnNavOptionHrefFirstPart = "infopage";
}

if (infopagesBtnNavOptionHrefFirstPart === firstPartOfUrlPath) {
    if (!ELMT.infopagesBtnNavOption.classList.contains("selected")){
        ELMT.infopagesBtnNavOption.classList.add("selected");
    }
}







function getFirstPartOfActualUrl(url) {
    const regex = /http[s]*:\/\/[^\/]+\/(src\/page)*[\/]*/
    url = url.replace(regex, "")
    return url.split("/")[0] || null
}


function getELMT(ELMT) {
    ELMT.navOptionBox = document.querySelector("#navbar .navOptions");
    ELMT.infopagesBtnNavOption = ELMT.navOptionBox.querySelector(".infoblogsNavOption");
    ELMT.primaryNavOptions = ELMT.navOptionBox.querySelectorAll(".primaryNavOptions .navOption");
};


