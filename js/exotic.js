$(document).ready(function() {
     renderPage();
     
});

function renderPage() {
    $.getJSON("../api/exotics.php", function(returnData) {
        exoticsArray = returnData;
        updatePaginatedTable(exoticsArray);
    })

    $("#nameFilter").keypress(_.debounce(nameFilter, 500));
    $("#speciesFilter").keypress(_.debounce(speciesFilter, 500));
    $("#ownerFilter").keypress(_.debounce(ownerFilter, 500));
    $("#noteFilter").keypress(_.debounce(noteFilter, 500));

    /*$("#nameHeader").click(nameSort);
    $("#speciesHeader").click(speciesSort);
    $("#sexHeader").click(sexSort);
    $("#ageHeader").click(ageSort);
    $("#ownerHeader").click(ownerSort);
    $("#noteHeader").click(noteSort);*/
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

function updateTable(inputArray=exoticsArray) {
    var exotics = [];

    for(let exotic of inputArray){
        let birth = new Date(exotic["age"]);
        let dif = Date.now() - birth.getTime();
        let ageDate = new Date(dif);
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);

        exotics.push("<tr><th>"+exotic["name"]+
        "</th><td>"+exotic["species"]+
        "</td><td>"+exotic["sex"]+
        "</td><td>"+age+
        "</td><td data-toggle=\"modal\" data-target=\"#ownerModal\" class=\"clickable\">"+exotic["owner"]+
        "</td><td data-toggle=\"modal\" data-target=\"#noteModal\" class=\"clickable\" onclick=\"updateNoteModal(this)\" id=\"" + exotic["id"] + "\">"+"Click here to see notes."+
        "</td><td></tr>");
    }

    var tableHTML = exotics.join("");
    $("#exoticTable").html(tableHTML);
}

function updateNoteModal(elementPassed) {
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

/* Filter functions */

function nameFilter() {
    var token = $("#nameFilter").val();
    var filteredArray = exoticsArray.filter(function(exotic){
        return exotic.name.toLowerCase().startsWith(token);
    });
    updatePaginatedTable(filteredArray);
}

function speciesFilter() {
    var token = $("#speciesFilter").val();
    var filteredArray = exoticsArray.filter(function(exotic){
        return exotic.species.toLowerCase().startsWith(token);
    });
    updatePaginatedTable(filteredArray);
}

function ownerFilter() {
    var token = $("#ownerFilter").val();
    var filteredArray = exoticsArray.filter(function(exotic){
        return exotic.owner.toLowerCase().startsWith(token);
    });
    updatePaginatedTable(filteredArray);
}

function noteFilter() {
    var token = $("#noteFilter").val();
    var filteredArray = exoticsArray.filter(function(exotic){
        return exotic.notes.toLowerCase().startsWith(token);
    });
    updatePaginatedTable(filteredArray);
}

/* Sorting functions */

function nameSort() {
    var sortedArray = exoticsArray.sort(function(a, b){
        var result;
        if (a.name.toLowerCase() < b.name.toLowerCase()) result = -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) result = 1;
        else result = 0;
        return result;
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
    var sortedArray = exoticsArray.sort(function(a, b){
        if (a.species.toLowerCase() < b.species.toLowerCase()) return -1;
        if (a.species.toLowerCase() > b.species.toLowerCase()) return 1;
        return 0;
    })
    if (descendingSpecies) sortedArray = sortedArray.reverse();
    updatePaginatedTable(sortedArray);

    descendingSpecies = !descendingSpecies;
    if (descendingSpecies) {
        $("#speciesHeader").html("<input id=\"nameFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> Species &darr;");
    }
    else {
        $("#speciesHeader").html("<input id=\"nameFilter\" class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Filter\"> <br> Species &uarr;");
    }
}

function sexSort() {
    var sortedArray = exoticsArray.sort(function(a, b){
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
    var sortedArray = exoticsArray.sort(function(a, b){
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
    var sortedArray = exoticsArray.sort(function(a, b){
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
    var sortedArray = exoticsArray.sort(function(a, b){
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

var exoticsArray = [];
var descendingName = false;
var descendingSpecies = false;
var descendingSex = false;
var descendingAge = false;
var descendingOwner = false;
var descendingNote = false;