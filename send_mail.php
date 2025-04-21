<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "cs909920@gmail.com"; 
    $subject = "New Form Submission";

    // Перевірка наявності полів і відповідна обробка
    $name = isset($_POST["name"]) ? htmlspecialchars($_POST["name"]) : "N/A";
    $email = isset($_POST["gmail"]) ? htmlspecialchars($_POST["gmail"]) : (isset($_POST["email"]) ? htmlspecialchars($_POST["email"]) : "N/A");
    $message = isset($_POST["message"]) ? htmlspecialchars($_POST["message"]) : "N/A";

    // Формування тіла листа
    $body = "
    <html>
    <head>
        <title>New Form Submission</title>
    </head>
    <body>
        <h2>Form Details</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Message:</strong></p>
        <p>$message</p>
    </body>
    </html>
    ";

    // Формування заголовків листа
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n"; // Використання email відправника
    $headers .= "Reply-To: $email" . "\r\n"; // Додати для зручного відповіді

    // Відправка листа
    if (mail($to, $subject, $body, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
}
?>