$(document).ready(function() {
     renderPage();
     
});

function renderPage() {
    $.getJSON("exotic.json", function(returnData) {
        exoticsArray = returnData;
        updateTable();
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

function updateTable(inputArray=exoticsArray) {
    var exotics = [];

    for(let exotic of inputArray){
        exotics.push("<tr><th>"+exotic["name"]+
        "</th><td>"+exotic["species"]+
        "</td><td>"+exotic["sex"]+
        "</td><td>"+exotic["age"]+
        "</td><td data-toggle=\"modal\" data-target=\"#ownerModal\" class=\"clickable\">"+exotic["owner"]+
        "</td><td data-toggle=\"modal\" data-target=\"#noteModal\" class=\"clickable\">"+exotic["notes"]+
        "</td><td></tr>");
    }

    var tableHTML = exotics.join("");
    tableHTML = tableHTML.replace(/true/g,"Yes");
    tableHTML = tableHTML.replace(/false/g,"No");

    $("#exoticTable").html(tableHTML);
}

/* Filter functions */

function nameFilter() {
    var token = $("#nameFilter").val();
    var filteredArray = exoticsArray.filter(function(exotic){
        return exotic.name.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
}

function speciesFilter() {
    var token = $("#speciesFilter").val();
    var filteredArray = exoticsArray.filter(function(exotic){
        return exotic.species.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
}

function ownerFilter() {
    var token = $("#ownerFilter").val();
    var filteredArray = exoticsArray.filter(function(exotic){
        return exotic.owner.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
}

function noteFilter() {
    var token = $("#noteFilter").val();
    var filteredArray = exoticsArray.filter(function(exotic){
        return exotic.notes.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
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
    updateTable(sortedArray);
    
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
    updateTable(sortedArray);

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
    updateTable(sortedArray);

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
    updateTable(sortedArray);

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
    updateTable(sortedArray);

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
    updateTable(sortedArray);

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