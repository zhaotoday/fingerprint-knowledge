/**
 * Puppeteer Stealth 反检测示例
 * 展示如何使用 Puppeteer 配合 Stealth 插件绕过常见的机器人检测
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// 使用 stealth 插件
puppeteer.use(StealthPlugin());

(async () => {
  console.log('启动浏览器...');
  
  // 启动浏览器
  const browser = await puppeteer.launch({
    headless: false, // 设置为 true 可以无头模式运行
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
    ]
  });

  const page = await browser.newPage();

  // 设置视口大小
  await page.setViewport({
    width: 1920,
    height: 1080
  });

  // 设置 User-Agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  // 额外的反检测措施
  await page.evaluateOnNewDocument(() => {
    // 移除 webdriver 属性
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });

    // 伪装 Chrome 对象
    window.chrome = {
      runtime: {},
    };

    // 修改 permissions
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?
        Promise.resolve({ state: Notification.permission }) :
        originalQuery(parameters)
    );

    // 伪装 plugins
    Object.defineProperty(navigator, 'plugins', {
      get: () => [1, 2, 3, 4, 5],
    });

    // 伪装 languages
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US', 'en'],
    });
  });

  console.log('访问测试网站...');
  
  // 访问机器人检测网站
  await page.goto('https://bot.sannysoft.com', {
    waitUntil: 'networkidle2'
  });

  // 等待页面加载
  await page.waitForTimeout(3000);

  // 截图
  await page.screenshot({ 
    path: 'bot-detection-test.png',
    fullPage: true 
  });

  console.log('截图已保存: bot-detection-test.png');

  // 测试其他检测网站
  console.log('测试 AmIUnique...');
  await page.goto('https://amiunique.org/fp', {
    waitUntil: 'networkidle2'
  });
  await page.waitForTimeout(5000);
  await page.screenshot({ 
    path: 'amiunique-test.png',
    fullPage: true 
  });

  console.log('测试 BrowserLeaks...');
  await page.goto('https://browserleaks.com/canvas', {
    waitUntil: 'networkidle2'
  });
  await page.waitForTimeout(3000);
  await page.screenshot({ 
    path: 'browserleaks-test.png',
    fullPage: true 
  });

  console.log('测试完成!');
  
  // 保持浏览器打开以便查看
  // await browser.close();
})();
