<?php
$dataFile = __DIR__ . '/data/wallets.json';

if (!file_exists($dataFile)) {
  file_put_contents($dataFile, json_encode(['fx8' => ['google' => '', 'apple' => ''], 'wallets' => []], JSON_PRETTY_PRINT));
}

$data = json_decode(file_get_contents($dataFile), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // 处理 App 链接更新
  if (isset($_POST['google_link'], $_POST['apple_link'])) {
    $data['fx8']['google'] = trim($_POST['google_link']);
    $data['fx8']['apple'] = trim($_POST['apple_link']);
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
    $message = "App 链接已更新！";
  }
}
?>

<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <title>FX8 App 链接管理</title>
  <link rel="stylesheet" href="./assets/css/index.css" />
  <style>
    .admin-form { max-width: 600px; margin: 2em auto; background: #fff; padding: 2em; border-radius: 8px; }
    .admin-form label { display: block; margin-top: 1em; font-weight: bold; }
    .admin-form input[type="text"] { width: 100%; padding: 0.5em; margin-top: 0.5em; }
    .admin-form button { margin-top: 1.5em; padding: 0.7em 1.5em; }
    .message { text-align: center; color: green; font-weight: bold; margin-bottom: 1em; }
  </style>
</head>
<body>
  <div class="admin-form">
    <h2>更新 FX8 App 下载链接</h2>
    <?php if (!empty($message)): ?>
      <div class="message"><?= $message ?></div>
    <?php endif; ?>
    <form method="POST">
      <label for="google_link">Google Play 链接</label>
      <input type="text" id="google_link" name="google_link" value="<?= htmlspecialchars($data['fx8']['google']) ?>" required>

      <label for="apple_link">Apple Store 链接</label>
      <input type="text" id="apple_link" name="apple_link" value="<?= htmlspecialchars($data['fx8']['apple']) ?>" required>

      <button type="submit">保存链接</button>
    </form>
  </div>
</body>
</html>
