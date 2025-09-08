let categories = document.querySelectorAll("#secondaryCategoryNav .category")


for (let category of categories) {
    category.onclick = function (event) {
        for (let cat of categories) {
            cat.classList.remove("selected")
        }
        event.target.classList.add("selected")
    }
}