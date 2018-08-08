$(document).ready(function() {
     renderPage();
     
});

function renderPage() {
    $.getJSON("../api/dogs.php", function(returnData) {
        dogsArray = returnData;
        updatePaginatedTable(dogsArray);
    });

    $("#nameFilter").keypress(_.debounce(nameFilter, 500));
    $("#breedFilter").keypress(_.debounce(breedFilter, 500));
    $("#ownerFilter").keypress(_.debounce(ownerFilter, 500));
    $("#noteFilter").keypress(_.debounce(noteFilter, 500));

    /* $("#nameHeader").click(nameSort);
    $("#speciesHeader").click(speciesSort);
    $("#sexHeader").click(sexSort);
    $("#ageHeader").click(ageSort);
    $("#ownerHeader").click(ownerSort);
    $("#noteHeader").click(noteSort); */
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

function updateTable(inputArray=dogsArray) {
    var dogs = [];
    var checkboxHTML = "<img src=\"../assets/yesCheck.png\" class=\"icon\" name=\"Yes\">"
    var exHTML = "<img src=\"../assets/noX.png\" class=\"icon\" name=\"Yes\">"

    for(let dog of inputArray){
        let shots = checkboxHTML;
        let licensed = checkboxHTML;
        let neutered = checkboxHTML;

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
        "</td><td data-toggle=\"modal\" data-target=\"#ownerModal\" class=\"clickable\">Click to see owner."+
        "</td><td data-toggle=\"modal\" data-target=\"#noteModal\" class=\"clickable\" onclick=\"updateNoteModal(this)\" id=\"" + dog["id"] + "\">"+"Click to see notes."+
        "</td><td></tr>");
    }

    var tableHTML = dogs.join("");
    //tableHTML = tableHTML.replace(/[0]/g,"<img src=\"../assets/yesCheck.png\" class=\"icon\" name=\"Yes\">");
    //tableHTML = tableHTML.replace(/[1]/g,"<img src=\"../assets/noX.png\" class=\"icon\" name=\"Yes\">");

    $("#dogTable").html(tableHTML);
}

function updateNoteModal(elementPassed) {
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

/* Filter functions */

function nameFilter() {
    var token = $("#nameFilter").val();
    var filteredArray = dogsArray.filter(function(dog){
        return dog.name.toLowerCase().startsWith(token);
    });
    updatePaginatedTable(filteredArray);
}

function breedFilter() {
    var token = $("#breedFilter").val();
    var filteredArray = dogsArray.filter(function(dog){
        return dog.breed.toLowerCase().startsWith(token);
    });
    updatePaginatedTable(filteredArray);
}

function ownerFilter() {
    var token = $("#ownerFilter").val();
    var filteredArray = dogsArray.filter(function(dog){
        return dog.owner.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
}

function noteFilter() {
    var token = $("#noteFilter").val();
    var filteredArray = dogsArray.filter(function(dog){
        return dog.notes.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
}

/* Sorting functions */

function nameSort() {
    var sortedArray = dogsArray.sort(function(a, b){
        var result;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    })
    if (descendingName) sortedArray = sortedArray.reverse();
    updatePaginatedTable(sortedArray);
    
    descendingName = !descendingName;

    if (descendingName) {
        $("#nameHeader").html("<input id=\"nameFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> <span class =\"clickable\" onclick=\"nameSort()\">Name</span> &darr;</span>");
        $("#nameFilter").keypress(_.debounce(nameFilter, 500));
    }
    else {
        $("#nameHeader").html("<input id=\"nameFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> <span class =\"clickable\" onclick=\"nameSort()\">Name &uarr;</span>");
        $("#breedFilter").keypress(_.debounce(nameFilter, 500));
    }
}

function speciesSort() {
    var sortedArray = dogsArray.sort(function(a, b){
        if (a.breed.toLowerCase() < b.breed.toLowerCase()) return -1;
        if (a.breed.toLowerCase() > b.breed.toLowerCase()) return 1;
        return 0;
    })
    if (descendingSpecies) sortedArray = sortedArray.reverse();
    updatePaginatedTable(sortedArray);

    descendingSpecies = !descendingSpecies;
    if (descendingSpecies) {
        $("#speciesHeader").html("<input id=\"nameFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> <span class=\"clickable\" onclick=\"speciesSort()\">Breed &darr;</span>");
        $("#breedFilter").keypress(_.debounce(breedFilter, 500));
    }
    else {
        $("#speciesHeader").html("<input id=\"nameFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> <span class=\"clickable\" onclick=\"speciesSort()\">Breed &uarr;</span>");
        $("#breedFilter").keypress(_.debounce(breedFilter, 500));
    }
}

function sexSort() {
    var sortedArray = dogsArray.sort(function(a, b){
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
    var sortedArray = dogsArray.sort(function(a, b){
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
    var sortedArray = dogsArray.sort(function(a, b){
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
    var sortedArray = dogsArray.sort(function(a, b){
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

var dogsArray = [];
var descendingName = false;
var descendingSpecies = false;
var descendingSex = false;
var descendingAge = false;
var descendingOwner = false;
var descendingNote = false;