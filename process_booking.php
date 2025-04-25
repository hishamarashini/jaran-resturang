<?php
header("Content-Type: application/json");

// Database credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'cmhc2v1ld_samartmedia');
define('DB_USER', 'cmhc2v1ld_samartmedia');
define('DB_PASS', 'Loza1891978');

// PHPMailer setup (add to top)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

// Connect to MySQL
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
  die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

// Validate and sanitize inputs
$name = trim($_POST['name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = trim($_POST['phone'] ?? '');
$date = $_POST['date'] ?? '';
$time = $_POST['time'] ?? '';
$guests = $_POST['guests'] ?? '';

// Validation
if (empty($name) || empty($email) || empty($phone) || empty($date) || empty($time) || empty($guests)) {
  echo json_encode(["status" => "error", "message" => "Alla fält måste fyllas i"]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(["status" => "error", "message" => "Ogiltig e-postadress"]);
  exit;
}

// Insert into database
$sql = "INSERT INTO bookings (name, email, phone, date, time, guests) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $name, $email, $phone, $date, $time, $guests);

if ($stmt->execute()) {
  // ========== SMTP EMAIL CODE ========== //
  $mail = new PHPMailer(true);
  try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'send.one.com'; // One.com's SMTP
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@yaran-restaurang.se'; // Your one.com email
    $mail->Password   = 'Buffe2025'; // Your one.com email password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom('info@yaran-restaurang.se', 'Yaran Restaurang');
    $mail->addAddress('info@yaran-restaurang.se'); // Where to receive bookings
    $mail->addReplyTo($email, $name); // Allow replying to customer

    // Content
    $mail->Subject = "Ny bokning: $name - $date $time";
    $mail->Body    = "Bokningsdetaljer:\n\nNamn: $name\nE-post: $email\nTelefon: $phone\nDatum: $date\nTid: $time\nAntal gäster: $guests";

    $mail->send();
  } catch (Exception $e) {
    error_log("Email failed: " . $mail->ErrorInfo); // Log error silently
  }
  // ========== END EMAIL CODE ========== //

  echo json_encode(["status" => "success", "message" => "Tack! Din bokning är bekräftad."]);
} else {
  echo json_encode(["status" => "error", "message" => "Databasfel: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>