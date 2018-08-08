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
    $exoticsArray = array();

    $stmt = 'SELECT exotics.id, name, species, sex, birthdate, CONCAT(fname, " ", lname) AS owner_name
            FROM exotics
                            
            LEFT JOIN exoticsOwners ON exotics.id=exoticsOwners.exoticsFk
            LEFT JOIN owners ON exoticsOwners.ownersFk=owners.id';

    if (isset($_GET["id"])) {
        $stmt = $db->prepare($stmt . ' WHERE exoticsOwners.ownersFk = ?');
        $stmt->execute(array($_GET["id"]));

        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $results) {
            $exotic = array(
                "id" => $results["id"],
                "name" => $results["name"],
                "species" => $results["species"],
                "sex" => $results["sex"],
                "age" => $results["birthdate"],
                "owner" => $results["owner_name"]
            );
            array_push($exoticsArray, $exotic);
        }
        echo json_encode($exoticsArray);
        die;
    }

    foreach ($db->query($stmt) as $results) {
        $exotic = array(
            "id" => $results["id"],
            "name" => $results["name"],
            "species" => $results["species"],
            "sex" => $results["sex"],
            "age" => $results["birthdate"],
            "owner" => $results["owner_name"]
        );
        array_push($exoticsArray, $exotic);
    }

    echo json_encode($exoticsArray);
?>