<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    $mysqli = new mysqli('localhost', 'root', '', 'vet_website');
    $sql = "SELECT username, password, isAdmin, id FROM owners WHERE username ='" . $mysqli->real_escape_string($username) . "'";
    $result = $mysqli->query($sql);

    if (!$result) {
        die ("error querying database");
    }
    elseif ($result->num_rows == 0) {
        echo "Bad username or password";
    }
    else {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row["password"])) {
            session_start();
            $_SESSION["username"] = $username;
            $_SESSION["id"] = $row["id"];
            $_SESSION["admin"] = $row["isAdmin"];
            // print_r($_SESSION);
            header("Location: index.php");
            die;
        }
        else {
            echo "Incorrect username or password.";
        }
    }
    
}
?>