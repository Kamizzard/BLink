let myLinks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const linksFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") )
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn");
const undoBtn = document.getElementById("undo-btn")

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}

tabBtn.addEventListener("click", function(){    
    browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
        let tab = tabs[0]
        myLinks.push(tab.url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })
})

function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

undoBtn.addEventListener("click", function(){
    myLinks.pop()
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
})

inputBtn.addEventListener("click", function() {
    myLinks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLinks) )
    render(myLinks)
})