<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once 'db.php';

    session_start();
    if (!isset($_SESSION)) {
        echo 'Please try logging in and re-accessing the page';
    }

    $database = new Database();
    $db = $database->getConnection();
    $catsArray = array();

    $stmt = 'SELECT cats.id, name, breed, sex, shots, declawed, neutered, birthdate, CONCAT(fname, " ", lname) AS owner_name
            FROM cats
                
            LEFT JOIN catsOwners ON cats.id=catsOwners.catsFk
            LEFT JOIN owners ON catsOwners.ownersFk=owners.id';

    if (isset($_GET["id"])) {
        $stmt = $db->prepare($stmt . ' WHERE catsOwners.ownersFk = ?');
        $stmt->execute(array($_GET["id"]));

        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $results) {
            $cat = array(
                "id" => $results["id"],
                "name" => $results["name"],
                "breed" => $results["breed"],
                "sex" => $results["sex"],
                "shots" => $results["shots"],
                "declawed" => $results["declawed"],
                "age" => $results["birthdate"],
                "neutered" => $results["neutered"],
                "owner" => $results["owner_name"]
            );
            array_push($catsArray, $cat);
        }
        echo json_encode($catsArray);
        die;
    }

    foreach ($db->query($stmt) as $results) {
        $cat = array(
            "id" => $results["id"],
            "name" => $results["name"],
            "breed" => $results["breed"],
            "sex" => $results["sex"],
            "shots" => $results["shots"],
            "declawed" => $results["declawed"],
            "age" => $results["birthdate"],
            "neutered" => $results["neutered"],
            "owner" => $results["owner_name"]
        );
        array_push($catsArray, $cat);
    }

    echo json_encode($catsArray);
?>