<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['articles'])) {
    $articles = $_POST['articles'];

    foreach ($articles as $i => &$article) {
        $fileKey = "image_$i";
        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
            $uploadDir = 'uploads/';
            if (!is_dir($uploadDir)) mkdir($uploadDir);
            $ext = pathinfo($_FILES[$fileKey]['name'], PATHINFO_EXTENSION);
            $newFilename = uniqid("article_") . "." . $ext;
            $uploadPath = $uploadDir . $newFilename;
            move_uploaded_file($_FILES[$fileKey]['tmp_name'], $uploadPath);
            $article['img'] = './' . $uploadPath;
        }
    }

    file_put_contents('articles.json', json_encode($articles, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    echo "保存成功";
} else {
    echo "没有收到有效数据";
}
?>
