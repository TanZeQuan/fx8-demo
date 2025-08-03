<?php
header('Content-Type: application/json');

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// 路径指向 JSON 文件
$data = json_decode(file_get_contents(__DIR__ . '/../data/news.json'), true);

foreach ($data as $item) {
  if ($item['id'] === $id) {
    echo json_encode($item);
    exit;
  }
}

// 没找到对应 ID
http_response_code(404);
echo json_encode(["error" => "News not found"]);
