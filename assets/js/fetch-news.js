const lang = (navigator.language || 'en').toLowerCase();
  const langCode = lang.includes('zh') ? 'CN'
                : lang.includes('en') ? 'EN'
                : lang.includes('ko') ? 'KR'
                : lang.includes('ja') ? 'JP'
                : lang.includes('ms') ? 'MS'
                : 'EN';

fetch("api/get-news.php")
      .then(res => res.json())
      .then(data => {
        const list = document.getElementById("news-list");
        data.forEach((item, index) => {
          const newsItem = document.createElement("article");
          newsItem.className = "news-item";
          newsItem.innerHTML = `
            <div class="news-image">
              <img src="${item.image}" alt="${item.title}">
              <div class="news-overlay">${item.overlay || item.title}</div>
            </div>
            <div class="news-content">
              <div class="news-number-section">
                <div class="news-number">${String(index + 1).padStart(2, '0')}</div>
                <div class="news-date">${item.date}</div>
              </div>
              <div class="news-text-content">
                <h2 class="news-title ${index % 2 === 1 ? 'orange' : ''}">${item.title}</h2>
                <p class="news-description">${item.subtitle || item.description}</p>
              </div>
              <button class="arrow-button ${index % 2 === 1 ? 'outline' : ''}" onclick="location.href='news-info-CN.html?id=${item.id}'">→</button>
            </div>
          `;
          list.appendChild(newsItem);
        });
      })
      .catch(error => {
        console.error('加载新闻数据失败:', error);
      });