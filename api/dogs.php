<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Cache-Control: no-cache");
    header("Cache-Control: no-store");

    include_once 'db.php';

    session_start();
    if (!isset($_SESSION)) {
        echo 'Please try logging in and re-accessing the page';
    }

    $database = new Database();
    $db = $database->getConnection();
    $dogsArray = array();

    $sql = 'SELECT dogs.id, name, breed, sex, shots, licensed, neutered, birthdate, weight
             FROM dogs';

    if (isset($_GET["id"])) {
        $stmt = $db->prepare($sql . ' WHERE dogsOwners.ownersFk = ?');
        $stmt->execute(array($_GET["id"]));

        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $results) {
            $dog = array(
                "id" => $results["id"],
                "name" => $results["name"],
                "breed" => $results["breed"],
                "sex" => $results["sex"],
                "shots" => $results["shots"],
                "age" => $results["birthdate"],
                "size" => $results["weight"],
                "licensed" => $results["licensed"],
                "neutered" => $results["neutered"],
            );
            array_push($dogsArray, $dog);
        }
        echo json_encode($dogsArray);
        die;
    }


    foreach ($db->query($sql) as $results) {
        $dog = array(
            "id" => $results["id"],
            "name" => $results["name"],
            "breed" => $results["breed"],
            "sex" => $results["sex"],
            "shots" => $results["shots"],
            "age" => $results["birthdate"],
            "size" => $results["weight"],
            "licensed" => $results["licensed"],
            "neutered" => $results["neutered"],
        );
        array_push($dogsArray, $dog);
    }

    echo json_encode($dogsArray);
?>