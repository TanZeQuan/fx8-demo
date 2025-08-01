// 立即开始交易 （中文简体）
   fetch('/api/get-button-link?type=startTrading')
    .then(res => res.json())
    .then(data => {
      const btn = document.getElementById('start-trading-btn');
      btn.onclick = () => {
        window.location.href = data.url;
      };
      console.log('按钮跳转地址来自后端：', data.url);
    })
    .catch(err => {
      console.error('按钮链接加载失败', err);
    });

// 钱包 （中文简体）
fetch('/api/get-wallet-links')
  .then(res => res.json())
  .then(data => {
    const walletElements = document.querySelectorAll('#wallet-icons .app-icon');

    walletElements.forEach(el => {
      const walletKey = el.getAttribute('data-wallet');
      const link = data[walletKey];

      if (link) {
        el.style.cursor = 'pointer';
        el.onclick = () => window.open(link, '_blank');
      }
    });
  })
  .catch(err => {
    console.error('获取钱包跳转链接失败:', err);
  });

// 下载APP按钮（中文简体）
  fetch('/api/get-latest-download-link?platform=android') // 或根据设备动态切换
  .then(res => res.json())
  .then(data => {
    document.getElementById('download-btn').href = data.url;
  })
  .catch(err => {
    console.error('获取下载链接失败:', err);
  });

// 立即开始交易1按钮（中文简体）
  document.getElementById('start-button').addEventListener('click', () => {
  fetch('/api/get-start-trading-link')
    .then(res => res.json())
    .then(data => {
      if (data && data.url) {
        window.open(data.url, '_blank'); // 在新标签打开后台返回的跳转地址
      } else {
        alert('获取交易地址失败，请稍后再试。');
      }
    })
    .catch(err => {
      console.error('接口出错:', err);
    });
});

// 立即开始交易2按钮（中文简体）
 document.getElementById('start-trading-btn').addEventListener('click', function (e) {
    e.preventDefault(); // 阻止默认跳转 "#"

    fetch('/api/get-start-trading-link')
      .then(res => res.json())
      .then(data => {
        if (data && data.url) {
          window.open(data.url, '_blank'); // 打开后台返回的链接
        } else {
          alert('获取跳转链接失败，请稍后再试');
        }
      })
      .catch(err => {
        console.error('接口错误:', err);
      });
  });

// GOOGLE & APP STORE FX8 APP按钮（中文简体）
  fetch('/api/get-store-links')
    .then(res => res.json())
    .then(data => {
      const storeImgs = document.querySelectorAll('.app-store-buttons img');

      storeImgs.forEach(img => {
        const storeKey = img.dataset.store;
        const link = data[storeKey];

        if (link) {
          img.style.cursor = 'pointer';
          img.addEventListener('click', () => {
            window.open(link, '_blank');
          });
        }
      });
    })
    .catch(err => {
      console.error('获取商店链接失败:', err);
    });

// GOOGLE & APP STORE WALLET APP 按钮（中文简体）
    fetch('/api/get-wallet-store-links')
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('.app-wallet-item').forEach(walletEl => {
        const walletKey = walletEl.dataset.wallet;
        const walletLinks = data[walletKey]; // 应该返回 { google: '...', apple: '...' }

        if (walletLinks) {
          walletEl.querySelectorAll('.store-icon').forEach(icon => {
            const platform = icon.dataset.platform;
            const url = walletLinks[platform];

            if (url) {
              icon.style.cursor = 'pointer';
              icon.addEventListener('click', () => {
                window.open(url, '_blank');
              });
            }
          });
        }
      });
    })
    .catch(err => {
      console.error('获取钱包商店链接失败:', err);
    });