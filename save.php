<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $wallets = [];

    for ($i = 1; $i <= 5; $i++) {
        $fileKey = "wallet_img_$i";
        $uploadPath = '';

        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
            $tmpName = $_FILES[$fileKey]['tmp_name'];
            $fileName = basename($_FILES[$fileKey]['name']);
            $targetDir = 'uploads/';
            $ext = pathinfo($fileName, PATHINFO_EXTENSION);
            $newFileName = "wallet_{$i}_" . time() . "." . $ext;
            $targetFile = $targetDir . $newFileName;

            // 确保 uploads 文件夹存在
            if (!is_dir($targetDir)) {
                mkdir($targetDir, 0777, true);
            }

            if (move_uploaded_file($tmpName, $targetFile)) {
                $uploadPath = $targetFile;
            } else {
                $uploadPath = './assets/images/wallet-i' . $i . '.png'; // 上传失败，保持默认
            }
        } else {
            // 没上传文件时（可能想保留原图），保留原路径（你可以再加逻辑去读取旧 data.json）
            $uploadPath = './assets/images/wallet-i' . $i . '.png';
        }

        $wallets[] = [
            "img" => $uploadPath,
            "link" => $_POST["wallet_link_$i"]
        ];
    }

    $data = [
        "app" => [
            "link" => $_POST['app_link'],
            "text" => $_POST['app_text']
        ],
        "startTrading" => $_POST['start_trading'],
        "demoAnalysis" => $_POST['demo_analysis'],
        "aboutUs" => $_POST['about_us'],
        "wallets" => $wallets
    ];

    file_put_contents('data.json', json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    echo "✅ 保存成功！<a href='admin.html'>返回</a>";
} else {
    echo "无效请求。";
}
?>
