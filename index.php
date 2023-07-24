<?php session_start(); /* Starts the session */

if(!isset($_SESSION['UserData']['Username'])){
	header("location:login.php");
	exit;
}

if(isset($_GET['page'])) {
    $url = $_GET['page']; 
	echo file_get_contents($url);
} else {
    $url = 'index.html'; 
	echo file_get_contents($url);
}

?>
