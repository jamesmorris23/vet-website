$(document).ready(function() {
     renderPage();
     
});

function renderPage() {
    $.getJSON("cats.json", function(returnData) {
        catsArray = returnData;
        updateTable();
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

function updateTable(inputArray=catsArray) {
    var cats = [];

    for(let cat of inputArray){
        cats.push("<tr><th>"+cat["name"]+
        "</th><td>"+cat["breed"]+
        "</td><td>"+cat["sex"]+
        "</td><td>"+cat["shots"]+
        "</td><td>"+cat["age"]+
        "</td><td>"+cat["declawed"]+
        "</td><td>"+cat["neutered"]+
        "</td><td data-toggle=\"modal\" data-target=\"#ownerModal\" class=\"clickable\">"+cat["owner"]+
        "</td><td data-toggle=\"modal\" data-target=\"#noteModal\" class=\"clickable\">"+cat["notes"]+
        "</td><td></tr>");
    }

    var tableHTML = cats.join("");
    tableHTML = tableHTML.replace(/true/g,"Yes");
    tableHTML = tableHTML.replace(/false/g,"No");

    $("#catTable").html(tableHTML);
}

/* Filter functions */

function nameFilter() {
    var token = $("#nameFilter").val();
    var filteredArray = catsArray.filter(function(cat){
        return cat.name.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
}

function breedFilter() {
    var token = $("#breedFilter").val();
    var filteredArray = catsArray.filter(function(cat){
        return cat.breed.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
}

function ownerFilter() {
    var token = $("#ownerFilter").val();
    var filteredArray = catsArray.filter(function(cat){
        return cat.owner.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
}

function noteFilter() {
    var token = $("#noteFilter").val();
    var filteredArray = catsArray.filter(function(cat){
        return cat.notes.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
}

/* Sorting functions */

function nameSort() {
    var sortedArray = catsArray.sort(function(a, b){
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
    var sortedArray = catsArray.sort(function(a, b){
        if (a.breed.toLowerCase() < b.breed.toLowerCase()) return -1;
        if (a.breed.toLowerCase() > b.breed.toLowerCase()) return 1;
        return 0;
    })
    if (descendingSpecies) sortedArray = sortedArray.reverse();
    updateTable(sortedArray);

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
    var sortedArray = catsArray.sort(function(a, b){
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
    var sortedArray = catsArray.sort(function(a, b){
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
    var sortedArray = catsArray.sort(function(a, b){
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

var catsArray = [];
var descendingName = false;
var descendingSpecies = false;
var descendingSex = false;
var descendingAge = false;
var descendingOwner = false;
var descendingNote = false;