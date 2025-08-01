// HTML lang 到 API 语言参数映射表
const langMap = {
  'zh-cn': 'zh',
  'zh-tw': 'zh-tw',
  'en': 'en',
  'ms': 'ms',
  'ko': 'ko',
  'ja': 'ja'
};

// 从 <html lang=""> 读取当前语言
const htmlLang = document.documentElement.lang.toLowerCase();
const currentLang = langMap[htmlLang] || 'zh'; // 默认简体中文

// 获取文章列表
fetch(`/api/articles?lang=${currentLang}`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('article-list');
    container.innerHTML = '';

    data.forEach(article => {
      const html = `
        <div class="article-content" data-id="${article.id}">
          <div class="article-img-box">
              <img src="${article.cover}" alt="${article.alt}" />
              <div class="overlay-text">${article.tag}</div>
          </div>
          <div class="article-date">
              ${article.day}<br /><span>${article.month}</span>
          </div>
          <div class="article-text">
              <h3>${article.title}</h3>
              <p>${article.description}</p>
          </div>
          <div class="arrow-box orange">→</div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', html);
    });

    // 文章跳转
    document.querySelectorAll('.article-content').forEach(item => {
      item.addEventListener('click', () => {
        const articleId = item.getAttribute('data-id');
        window.location.href = `/article-detail.html?id=${articleId}&lang=${currentLang}`;
      });
    });
  })
  .catch(err => console.error('加载文章失败:', err));
