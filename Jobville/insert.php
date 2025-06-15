<?php
$conn = new mysqli("localhost", "root", "root", "jobville");

if ($conn->connect_error) {
    die("Connection Failed: " . $conn->connect_error);
}

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$address = $_POST['address'];
$address2 = $_POST['address2'];
$postalCode = $_POST['postalCode'];
$company = $_POST['company'];
$designation = $_POST['designation'];
$summary = $_POST['summary'];

$resume = $_FILES['resume']['name'];
$uploadDir = "uploads/";
$targetFile = $uploadDir . basename($resume);

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $_FILES["resume"]["tmp_name"]);
finfo_close($finfo);

$allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

if (!in_array($mime, $allowedTypes)) {
    die("Invalid file type.");
}

if (move_uploaded_file($_FILES["resume"]["tmp_name"], $targetFile)) {
    $stmt = $conn->prepare("INSERT INTO applications 
        (name, surname, address1, address2, postalCode, company, designation, summary, resume) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $firstName, $lastName, $address, $address2, $postalCode, $company, $designation, $summary, $resume);

    if ($stmt->execute()) {
        header("Location: application.html?success=true");
        exit();
    } else {
        echo "Error Submitting Application: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Error uploading file.";
}

$conn->close();
?>
