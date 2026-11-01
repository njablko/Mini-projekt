<?php
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Niedozwolona metoda żądania"]);
    exit;
}

$imie = trim($_POST["imie"] ?? "");
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
$wiadomosc = trim($_POST["wiadomosc"] ?? "");

if (empty($imie) || $email === false || $email === null || mb_strlen($wiadomosc) < 10) {
    http_response_code(422); 
    echo json_encode(["error" => "Błąd serwera: Sprawdź poprawność danych (wiadomość musi mieć min. 10 znaków)."]);
    exit;
}

http_response_code(200);
echo json_encode(["message" => "Twoja wiadomość została wysłana!"]);
?>