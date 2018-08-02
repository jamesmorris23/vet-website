
console.log(dogOwnersSQL());

function catsSQL() {
    var sqlQuery = 'INSERT INTO cats () VALUES ';
    for (var i = 0; i < 1000; i++) {
        let catToAdd = makeCat();
        let queryRow = `(null, '${catToAdd.name}', '${catToAdd.breed}', '${catToAdd.sex}', ${catToAdd.shots}, ${catToAdd.declawed}, ${catToAdd.neutered}, '${catToAdd.birthdate}'),`;
        sqlQuery += queryRow;
    }
    sqlQuery += ";";
    return sqlQuery;
}

function dogsSQL() {
    var sqlQuery = 'INSERT INTO dogs () VALUES ';
    for (var i = 0; i < 1000; i++) {
        let itemToAdd = makeDog();
        let queryRow = `(null, '${itemToAdd.name}', '${itemToAdd.breed}', '${itemToAdd.sex}', ${itemToAdd.shots}, ${itemToAdd.licensed}, ${itemToAdd.neutered}, '${itemToAdd.birthdate}', ${itemToAdd.weight}),`;
        sqlQuery += queryRow;
    }
    sqlQuery += ";";
    return sqlQuery;
}

function exoticsSQL() {
    var sqlQuery = 'INSERT INTO exotics () VALUES ';
    for (var i = 0; i < 1000; i++) {
        let itemToAdd = makeExotic();
        let queryRow = `(null, '${itemToAdd.name}', '${itemToAdd.species}', '${itemToAdd.sex}', ${itemToAdd.neutered}, '${itemToAdd.birthdate}'),`;
        sqlQuery += queryRow;
    }
    sqlQuery += ";";
    return sqlQuery;
}

function catNotesSQL() {
    var sqlQuery = "INSERT INTO catNotes () VALUES";
    for (var i = 0; i < 1000; i++) {
        let noteToAdd = makeNote();
        let queryRow = `(null, ${noteToAdd.Fk}, '${noteToAdd.vetName}', '${noteToAdd.date}', '${noteToAdd.note}'),`;
        sqlQuery += queryRow
    }
    sqlQuery += ";";
    return sqlQuery
}

function dogNotesSQL() {
    var sqlQuery = "INSERT INTO dogNotes () VALUES";
    for (var i = 0; i < 1000; i++) {
        let noteToAdd = makeNote();
        let queryRow = `(null, ${noteToAdd.Fk}, '${noteToAdd.vetName}', '${noteToAdd.date}', '${noteToAdd.note}'),`;
        sqlQuery += queryRow
    }
    sqlQuery += ";";
    return sqlQuery;
}

function exoticNotesSQL() {
    var sqlQuery = "INSERT INTO exoticNotes () VALUES";
    for (var i = 0; i < 1000; i++) {
        let noteToAdd = makeNote();
        let queryRow = `(null, ${noteToAdd.Fk}, '${noteToAdd.vetName}', '${noteToAdd.date}', '${noteToAdd.note}'),`;
        sqlQuery += queryRow
    }
    sqlQuery += ";";
    return sqlQuery;
}

function ownerNotesSQL() {
    // id	ownersFk	vetName	date	note
    var sqlQuery = "INSERT INTO ownerNotes () VALUES";
    for (var i = 0; i < 1000; i++) {
        let noteToAdd = makeNote();
        let queryRow = `(null, ${noteToAdd.Fk}, '${noteToAdd.vetName}', '${noteToAdd.date}', '${noteToAdd.note}'),`;
        sqlQuery += queryRow;
    }
    sqlQuery += ";";
    return sqlQuery;
}

function ownersSQL() {
    // id	fname	lname	add1	add2	city	st	zip
    var sqlQuery = "INSERT INTO owners () VALUES";
    for (var i = 0; i < 1000; i++) {
        let itemToAdd = makeOwner();
        let queryRow = `(null, '${itemToAdd.fname}', '${itemToAdd.lname}', '${itemToAdd.add1}', '${itemToAdd.add2}', '${itemToAdd.city}', '${itemToAdd.st}', '${itemToAdd.zip}'),`;
        sqlQuery += queryRow;
    }
    sqlQuery += ";";
    return sqlQuery
}

function exoticOwnersSQL() {
    // exoticFk ownerFk
    var sqlQuery = "INSERT INTO exoticsOwners () VALUES";
    for (var i = 0; i < 1000; i++) {
        let ownerToAdd = makeAssignment();
        let queryRow = `(null, ${ownerToAdd.animalKey}, ${ownerToAdd.ownerKey}),`;
        sqlQuery += queryRow;
    }
    sqlQuery += ";";
    return sqlQuery;
}

function catOwnersSQL() {
    var sqlQuery = "INSERT INTO catsOwners () VALUES";
    for (var i = 0; i < 1000; i++) {
        let ownerToAdd = makeAssignment();
        let queryRow = `(null, ${ownerToAdd.animalKey}, ${ownerToAdd.ownerKey}),`;
        sqlQuery += queryRow;
    }
    sqlQuery += ";";
    return sqlQuery;
}

function dogOwnersSQL() {
    var sqlQuery = "INSERT INTO dogsOwners () VALUES";
    for (var i = 0; i < 1000; i++) {
        let ownerToAdd = makeAssignment();
        let queryRow = `(null, ${ownerToAdd.animalKey}, ${ownerToAdd.ownerKey}),`;
        sqlQuery += queryRow;
    }
    sqlQuery += ";";
    return sqlQuery;
}

function makeAssignment() {
    var assignment = {
        "animalKey" : faker.random.number({min: 1, max: 1000}),
        "ownerKey" : faker.random.number({min: 1, max: 1000})
    }

    return assignment;
}

function makeOwner() {
    var owner = {
        "fname" : faker.name.firstName().replace("\'",""),
        "lname" : faker.name.lastName().replace("\'",""),
        "add1" : faker.address.streetAddress().replace("\'",""),
        "add2" : faker.address.secondaryAddress().replace("\'",""),
        "city" : faker.address.city().replace("\'",""),
        "st" : faker.address.stateAbbr(),
        "zip" : faker.address.zipCode("#####")
    }

    return owner;
}

function makeDog() {
    var dog = {
        "name" : faker.name.firstName(),
        "breed" : faker.random.arrayElement(["German Shepherd","Labrador Retriever","Bulldog","Poodle","Beagle","Golden Retriever","Chihuahua","Pug","Yorkshire Terrier","Rottweiler","Siberian Husky","Boxer"]),
        "sex" : faker.random.arrayElement(["M","F"]),
        "shots" : faker.random.boolean(),
        "licensed" : faker.random.boolean(),
        "neutered" : faker.random.boolean(),
        "birthdate" : faker.date.between('2006-01-01', '2018-05-01').toISOString().slice(0,10),
        "weight" : faker.random.number({min: 5, max: 300})
    }

    return dog;
}

function makeNote(){
    var note = {
        "Fk" : faker.random.number({min: 1, max: 1000}),
        "vetName" : faker.random.arrayElement(["Dr. Shepherd","Dr. Smith","Dr. Reyes","Dr. Tomlinson","Dr. Steiner","Dr. Torres"]),
        "date" : faker.date.between('2006-01-01', '2018-05-01').toISOString().slice(0,10),
        "note" : faker.lorem.sentences(faker.random.number({min: 1, max: 6}))
    }

    return note;
}

function makeCat() {
    var cat = {
        "name" : faker.name.firstName(),
        "breed" : faker.random.arrayElement(["British Shorthair", "Persian Cat", "Siamese Cat", "Maine Coon", "Ragdoll", "Sphynx cat", "Abyssinian cat", "Exotic Shorthair"]),
        "sex" : faker.random.arrayElement(["M","F"]),
        "shots" : faker.random.boolean(),
        "declawed" : faker.random.boolean(),
        "neutered" : faker.random.boolean(),
        "birthdate" : formatDate(faker.date.between('2006-01-01', '2018-05-01'))
    }

    return cat;
}

function makeExotic() {
    var exotic = {
        "name" : faker.name.firstName(),
        "species" : faker.random.arrayElement(["Hamster", "Goat", "Llama", "Rabbit", "Gecko", "Lizard", "Spider", "Sugar Glider", "Rat", "Mouse"]),
        "sex" : faker.random.arrayElement(["M","F"]),
        "neutered" : faker.random.boolean(),
        "birthdate" : faker.date.between('2006-01-01', '2018-05-01').toISOString().slice(0,10)
    }

    return exotic
}

function formatDate(bdate) {
    let month = bdate.getMonth() + 1;
    let day = bdate.getDate();
    let year = bdate.getFullYear();
    return year + '-' + month + '-' + day;
}