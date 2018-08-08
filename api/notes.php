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
    $stmt = '';
    $noteArray = array();
    $animal = '';
    $table = '';

    switch ($_GET["animal"]) {
        case "dog":
            $stmt = $db->prepare('SELECT * FROM dogNotes WHERE dogNotes.dogsFk = ?');
            $animal = 'dogOwners';
            $table = 'dogs';
            break;
        case "cat":
            $stmt = $db->prepare('SELECT * FROM catNotes WHERE catNotes.catsFk = ?');
            $animal = 'catOwners';
            $table = 'cats';
            break;
        case "exotic":
            $stmt = $db->prepare('SELECT * FROM exoticNotes WHERE exoticNotes.exoticsFk = ?');
            $animal = 'exoticOwners';
            $table = 'exotics';
            break;
    }

    if ($_GET["ownerNotes"]) {
        // return dog row we called
        $stmt = $db->prepare('SELECT * FROM '. $animal . ' WHERE dogsFk=' . $_GET['id']);
        $stmt->execute();
        print_r($stmt);

        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $dogs) {
            echo 'hit';
            $stmt = $db->prepare('SELECT * FROM ownerNotes WHERE ownersFk = ' . $dogs['ownerFk']);
            $stmt->execute(array($animal, $animal, $dogs['']));
            print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
        die;
    }

    $stmt->execute(array($_GET["id"]));

    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $results) {
        $note = array(
            "date" => $results["date"],
            "vetName" => $results["vetName"],
            "note" => $results["note"]
        );
        array_push($noteArray, $note);
    }
    echo json_encode($noteArray);
?>