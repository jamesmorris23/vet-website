$(document).ready(function() {
    renderPage();
})

var coreDogsArray = [];
var coreCatsArray = [];
var coreExoticsArray = [];

function renderPage() {
    
    $.getJSON("../api/currentSession.php", function(sessionId) {
        $.getJSON(`../api/dogs.php?id=${sessionId}`, function(dogData){
            renderDogTable(dogData);
        })/*.fail(function() {
            document.getElementById("dogTableContainer").innerHTML = "";
        });*/

        $.getJSON(`../api/cats.php?id=${sessionId}`, function(catData) {
            renderCatTable(catData);
        })/*.fail(function() {
            document.getElementById("catTableContainer").innerHTML = "";
        });*/

        $.getJSON(`../api/exotics.php?id=${sessionId}`, function(exoticData) {
            renderExoticTable(exoticData);
        })/*.fail(function() {
            document.getElementById("exoticTableContainer").innerHTML = "";
        });*/
    });
}

function updateDogNoteModal(elementPassed) {
    let animalID = elementPassed.id;
    let noteBody = document.getElementById("note-modal-body");
    noteBody.innerHTML = "";
    let generatedHTML = "";
    let counter = 1;
    
    $.getJSON(`../api/notes.php?animal=dog&id=${animalID}`, function(returnNotes) {
        for (let note of returnNotes) {
            let rowHTML = `<h4>Note ${counter}: ${note["date"]} | ${note["vetName"]}</h4>
                        <i>${note["note"]}</i>
                        <hr>`;
            generatedHTML += rowHTML;
            counter += 1;
        }
        if (generatedHTML=="") {
            generatedHTML="<h3>No notes left.</h3>";
        }

        noteBody.innerHTML = generatedHTML;
    });
}

function updateCatNoteModal(elementPassed) {
    let animalID = elementPassed.id;
    let noteBody = document.getElementById("note-modal-body");
    noteBody.innerHTML = "";
    let generatedHTML = "";
    let counter = 1;
    
    $.getJSON(`../api/notes.php?animal=cat&id=${animalID}`, function(returnNotes) {
        for (let note of returnNotes) {
            let rowHTML = `<h4>Note ${counter}: ${note["date"]} | ${note["vetName"]}</h4>
                        <i>${note["note"]}</i>
                        <hr>`;
            generatedHTML += rowHTML;
            counter += 1;
        }
        if (generatedHTML=="") {
            generatedHTML="<h3>No notes left.</h3>";
        }

        noteBody.innerHTML = generatedHTML;
    });
}

function updateExoticNoteModal(elementPassed) {
    let animalID = elementPassed.id;
    let noteBody = document.getElementById("note-modal-body");
    noteBody.innerHTML = "";
    let generatedHTML = "";
    let counter = 1;
    
    $.getJSON(`../api/notes.php?animal=exotic&id=${animalID}`, function(returnNotes) {
        for (let note of returnNotes) {
            let rowHTML = `<h4>Note ${counter}: ${note["date"]} | ${note["vetName"]}</h4>
                        <i>${note["note"]}</i>
                        <hr>`;
            generatedHTML += rowHTML;
            counter += 1;
        }
        if (generatedHTML=="") {
            generatedHTML="<h3>No notes left.</h3>";
        }

        noteBody.innerHTML = generatedHTML;
    });
}

function renderDogTable(array) {
    var dogs = [];
    var checkboxHTML = "<img src=\"../assets/yesCheck.png\" class=\"icon\" name=\"Yes\">"
    var exHTML = "<img src=\"../assets/noX.png\" class=\"icon\" name=\"Yes\">"

    for(let dog of array){
        let shots = checkboxHTML;
        let licensed = checkboxHTML;
        let neutered = checkboxHTML;
        let owner = dog["owner"];

        if (dog["owner"]==null) owner = `<span class="text-danger">No owner</span>`;

        if (dog["licensed"]==0) licensed = exHTML;
        if (dog["shots"]==0) shots = exHTML;
        if (dog["neutered"]==0) neutered = exHTML;
        
        let birth = new Date(dog["age"]);
        let dif = Date.now() - birth.getTime();
        let ageDate = new Date(dif);
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);

        let size = dog["size"];
        if (dog["size"] <= 20) size = "Small"
        else if (dog["size"] <= 50) size = "Medium"
        else if (dog["size"] <= 100) size = "Large"
        else size = "Gigantic"

        dogs.push("<tr><th>"+dog["name"]+
        "</th><td>"+dog["breed"]+
        "</td><td>"+dog["sex"]+
        "</td><td>"+shots+
        "</td><td>"+age+
        "</td><td>"+size+
        "</td><td>"+licensed+
        "</td><td>"+neutered+
        "</td><td data-toggle=\"modal\" data-target=\"#ownerModal\" class=\"clickable\">"+owner+
        "</td><td data-toggle=\"modal\" data-target=\"#noteModal\" class=\"clickable\" onclick=\"updateDogNoteModal(this)\" id=\"" + dog["id"] + "\">"+"Click to see notes."+
        "</td><td></tr>");
    }

    var tableHTML = dogs.join("");
    //tableHTML = tableHTML.replace(/[0]/g,"<img src=\"../assets/yesCheck.png\" class=\"icon\" name=\"Yes\">");
    //tableHTML = tableHTML.replace(/[1]/g,"<img src=\"../assets/noX.png\" class=\"icon\" name=\"Yes\">");

    $("#dogTable").html(tableHTML);
}

function renderCatTable(array) {
    var cats = [];
    var checkboxHTML = "<img src=\"../assets/yesCheck.png\" class=\"icon\" name=\"Yes\">"
    var exHTML = "<img src=\"../assets/noX.png\" class=\"icon\" name=\"Yes\">"

    for(let cat of array){
        let shots = checkboxHTML;
        let declawed = checkboxHTML;
        let neutered = checkboxHTML;

        if (cat["declawed"]==0) declawed = exHTML;
        if (cat["shots"]==0) shots = exHTML;
        if (cat["neutered"]==0) neutered = exHTML;

        let birth = new Date(cat["age"]);
        let dif = Date.now() - birth.getTime();
        let ageDate = new Date(dif);
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);

        cats.push("<tr><th>"+cat["name"]+
        "</th><td>"+cat["breed"]+
        "</td><td>"+cat["sex"]+
        "</td><td>"+shots+
        "</td><td>"+age+
        "</td><td>"+declawed+
        "</td><td>"+neutered+
        "</td><td data-toggle=\"modal\" data-target=\"#ownerModal\" class=\"clickable\">"+cat["owner"]+
        "</td><td data-toggle=\"modal\" data-target=\"#noteModal\" class=\"clickable\" onclick=\"updateCatNoteModal(this)\" id=\"" + cat["id"] + "\">"+"Click to see notes"+
        "</td><td></tr>");
    }

    var tableHTML = cats.join("");
    //tableHTML = tableHTML.replace(/true/g,"<img src=\"../assets/yesCheck.png\" class=\"icon\" name=\"Yes\">");
    //tableHTML = tableHTML.replace(/false/g,"<img src=\"../assets/noX.png\" class=\"icon\" name=\"Yes\">");

    $("#catTable").html(tableHTML);
}

function renderExoticTable(array) {
    //console.log(array);
    var exotics = [];
    
    for(let exotic of array){
        let birth = new Date(exotic["age"]);
        let dif = Date.now() - birth.getTime();
        let ageDate = new Date(dif);
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);

        exotics.push("<tr><th>"+exotic["name"]+
        "</th><td>"+exotic["species"]+
        "</td><td>"+exotic["sex"]+
        "</td><td>"+age+
        "</td><td data-toggle=\"modal\" data-target=\"#ownerModal\" class=\"clickable\">"+exotic["owner"]+
        "</td><td data-toggle=\"modal\" data-target=\"#noteModal\" class=\"clickable\" onclick=\"updateExoticNoteModal(this)\" id=\"" + exotic["id"] + "\">"+"Click here to see notes."+
        "</td><td></tr>");
    }

    var tableHTML = exotics.join("");
    $("#exoticTable").html(tableHTML);
}