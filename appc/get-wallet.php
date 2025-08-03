<?php
header('Content-Type: application/json');

$dataFile = __DIR__ . '/data/wallets.json';

if (!file_exists($dataFile)) {
  echo json_encode(['fx8' => ['google' => '', 'apple' => ''], 'wallets' => []]);
  exit;
}

$data = json_decode(file_get_contents($dataFile), true);
echo json_encode($data);
