$(document).ready(function() {
     renderPage();
     
});

function renderPage() {
    $.getJSON("../js/dogs.json", function(returnData) {
        dogsArray = returnData;
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

function updateTable(inputArray=dogsArray) {
    var dogs = [];

    for(let dog of inputArray){
        dogs.push("<tr><th>"+dog["name"]+
        "</th><td>"+dog["breed"]+
        "</td><td>"+dog["sex"]+
        "</td><td>"+dog["shots"]+
        "</td><td>"+dog["age"]+
        "</td><td>"+dog["size"]+
        "</td><td>"+dog["licensed"]+
        "</td><td>"+dog["neutered"]+
        "</td><td data-toggle=\"modal\" data-target=\"#ownerModal\" class=\"clickable\">"+dog["owner"]+
        "</td><td data-toggle=\"modal\" data-target=\"#noteModal\" class=\"clickable\">"+dog["notes"]+
        "</td><td></tr>");
    }

    var tableHTML = dogs.join("");
    tableHTML = tableHTML.replace(/true/g,"<img src=\"../assets/yesCheck.png\" class=\"icon\" name=\"Yes\">");
    tableHTML = tableHTML.replace(/false/g,"<img src=\"../assets/noX.png\" class=\"icon\" name=\"Yes\">");

    $("#dogTable").html(tableHTML);
}

/* Filter functions */

function nameFilter() {
    var token = $("#nameFilter").val();
    var filteredArray = dogsArray.filter(function(dog){
        return dog.name.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
}

function breedFilter() {
    var token = $("#breedFilter").val();
    var filteredArray = dogsArray.filter(function(dog){
        return dog.breed.toLowerCase().startsWith(token);
    });
    updateTable(filteredArray);
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
    var sortedArray = dogsArray.sort(function(a, b){
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
    var sortedArray = dogsArray.sort(function(a, b){
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
    var sortedArray = dogsArray.sort(function(a, b){
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
    var sortedArray = dogsArray.sort(function(a, b){
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
    var sortedArray = dogsArray.sort(function(a, b){
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

var dogsArray = [];
var descendingName = false;
var descendingSpecies = false;
var descendingSex = false;
var descendingAge = false;
var descendingOwner = false;
var descendingNote = false;