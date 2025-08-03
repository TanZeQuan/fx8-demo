<?php
$dataFile = __DIR__ . '/data/wallets.json';

if (!file_exists($dataFile)) {
  file_put_contents($dataFile, json_encode([
    'fx8' => ['google' => '', 'apple' => ''],
    'wallets' => []
  ], JSON_PRETTY_PRINT));
}

$data = json_decode(file_get_contents($dataFile), true);

// 更新 FX8 app 下载链接
$data['fx8']['google'] = $_POST['fx8_google'] ?? '';
$data['fx8']['apple'] = $_POST['fx8_apple'] ?? '';

// 保存数据
file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));

// 返回
header('Location: admin-wallet.php');
exit;
