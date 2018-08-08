<?php
    $db = new PDO('mysql:host=localhost;dbname=vet_website;charset=utf8mb4', 'root', '');
    $sql = "SELECT * FROM owners";

    $fnameArray = array();
    $lnameArray = array();
    $usernameArray = array();
    $hashedPasswordArray = array();

    foreach ($db->query($sql) as $results)
    {
       array_push($fnameArray, $results["fname"]);
       array_push($lnameArray, $results["lname"]);
    }

    for ($i = 0; $i < 1000; $i++) {
        $username = $fnameArray[$i][0] . $lnameArray[$i];
        array_push($usernameArray, strtolower($username));
        //echo nl2br($username . "\n");
    }

    for ($i = 0; $i < 1000; $i++) {
        //echo $i;
        // $password = strrev($usernameArray[$i]);
        // $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        // echo nl2br($passwordHash . "\n");
        //array_push($hashedPasswordArray, $passwordHash);
    }

    if (password_verify('kcasbele', '$2y$10$Dt9uCAfgHq9kmgYg4F.oCuD7qwXrbYibJcKEjNvcOKbWQ3ow7Zf96')) {
        echo "SUCCESS!";
    }
    else {
        echo "FAILURE";
    }

    echo password_hash("admin", PASSWORD_BCRYPT);
?>