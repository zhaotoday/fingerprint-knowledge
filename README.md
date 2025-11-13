# 指纹浏览器知识体系 (Browser Fingerprinting Knowledge Base)

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/yourusername/browser-fingerprint-kb?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/browser-fingerprint-kb?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/browser-fingerprint-kb)
![License](https://img.shields.io/github/license/yourusername/browser-fingerprint-kb)

**一个全面的浏览器指纹与反指纹技术知识库**

[English](./docs/README_EN.md) | 简体中文

</div>

## 📚 目录

- [什么是指纹浏览器](#什么是指纹浏览器)
- [核心概念](#核心概念)
- [技术原理](#技术原理)
- [应用场景](#应用场景)
- [开源项目](#开源项目)
- [商业产品](#商业产品)
- [学习资源](#学习资源)
- [代码示例](#代码示例)
- [最佳实践](#最佳实践)
- [相关工具](#相关工具)
- [贡献指南](#贡献指南)

---

## 🔍 什么是指纹浏览器

指纹浏览器是一种可以修改、伪装或隔离浏览器指纹的工具，主要用于：
- **隐私保护**：防止网站追踪用户身份
- **多账号管理**：安全地管理多个独立账号
- **自动化测试**：模拟不同设备和环境
- **爬虫开发**：绕过反爬虫检测

### 核心功能

1. **指纹隔离**：每个浏览器实例拥有独立的指纹特征
2. **指纹伪装**：修改 Canvas、WebGL、AudioContext 等特征
3. **环境隔离**：独立的 Cookie、LocalStorage、缓存
4. **代理管理**：为每个实例配置不同的 IP 代理
5. **自动化支持**：支持 Selenium、Puppeteer 等自动化框架

---

## 🧩 核心概念

### 浏览器指纹是什么？

浏览器指纹是通过收集浏览器和设备的各种特征信息，生成一个唯一标识符来追踪用户的技术。

### 指纹维度分类

<table>
<tr>
<td width="50%">

#### 基础指纹
- User-Agent
- 屏幕分辨率
- 时区与语言
- 字体列表
- 插件列表
- HTTP Headers

</td>
<td width="50%">

#### 高级指纹
- Canvas 指纹
- WebGL 指纹
- AudioContext 指纹
- 硬件指纹
- 行为指纹
- TCP/IP 指纹

</td>
</tr>
</table>

### 指纹技术对比

| 技术 | 唯一性 | 稳定性 | 检测难度 |
|------|--------|--------|----------|
| Canvas | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| WebGL | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| AudioContext | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Fonts | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| User-Agent | ⭐⭐ | ⭐⭐⭐ | ⭐ |

---

## 🔬 技术原理

### 1. Canvas 指纹

```javascript
// Canvas 指纹原理示例
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.textBaseline = 'top';
ctx.font = '14px Arial';
ctx.fillText('Browser Fingerprint', 2, 2);
const dataURL = canvas.toDataURL();
const fingerprint = hashFunction(dataURL);
```

**原理**：不同设备的图形渲染引擎会产生细微差异

**防护方法**：
- 注入噪声数据
- 修改渲染引擎参数
- 返回统一的渲染结果

### 2. WebGL 指纹

WebGL 通过 GPU 渲染特征来识别设备：
- GPU 厂商和型号
- 支持的扩展
- 渲染器信息
- 着色器精度

### 3. AudioContext 指纹

通过音频处理的差异来识别：
```javascript
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const analyser = audioContext.createAnalyser();
// 分析音频处理特征
```

### 4. 行为指纹

- 鼠标移动轨迹
- 键盘输入节奏
- 触摸屏操作模式
- 滚动行为特征

详细技术文档见：[技术原理深度解析](./docs/technical-principles.md)

---

## 💼 应用场景

### 合法用途

1. **隐私保护**
   - 防止广告追踪
   - 保护个人隐私
   - 匿名浏览

2. **业务需求**
   - 电商多店铺管理
   - 社交媒体矩阵运营
   - 广告投放账号管理
   - 跨境电商账号隔离

3. **开发测试**
   - 自动化测试
   - 爬虫开发
   - 兼容性测试

### 风险提示

⚠️ **请注意**：使用指纹浏览器需遵守相关法律法规和平台规则，不得用于：
- 恶意欺诈
- 刷单刷评
- 违规操作
- 侵犯他人权益

---

## 🚀 开源项目

### 核心引擎类

#### 1. [FingerprintJS](https://github.com/fingerprintjs/fingerprintjs)
- ⭐ Stars: 20k+
- 📝 描述: 最流行的浏览器指纹识别库
- 💻 语言: TypeScript
- 📄 许可: MIT

```bash
npm install @fingerprintjs/fingerprintjs
```

#### 2. [Puppeteer Extra Stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)
- ⭐ Stars: 6k+
- 📝 描述: Puppeteer 反检测插件
- 💻 语言: JavaScript
- 📄 许可: MIT

```bash
npm install puppeteer-extra puppeteer-extra-plugin-stealth
```

#### 3. [Playwright Extra](https://github.com/berstend/puppeteer-extra/tree/master/packages/playwright-extra)
- ⭐ Stars: 2k+
- 📝 描述: Playwright 增强插件
- 💻 语言: TypeScript
- 📄 许可: MIT

#### 4. [Undetected ChromeDriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver)
- ⭐ Stars: 9k+
- 📝 描述: 绕过 Selenium 检测的 ChromeDriver
- 💻 语言: Python
- 📄 许可: GPL-3.0

```bash
pip install undetected-chromedriver
```

### 指纹检测类

#### 5. [CreepJS](https://github.com/abrahamjuliot/creepjs)
- ⭐ Stars: 2k+
- 📝 描述: 全面的指纹检测工具
- 💻 语言: JavaScript
- 🌐 在线演示: https://abrahamjuliot.github.io/creepjs/

#### 6. [BrowserLeaks](https://github.com/intoli/user-agents)
- 📝 描述: 浏览器泄漏检测
- 🌐 网站: https://browserleaks.com/

#### 7. [AmIUnique](https://github.com/DIVERSIFY-project/amiunique)
- ⭐ Stars: 500+
- 📝 描述: 检测浏览器唯一性
- 🌐 网站: https://amiunique.org/

### 反指纹工具

#### 8. [Selenium Stealth](https://github.com/diprajpatra/selenium-stealth)
- ⭐ Stars: 1k+
- 📝 描述: Selenium 隐身插件
- 💻 语言: Python

```python
from selenium import webdriver
from selenium_stealth import stealth

driver = webdriver.Chrome()
stealth(driver,
    languages=["en-US", "en"],
    vendor="Google Inc.",
    platform="Win32",
    webgl_vendor="Intel Inc.",
    renderer="Intel Iris OpenGL Engine",
    fix_hairline=True,
)
```

#### 9. [FP-Scanner](https://github.com/antoinevastel/fpscanner)
- ⭐ Stars: 400+
- 📝 描述: 指纹扫描器
- 💻 语言: JavaScript

#### 10. [Chameleon](https://github.com/sereneblue/chameleon)
- ⭐ Stars: 500+
- 📝 描述: Firefox 反指纹扩展
- 💻 语言: JavaScript

### 完整浏览器方案

#### 11. [Tor Browser](https://github.com/torproject/tor-browser)
- ⭐ Stars: 1k+
- 📝 描述: 注重隐私的浏览器
- 💻 语言: C++

#### 12. [Brave Browser](https://github.com/brave/brave-browser)
- ⭐ Stars: 17k+
- 📝 描述: 内置反指纹功能
- 💻 语言: JavaScript

### 辅助工具

#### 13. [Canvas Fingerprint Defender](https://github.com/joue-quroi/canvas-fingerprint-defender)
- 📝 描述: Canvas 指纹防护扩展
- 💻 语言: JavaScript

#### 14. [User-Agent Switcher](https://github.com/ray-lothian/UserAgent-Switcher)
- ⭐ Stars: 300+
- 📝 描述: UA 切换工具
- 💻 语言: JavaScript

完整项目列表：[开源项目清单](./docs/open-source-projects.md)

---

## 💰 商业产品

### 主流指纹浏览器

| 产品 | 特点 | 价格 | 官网 |
|------|------|------|------|
| **AdsPower** | 国产，功能全面 | ¥99/月起 | https://www.adspower.com/ |
| **BitBrowser** | 比特浏览器，性价比高 | ¥99/月起 | https://www.bitbrowser.cn/ |
| **VMLogin** | 老牌产品，稳定 | $99/月起 | https://www.vmlogin.com/ |
| **Multilogin** | 国际知名 | €99/月起 | https://multilogin.com/ |
| **GoLogin** | 价格亲民 | $49/月起 | https://gologin.com/ |
| **Incogniton** | 免费版可用 | $29.99/月起 | https://incogniton.com/ |
| **Dolphin Anty** | 适合团队 | $89/月起 | https://dolphin-anty.com/ |
| **Kameleo** | 移动端支持好 | $59/月起 | https://kameleo.io/ |
| **SessionBox** | 浏览器扩展 | 免费/付费 | https://sessionbox.io/ |

详细对比：[商业产品对比](./docs/commercial-products.md)

---

## 📖 学习资源

### 官方文档

- [MDN Web API](https://developer.mozilla.org/zh-CN/docs/Web/API)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [W3C Canvas Specification](https://www.w3.org/TR/2dcontext/)

### 技术文章

#### 中文资源

- [浏览器指纹追踪技术简述](./docs/articles/fingerprint-intro.md)
- [Canvas 指纹原理与防护](./docs/articles/canvas-fingerprint.md)
- [WebGL 指纹深度解析](./docs/articles/webgl-fingerprint.md)
- [反爬虫与反反爬虫技术](./docs/articles/anti-detection.md)

#### 英文资源

- [Browser Fingerprinting: What Is It and What Should You Do About It?](https://pixelprivacy.com/resources/browser-fingerprinting/)
- [Technical analysis of client identification mechanisms](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
- [FingerprintJS Documentation](https://dev.fingerprint.com/docs)

### 学术论文

- [(Cross-)Browser Fingerprinting via OS and Hardware Level Features](https://arxiv.org/abs/1503.01408)
- [FP-Scanner: The Privacy Implications of Browser Fingerprint Inconsistencies](https://hal.inria.fr/hal-01652021/document)
- [Beauty and the Beast: Diverting Modern Web Browsers](https://www.ieee-security.org/TC/SP2014/papers/BeautyandtheBeast.pdf)

### 视频教程

- [YouTube: Browser Fingerprinting Explained](https://www.youtube.com/results?search_query=browser+fingerprinting)
- [Bilibili: 指纹浏览器教程](https://search.bilibili.com/all?keyword=指纹浏览器)

### 在线课程

- [Udemy: Web Scraping with Python](https://www.udemy.com/topic/web-scraping/)
- [Coursera: Web Security](https://www.coursera.org/learn/web-security)

### 技术博客

- [Pixelprivacy - Browser Fingerprinting](https://pixelprivacy.com/resources/browser-fingerprinting/)
- [EFF - Panopticlick](https://www.eff.org/deeplinks/2015/01/tracking-without-cookies)

完整资源列表：[学习资源汇总](./docs/learning-resources.md)

---

## 💻 代码示例

### 基础指纹检测

```javascript
// 获取基础指纹信息
function getBasicFingerprint() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack
  };
}
```

### Canvas 指纹伪装

```javascript
// 修改 Canvas 指纹
const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL = function(type) {
  const dataURL = originalToDataURL.apply(this, arguments);
  // 添加随机噪声
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = dataURL;
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] += Math.floor(Math.random() * 3) - 1;
    }
    ctx.putImageData(imageData, 0, 0);
  };
  return canvas.toDataURL(type);
};
```

### Puppeteer 反检测

```javascript
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // 设置视口
  await page.setViewport({ width: 1920, height: 1080 });
  
  // 设置 User-Agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)...');
  
  // 隐藏 WebDriver
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });
  
  await page.goto('https://example.com');
  await browser.close();
})();
```

### Python Selenium 反检测

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium_stealth import stealth

options = Options()
options.add_argument('--disable-blink-features=AutomationControlled')
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)

driver = webdriver.Chrome(options=options)

stealth(driver,
    languages=["zh-CN", "zh"],
    vendor="Google Inc.",
    platform="Win32",
    webgl_vendor="Intel Inc.",
    renderer="Intel Iris OpenGL Engine",
    fix_hairline=True,
)

driver.get("https://example.com")
```

### WebGL 指纹修改

```javascript
const getParameter = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function(parameter) {
  if (parameter === 37445) { // UNMASKED_VENDOR_WEBGL
    return 'Intel Inc.';
  }
  if (parameter === 37446) { // UNMASKED_RENDERER_WEBGL
    return 'Intel Iris OpenGL Engine';
  }
  return getParameter.apply(this, arguments);
};
```

更多示例：[代码示例库](./examples/)

---

## 🛠️ 相关工具

### 指纹检测工具

| 工具 | 描述 | 链接 |
|------|------|------|
| **Panopticlick** | EFF 的指纹测试 | https://panopticlick.eff.org/ |
| **AmIUnique** | 指纹唯一性测试 | https://amiunique.org/ |
| **BrowserLeaks** | 全面的浏览器泄漏检测 | https://browserleaks.com/ |
| **CreepJS** | 高级指纹检测 | https://abrahamjuliot.github.io/creepjs/ |
| **PixelScan** | 像素级指纹检测 | https://pixelscan.net/ |
| **Fingerprint.com** | 商业级指纹检测 | https://fingerprint.com/ |
| **Cover Your Tracks** | EFF 隐私测试 | https://coveryourtracks.eff.org/ |

### 代理工具

- **Luminati (Bright Data)**: https://brightdata.com/
- **Oxylabs**: https://oxylabs.io/
- **SmartProxy**: https://smartproxy.com/
- **IPRoyal**: https://iproyal.com/

### 浏览器扩展

- **Canvas Blocker**: 防止 Canvas 指纹
- **WebGL Fingerprint Defender**: WebGL 防护
- **Privacy Badger**: EFF 隐私保护
- **uBlock Origin**: 广告与追踪拦截

### 开发工具

- **Chrome DevTools**: 浏览器调试
- **Fiddler**: HTTP 抓包
- **Wireshark**: 网络分析
- **Postman**: API 测试

完整工具列表：[工具箱](./docs/tools.md)

---

## 📊 最佳实践

### 指纹防护策略

1. **多维度伪装**
   - 同时修改多个指纹维度
   - 保持指纹的一致性和合理性
   - 避免异常值

2. **环境隔离**
   - 使用独立的浏览器配置文件
   - 清理 Cookie 和缓存
   - 配置独立代理

3. **行为模拟**
   - 模拟真实用户操作
   - 随机化操作间隔
   - 避免机器人特征

### 检测清单

- [ ] User-Agent 合理性
- [ ] 屏幕分辨率与窗口大小一致
- [ ] 时区与 IP 地理位置匹配
- [ ] Canvas 指纹随机化
- [ ] WebGL 参数合理
- [ ] 字体列表真实
- [ ] 插件列表合理
- [ ] AudioContext 正常
- [ ] WebRTC 泄漏防护
- [ ] 行为特征自然

### 常见错误

❌ **错误做法**:
- 使用明显的爬虫 User-Agent
- 所有请求使用相同指纹
- Canvas 返回空白或固定值
- 时区与 IP 不匹配

✅ **正确做法**:
- 模拟真实浏览器环境
- 每个会话使用独立指纹
- 添加合理的随机噪声
- 保持环境一致性

详细指南：[最佳实践](./docs/best-practices.md)

---

## 🔐 隐私与安全

### 隐私保护建议

1. 使用隐私浏览器 (Tor, Brave)
2. 安装反追踪扩展
3. 定期清理浏览器数据
4. 使用 VPN/代理
5. 禁用第三方 Cookie

### 安全注意事项

⚠️ **风险提示**:
- 指纹浏览器不能保证100%匿名
- 平台可能通过其他方式识别
- 遵守法律法规和平台规则
- 不要用于非法用途

相关文档：[隐私与安全指南](./docs/privacy-security.md)

---

## 🤝 贡献指南

欢迎贡献！如果你有好的资源、工具或经验分享，请：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 贡献内容

- 📚 新的学习资源
- 🛠️ 开源项目推荐
- 💡 技术文章翻译
- 🐛 错误修正
- 📝 文档改进
- 💻 代码示例

详见：[贡献指南](./CONTRIBUTING.md)

---

## 📜 许可证

本项目采用 [MIT License](./LICENSE)

---

## ⭐ Star History

如果这个项目对你有帮助，请给一个 Star ⭐️

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/browser-fingerprint-kb&type=Date)](https://star-history.com/#yourusername/browser-fingerprint-kb&Date)

---

## 📞 联系方式

- 提交 Issue: [GitHub Issues](https://github.com/yourusername/browser-fingerprint-kb/issues)
- 讨论交流: [GitHub Discussions](https://github.com/yourusername/browser-fingerprint-kb/discussions)

---

## 🙏 致谢

感谢所有为浏览器隐私和安全做出贡献的开发者和研究者。

---

<div align="center">

**[⬆ 回到顶部](#指纹浏览器知识体系-browser-fingerprinting-knowledge-base)**

Made with ❤️ by the community

</div>
