<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Cache-Control: no-cache");
    header("Cache-Control: no-store");

    session_start();
    if (isset($_SESSION["id"])){
        echo json_encode($_SESSION["id"]);
    }
?>