<?php
$file = "data/news.json";
$uploadDir = "uploads/assets/";

if (!is_dir($uploadDir)) {
  mkdir($uploadDir, 0777, true);
}

$news = json_decode(file_get_contents($file), true);
$saveSuccess = false;

// 保存或更新新闻
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = $_POST['id'] ? intval($_POST['id']) : time();

  // 上传封面图
  $imagePath = $_POST['existing_image'] ?? '';
  if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imagePath = $uploadDir . 'news_' . $id . '_thumb.' . $ext;
    move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
  }

  // 上传详情图
  $detailPath = $_POST['existing_detailImage'] ?? '';
  if (isset($_FILES['detailImage']) && $_FILES['detailImage']['error'] === UPLOAD_ERR_OK) {
    $ext = pathinfo($_FILES['detailImage']['name'], PATHINFO_EXTENSION);
    $detailPath = $uploadDir . 'news_' . $id . '_detail.' . $ext;
    move_uploaded_file($_FILES['detailImage']['tmp_name'], $detailPath);
  }

  $new = [
    "id" => $id,
    "title" => $_POST['title'],
    "subtitle" => $_POST['subtitle'],
    "date" => $_POST['date'],
    "image" => $imagePath,
    "detailImage" => $detailPath,
    "content" => json_decode($_POST['content'], true) ?? []
  ];

  $updated = false;
  foreach ($news as &$item) {
    if ($item['id'] == $new['id']) {
      $item = $new;
      $updated = true;
      break;
    }
  }
  if (!$updated) $news[] = $new;

  file_put_contents($file, json_encode($news, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
  $saveSuccess = true;
}

// 删除新闻
if (isset($_GET['delete'])) {
  $id = intval($_GET['delete']);
  $news = array_filter($news, fn($item) => $item['id'] !== $id);
  file_put_contents($file, json_encode(array_values($news), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
  header("Location: admin-news.php");
  exit;
}

// 编辑新闻
$edit = null;
if (isset($_GET['edit'])) {
  foreach ($news as $item) {
    if ($item['id'] == $_GET['edit']) $edit = $item;
  }
}
?>
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>新闻后台管理</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f5f6f8; padding: 40px; max-width: 1200px; margin: auto; }
    h1, h2 { color: #333; }
    table { border-collapse: collapse; width: 100%; background: #fff; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04); margin-bottom: 40px; }
    th, td { border: 1px solid #ddd; padding: 12px 14px; text-align: left; }
    th { background-color: #f1f3f5; }
    .form-box { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
    .form-row { margin-bottom: 20px; }
    label { display: block; font-weight: bold; margin-bottom: 6px; }
    input[type="text"], input[type="date"], input[type="file"], textarea {
      width: 100%; padding: 10px; font-size: 1rem; border: 1px solid #ccc; border-radius: 6px;
    }
    textarea { resize: vertical; min-height: 150px; font-family: monospace; }
    button { background: #007bff; color: #fff; padding: 12px 24px; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; }
    button:hover { background: #0056b3; }
    .actions a { margin-right: 10px; text-decoration: none; color: #007bff; }
    .actions a:hover { text-decoration: underline; }
    img.preview { max-height: 80px; margin-top: 10px; display: block; }
    .success-message {
      padding: 10px;
      background: #d4edda;
      color: #155724;
      margin-bottom: 20px;
      border: 1px solid #c3e6cb;
      border-radius: 6px;
    }
    @media (max-width: 768px) {
      body { padding: 20px; }
      table, .form-box { font-size: 0.95rem; }
    }
  </style>
</head>
<body>

<h1>新闻后台管理</h1>

<?php if ($saveSuccess): ?>
  <div class="success-message">✅ 保存成功！</div>
<?php endif; ?>

<table>
  <tr><th>ID</th><th>标题</th><th>操作</th></tr>
  <?php foreach ($news as $item): ?>
    <tr>
      <td><?= $item['id'] ?></td>
      <td><?= htmlspecialchars($item['title']) ?></td>
      <td class="actions">
        <a href="?edit=<?= $item['id'] ?>">编辑</a>
        <a href="?delete=<?= $item['id'] ?>" onclick="return confirm('确认删除？')">删除</a>
      </td>
    </tr>
  <?php endforeach; ?>
</table>

<h2><?= $edit ? "编辑新闻" : "新增新闻" ?></h2>

<div class="form-box">
  <form method="post" enctype="multipart/form-data">
    <input type="hidden" name="id" value="<?= $edit['id'] ?? '' ?>">
    <input type="hidden" name="existing_image" value="<?= $edit['image'] ?? '' ?>">
    <input type="hidden" name="existing_detailImage" value="<?= $edit['detailImage'] ?? '' ?>">

    <div class="form-row">
      <label>标题</label>
      <input type="text" name="title" value="<?= $edit['title'] ?? '' ?>">
    </div>

    <div class="form-row">
      <label>副标题</label>
      <input type="text" name="subtitle" value="<?= $edit['subtitle'] ?? '' ?>">
    </div>

    <div class="form-row">
      <label>日期</label>
      <input type="date" name="date" value="<?= $edit['date'] ?? '' ?>">
    </div>

    <div class="form-row">
      <label>上传缩略图</label>
      <input type="file" name="image">
      <?php if (!empty($edit['image'])): ?>
        <img src="<?= $edit['image'] ?>" class="preview">
      <?php endif; ?>
    </div>

    <div class="form-row">
      <label>上传详情图</label>
      <input type="file" name="detailImage">
      <?php if (!empty($edit['detailImage'])): ?>
        <img src="<?= $edit['detailImage'] ?>" class="preview">
      <?php endif; ?>
    </div>

    <div class="form-row">
      <label>内容 (JSON数组)</label>
      <textarea name="content"><?= isset($edit['content']) ? json_encode($edit['content'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) : '' ?></textarea>
    </div>

    <button type="submit">保存</button>
  </form>
</div>

</body>
</html>
