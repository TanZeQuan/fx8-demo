fetch('apps.php')
  .then(res => res.json())
  .then(data => {
    if (data.error || !Array.isArray(data.response)) {
      console.error("API 返回错误:", data.message || '未知错误');
      return;
    }

    const container = document.getElementById('app-container');
    container.innerHTML = '';

    console.log(container);

    data.response.forEach(wallet => {
      if (wallet.isStatus !== 2 || !wallet.lists) return;

      const item = document.createElement('div');
      item.className = 'app-store-buttons';

      item.innerHTML = `
        <a href="${wallet.lists.playstore}" target="_blank" rel="noopener noreferrer">
          <img src="./assets/images/google-play-logo.png" alt="Google Play">
        </a>
        <a href="${wallet.lists.applestore}" target="_blank" rel="noopener noreferrer">
          <img src="./assets/images/app-store-logo.png" alt="App Store">
        </a>
      `;

      container.appendChild(item);
    });
  })
  .catch(err => {
    console.error('加载钱包失败:', err);
  });
