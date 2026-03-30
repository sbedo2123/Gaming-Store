<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");

include 'config.php';

try {
  if (!$conn) {
    throw new Exception("خطأ في الاتصال بقاعدة البيانات");
  }

  $sql = "SELECT * FROM accounts LIMIT 100";
  $result = $conn->query($sql);

  if (!$result) {
    throw new Exception("خطأ في استعلام قاعدة البيانات");
  }

  $accounts = [];

  while($row = $result->fetch_assoc()) {
    $accounts[] = array(
      "id" => $row['id'] ?? 0,
      "game" => $row['game'] ?? "Unknown",
      "level" => $row['level'] ?? "N/A",
      "rank" => $row['rank'] ?? "N/A",
      "price" => floatval($row['price'] ?? 0),
      "image" => $row['image'] ?? "placeholder.jpg",
      "description" => $row['description'] ?? ""
    );
  }

  echo json_encode($accounts);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(array(
    "error" => "خطأ: " . $e->getMessage(),
    "data" => array()
  ));
}
?>
