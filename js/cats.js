$(document).ready(function() {
     renderPage();
     
});

function renderPage() {
    $.getJSON("../api/cats.php", function(returnData) {
        catsArray = returnData;
        updatePaginatedTable(catsArray);
    })

    $("#nameFilter").keypress(_.debounce(nameFilter, 500));
    $("#breedFilter").keypress(_.debounce(breedFilter, 500));
    $("#ownerFilter").keypress(_.debounce(ownerFilter, 500));
    $("#noteFilter").keypress(_.debounce(noteFilter, 500));

    $("#nameHeader").click(nameSort);
    $("#speciesHeader").click(speciesSort);
    $("#sexHeader").click(sexSort);
    $("#ageHeader").click(ageSort);
    $("#ownerHeader").click(ownerSort);
    $("#noteHeader").click(noteSort);
}

function updatePaginatedTable(inputArray) {
    $('#pagination-widget').twbsPagination('destroy');
    $('#pagination-widget').twbsPagination({
        totalPages : Math.ceil(inputArray.length / 10),
        visiblePages : 5,
        onPageClick : function(event, page) {
            let offset = (page - 1) * 10;
            let paginatedArray = inputArray.slice(offset, offset+9);
            updateTable(paginatedArray);
        }
    });
}

function updateTable(inputArray=catsArray) {
    var cats = [];
    var checkboxHTML = "<img src=\"../assets/yesCheck.png\" class=\"icon\" name=\"Yes\">"
    var exHTML = "<img src=\"../assets/noX.png\" class=\"icon\" name=\"Yes\">"

    for(let cat of inputArray){
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
        "</td><td data-toggle=\"modal\" data-target=\"#noteModal\" class=\"clickable\" onclick=\"updateNoteModal(this)\" id=\"" + cat["id"] + "\">"+"Click to see notes"+
        "</td><td></tr>");
    }

    var tableHTML = cats.join("");
    //tableHTML = tableHTML.replace(/true/g,"<img src=\"../assets/yesCheck.png\" class=\"icon\" name=\"Yes\">");
    //tableHTML = tableHTML.replace(/false/g,"<img src=\"../assets/noX.png\" class=\"icon\" name=\"Yes\">");

    $("#catTable").html(tableHTML);
}

function updateNoteModal(elementPassed) {
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

function updateOwnerModal(elementPassed) {
    let animalID = elementPassed.id;
    let noteBody = document.getElementById("owner-modal-body");
    noteBody.innerHTML = "";
    let generatedHTML = "";
    let counter = 1;

    $.getJSON(`../api/notes.php?animal=cat&id=${animalID}&ownerNotes=true`), function(returnNotes) {
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
    }
}

/* Filter functions */

function nameFilter() {
    var token = $("#nameFilter").val();
    var filteredArray = catsArray.filter(function(cat){
        return cat.name.toLowerCase().startsWith(token);
    });
    updatePaginatedTable(filteredArray);
}

function breedFilter() {
    var token = $("#breedFilter").val();
    var filteredArray = catsArray.filter(function(cat){
        return cat.breed.toLowerCase().startsWith(token);
    });
    updatePaginatedTable(filteredArray);
}

function ownerFilter() {
    var token = $("#ownerFilter").val();
    var filteredArray = catsArray.filter(function(cat){
        return cat.owner.toLowerCase().startsWith(token);
    });
    updatePaginatedTable(filteredArray);
}

function noteFilter() {
    var token = $("#noteFilter").val();
    var filteredArray = catsArray.filter(function(cat){
        return cat.notes.toLowerCase().startsWith(token);
    });
    updatePaginatedTable(filteredArray);
}

/* Sorting functions */

function nameSort() {
    var sortedArray = catsArray.sort(function(a, b){
        var result;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    })
    if (descendingName) sortedArray = sortedArray.reverse();
    updatePaginatedTable(sortedArray);
    
    descendingName = !descendingName;

    if (descendingName) {
        $("#nameHeader").html("<input id=\"nameFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> Name &darr;");
    }
    else {
        $("#nameHeader").html("<input id=\"nameFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> Name &uarr;");
    }
}

function speciesSort() {
    var sortedArray = catsArray.sort(function(a, b){
        if (a.breed.toLowerCase() < b.breed.toLowerCase()) return -1;
        if (a.breed.toLowerCase() > b.breed.toLowerCase()) return 1;
        return 0;
    })
    if (descendingSpecies) sortedArray = sortedArray.reverse();
    updatePaginatedTable(sortedArray);

    descendingSpecies = !descendingSpecies;
    if (descendingSpecies) {
        $("#speciesHeader").html("<input id=\"nameFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> Breed &darr;");
    }
    else {
        $("#speciesHeader").html("<input id=\"nameFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> Breed &uarr;");
    }
}

function sexSort() {
    var sortedArray = catsArray.sort(function(a, b){
        if (a.sex.toLowerCase() < b.sex.toLowerCase()) return -1;
        if (a.sex.toLowerCase() > b.sex.toLowerCase()) return 1;
        return 0;
    })
    if (descendingSex) sortedArray = sortedArray.reverse();
    updatePaginatedTable(sortedArray);

    descendingSex = !descendingSex
    if (descendingSex) {
        $("#sexHeader").html("Sex &darr;");
    }
    else {
        $("#sexHeader").html("Sex &uarr;");
    }
}

function ageSort() {
    var sortedArray = catsArray.sort(function(a, b){
        return a.age - b.age;
    })
    if (descendingAge) sortedArray = sortedArray.reverse();
    updatePaginatedTable(sortedArray);

    descendingAge = !descendingAge;
    if (descendingAge) {
        $("#ageHeader").html("Age &darr;");
    }
    else {
        $("#ageHeader").html("Age &uarr;");
    }    
}

function ownerSort() {
    var sortedArray = catsArray.sort(function(a, b){
        if (a.owner.toLowerCase() < b.owner.toLowerCase()) return -1;
        if (a.owner.toLowerCase() > b.owner.toLowerCase()) return 1;
        return 0;
    })
    if (descendingOwner) sortedArray = sortedArray.reverse();
    updatePaginatedTable(sortedArray);

    descendingOwner = !descendingOwner;
    if (descendingOwner) {
        $("#ownerHeader").html("<input id=\"ownerFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> Owner &darr;");
    }
    else {
        $("#ownerHeader").html("<input id=\"ownerFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> Owner &uarr;");
    }
}

function noteSort() {
    var sortedArray = catsArray.sort(function(a, b){
        if (a.notes.toLowerCase() < b.notes.toLowerCase()) return -1;
        if (a.notes.toLowerCase() > b.notes.toLowerCase()) return 1;
        return 0;
    })
    if (descendingNote) sortedArray = sortedArray.reverse();
    updatePaginatedTable(sortedArray);

    descendingNote = !descendingNote;
    if (descendingNote) {
        $("#noteHeader").html("<input id=\"noteFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> Note &darr;");
    }
    else {
        $("#noteHeader").html("<input id=\"noteFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> Note &uarr;");
    }
}

var catsArray = [];
var descendingName = false;
var descendingSpecies = false;
var descendingSex = false;
var descendingAge = false;
var descendingOwner = false;
var descendingNote = false;