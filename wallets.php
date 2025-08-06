<?php

// 初始化 cURL
$ch = curl_init();
$url = "https://fx8.nsekai.com/api/category/read";

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

// 发起请求
$response = curl_exec($ch);

// 错误处理
if (curl_errno($ch)) {
    echo json_encode([
        "error" => true,
        "message" => "cURL 错误: " . curl_error($ch)
    ]);
} else {
    echo $response;
}
curl_close($ch);
?>
