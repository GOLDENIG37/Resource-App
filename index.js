let createButton = document.getElementById("button")
let modalOverlay = document.getElementById("modal-overlay")
let closeModalIcon = document.getElementById("close-modal-icon")
let resourceForm = document.getElementById("resource-form")
let nameOfWebsite = document.getElementById("nameOfWebsite")
let linkOfWebsite = document.getElementById("linkOfWebsite")
let descriptionOfWebsite = document.getElementById("descriptionOfWebsite")
let resourcesSection = document.getElementById("resources-section")

let resources = []

function revealModalOverlay(){
    modalOverlay.classList.remove ("modal-overlay")
    modalOverlay.classList.add("modal-overlay-visible")
    nameOfWebsite.focus()
}

createButton.addEventListener("click", revealModalOverlay)

function closeBackModalOverlay(){
    if(modalOverlay.classList.contains("modal-overlay-visible")){
        modalOverlay.classList.remove ("modal-overlay-visible")
        modalOverlay.classList.add("modal-overlay")
    }
}
closeModalIcon.addEventListener("click", closeBackModalOverlay)




function printResourcesOnUI(){
    resourcesSection.textContent = ""

    resources.forEach(function(allResourcesFromArray){
       let printSiteName = allResourcesFromArray.siteName
       let printSiteLink = allResourcesFromArray.siteLink
       let printSiteDescription = allResourcesFromArray.siteDescription

       
       let resourceDIV = document.createElement("div")
       resourceDIV.classList.add("resource") 

       let nameOfWebsiteDiv = document.createElement("div")
       nameOfWebsiteDiv.classList.add("name-of-website")

       let nameOfWebsiteText = document.createElement("a")
       nameOfWebsiteText.setAttribute("href", `${printSiteLink}`)
       nameOfWebsiteText.setAttribute("target", "_blank")
       nameOfWebsiteText.textContent = printSiteName

       let deleteIcon = document.createElement("i")
       deleteIcon.classList.add("fa", "fa-trash")
       deleteIcon.setAttribute(`onclick`, `deleteResource('${printSiteLink}')`)
       

       let descriptionOfWebsiteDiv = document.createElement("div")
       descriptionOfWebsiteDiv.classList.add("description-of-website")

       let descriptionText = document.createElement("p")
       descriptionText.textContent = printSiteDescription

       descriptionOfWebsiteDiv.append(descriptionText)
       nameOfWebsiteDiv.append(nameOfWebsiteText, deleteIcon)
       resourceDIV.append(nameOfWebsiteDiv, descriptionOfWebsiteDiv)
       resourcesSection.append(resourceDIV)
    })

}

function deleteResource(printSiteLink){
    resources.forEach(function(myResource, index){
        if(myResource.siteLink === printSiteLink){
            resources.splice(index, 1)
        }

    })

    localStorage.setItem("resources", JSON.stringify(resources))
    fetchResources()
}

function fetchResources(){
    if(localStorage.getItem("resources")){
       resources = JSON.parse(localStorage.getItem("resources"))
    }
    printResourcesOnUI()
}
fetchResources()





resourceForm.addEventListener("submit", handleForm)

function handleForm(event){
    event.preventDefault()
    let websiteName = nameOfWebsite.value
    let websiteURL = linkOfWebsite.value
    let description = descriptionOfWebsite.value


    if(nameOfWebsite.value.trim() === ""){
        nameOfWebsite.style.border = "1px solid red"
    }else{
        nameOfWebsite.style.border = "1px solid green"
    }

    if(linkOfWebsite.value.trim() === ""){
        linkOfWebsite.style.border = "1px solid red"
    }else{
        linkOfWebsite.style.border = "1px solid green"
    }
    
    if(descriptionOfWebsite.value.trim() === ""){
        descriptionOfWebsite.style.border = "1px solid red"
    }else{
        descriptionOfWebsite.style.border = "1px solid green"
    }


    const aCreatedResource = {
        siteName: websiteName,
        siteLink: websiteURL,
        siteDescription: description
    }

    resources.push(aCreatedResource)
    localStorage.setItem("resources", JSON.stringify(resources))
    fetchResources()
 
    resourceForm.reset()
    closeBackModalOverlay()
}
