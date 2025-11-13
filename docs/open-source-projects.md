# 开源项目清单

完整的指纹浏览器相关开源项目汇总。

## 目录

- [指纹识别库](#指纹识别库)
- [反检测工具](#反检测工具)
- [浏览器自动化](#浏览器自动化)
- [隐私保护](#隐私保护)
- [检测与分析](#检测与分析)
- [浏览器扩展](#浏览器扩展)
- [完整浏览器](#完整浏览器)
- [代理工具](#代理工具)

---

## 指纹识别库

### 1. FingerprintJS
**GitHub**: https://github.com/fingerprintjs/fingerprintjs  
**Stars**: ⭐ 20,000+  
**语言**: TypeScript  
**许可**: MIT  

最流行的浏览器指纹识别库，提供高精度的设备识别。

**安装**:
```bash
npm install @fingerprintjs/fingerprintjs
```

**使用**:
```javascript
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fpPromise = FingerprintJS.load();

(async () => {
  const fp = await fpPromise;
  const result = await fp.get();
  console.log('Visitor ID:', result.visitorId);
})();
```

**特性**:
- ✅ 99.5% 准确率
- ✅ Canvas/WebGL 指纹
- ✅ AudioContext 指纹
- ✅ 字体检测
- ✅ 商业版本可用

---

### 2. ClientJS
**GitHub**: https://github.com/jackspirou/clientjs  
**Stars**: ⭐ 2,000+  
**语言**: JavaScript  
**许可**: MIT

轻量级的设备指纹库。

**使用**:
```javascript
const client = new ClientJS();
const fingerprint = client.getFingerprint();
const customFingerprint = client.getCustomFingerprint(
  'userAgent',
  'screenPrint',
  'colorDepth'
);
```

**特性**:
- 浏览器信息
- 设备信息
- 屏幕分辨率
- 字体检测

---

### 3. Imprintjs
**GitHub**: https://github.com/mattbrailsford/imprintjs  
**Stars**: ⭐ 600+  
**语言**: JavaScript  
**许可**: MIT

简单的浏览器指纹库。

```javascript
imprint.test(function(result){
  console.log(result);
});
```

---

## 反检测工具

### 4. Puppeteer Extra Stealth
**GitHub**: https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth  
**Stars**: ⭐ 6,000+  
**语言**: JavaScript  
**许可**: MIT

Puppeteer 的反检测插件套件。

**安装**:
```bash
npm install puppeteer-extra puppeteer-extra-plugin-stealth
```

**使用**:
```javascript
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://bot.sannysoft.com');
  await page.screenshot({ path: 'test.png' });
  await browser.close();
})();
```

**防护内容**:
- ✅ chrome.runtime 伪装
- ✅ navigator.webdriver 隐藏
- ✅ navigator.permissions 绕过
- ✅ navigator.plugins 伪装
- ✅ navigator.languages 伪装
- ✅ WebGL vendor 伪装
- ✅ iframe.contentWindow 修复
- ✅ media.codecs 伪装

---

### 5. Undetected ChromeDriver
**GitHub**: https://github.com/ultrafunkamsterdam/undetected-chromedriver  
**Stars**: ⭐ 9,000+  
**语言**: Python  
**许可**: GPL-3.0

绕过 Selenium 检测的 ChromeDriver。

**安装**:
```bash
pip install undetected-chromedriver
```

**使用**:
```python
import undetected_chromedriver as uc

driver = uc.Chrome()
driver.get('https://nowsecure.nl')
driver.save_screenshot('screenshot.png')
driver.quit()
```

**特性**:
- ✅ 自动绕过 Cloudflare
- ✅ 绕过 reCAPTCHA v3
- ✅ 绕过 PerimeterX
- ✅ 隐藏自动化特征

---

### 6. Selenium Stealth
**GitHub**: https://github.com/diprajpatra/selenium-stealth  
**Stars**: ⭐ 1,000+  
**语言**: Python  
**许可**: MIT

Selenium 的隐身插件。

**安装**:
```bash
pip install selenium-stealth
```

**使用**:
```python
from selenium import webdriver
from selenium_stealth import stealth

options = webdriver.ChromeOptions()
options.add_argument("start-maximized")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)

driver = webdriver.Chrome(options=options)

stealth(driver,
    languages=["en-US", "en"],
    vendor="Google Inc.",
    platform="Win32",
    webgl_vendor="Intel Inc.",
    renderer="Intel Iris OpenGL Engine",
    fix_hairline=True,
)

driver.get("https://bot.sannysoft.com")
```

---

### 7. Playwright Stealth
**GitHub**: https://github.com/AtuboDad/playwright_stealth  
**Stars**: ⭐ 300+  
**语言**: Python  
**许可**: MIT

Playwright 的隐身插件（Python 版本）。

**安装**:
```bash
pip install playwright-stealth
```

**使用**:
```python
from playwright.sync_api import sync_playwright
from playwright_stealth import stealth_sync

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    stealth_sync(page)
    page.goto('https://bot.sannysoft.com')
    browser.close()
```

---

## 浏览器自动化

### 8. Puppeteer
**GitHub**: https://github.com/puppeteer/puppeteer  
**Stars**: ⭐ 87,000+  
**语言**: TypeScript  
**许可**: Apache-2.0

Google 官方的 Node.js 浏览器自动化库。

**安装**:
```bash
npm install puppeteer
```

**使用**:
```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
```

---

### 9. Playwright
**GitHub**: https://github.com/microsoft/playwright  
**Stars**: ⭐ 60,000+  
**语言**: TypeScript  
**许可**: Apache-2.0

微软开发的跨浏览器自动化工具。

**安装**:
```bash
npm install -D @playwright/test
```

**使用**:
```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
```

**支持浏览器**:
- Chromium
- Firefox
- WebKit

---

### 10. Selenium WebDriver
**GitHub**: https://github.com/SeleniumHQ/selenium  
**Stars**: ⭐ 29,000+  
**语言**: Java, Python, C#, Ruby, JavaScript  
**许可**: Apache-2.0

最流行的浏览器自动化框架。

**Python 使用**:
```python
from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://example.com")
driver.save_screenshot('example.png')
driver.quit()
```

---

## 隐私保护

### 11. Tor Browser
**GitHub**: https://github.com/torproject/tor-browser  
**Stars**: ⭐ 1,000+  
**语言**: C++, JavaScript  
**许可**: BSD

注重隐私的浏览器。

**特性**:
- ✅ Tor 网络匿名
- ✅ 反指纹追踪
- ✅ NoScript 默认启用
- ✅ HTTPS Everywhere

**下载**: https://www.torproject.org/download/

---

### 12. Brave Browser
**GitHub**: https://github.com/brave/brave-browser  
**Stars**: ⭐ 17,000+  
**语言**: JavaScript  
**许可**: MPL-2.0

内置隐私保护和广告拦截的浏览器。

**特性**:
- ✅ 广告拦截
- ✅ Tracker 拦截
- ✅ 指纹防护
- ✅ Tor 集成

**下载**: https://brave.com/

---

### 13. Privacy Badger
**GitHub**: https://github.com/EFForg/privacybadger  
**Stars**: ⭐ 3,000+  
**语言**: JavaScript  
**许可**: GPL-3.0

EFF 开发的隐私保护扩展。

**安装**:
- [Chrome Web Store](https://chrome.google.com/webstore/detail/privacy-badger/pkehgijcmpdhfbdbbnkijodmdjhbjlgp)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/privacy-badger17/)

---

### 14. uBlock Origin
**GitHub**: https://github.com/gorhill/uBlock  
**Stars**: ⭐ 43,000+  
**语言**: JavaScript  
**许可**: GPL-3.0

高效的广告和追踪器拦截器。

**特性**:
- ✅ 轻量级
- ✅ 高效拦截
- ✅ 自定义规则
- ✅ 支持多种过滤列表

---

## 检测与分析

### 15. CreepJS
**GitHub**: https://github.com/abrahamjuliot/creepjs  
**Stars**: ⭐ 2,000+  
**语言**: JavaScript  
**许可**: LGPL-3.0

全面的指纹检测工具。

**在线演示**: https://abrahamjuliot.github.io/creepjs/

**检测内容**:
- Canvas 指纹
- WebGL 指纹
- AudioContext 指纹
- 字体检测
- 硬件信息
- 浏览器特征
- 谎言检测（不一致的数据）

---

### 16. FP-Scanner
**GitHub**: https://github.com/antoinevastel/fpscanner  
**Stars**: ⭐ 400+  
**语言**: JavaScript  
**许可**: MIT

学术研究用的指纹扫描器。

**使用**:
```javascript
const fpScanner = require('fp-scanner');

fpScanner.scan().then(fingerprint => {
  console.log(fingerprint);
});
```

---

### 17. AmIUnique
**GitHub**: https://github.com/DIVERSIFY-project/amiunique  
**Stars**: ⭐ 500+  
**语言**: JavaScript, Python  
**许可**: MIT

检测浏览器唯一性的工具。

**在线测试**: https://amiunique.org/

**收集数据**:
- User-Agent
- HTTP Headers
- Canvas 指纹
- WebGL 指纹
- 字体列表
- 插件列表

---

### 18. User-Agents
**GitHub**: https://github.com/intoli/user-agents  
**Stars**: ⭐ 1,000+  
**语言**: JavaScript  
**许可**: BSD-3

生成随机但真实的 User-Agent。

**安装**:
```bash
npm install user-agents
```

**使用**:
```javascript
const UserAgent = require('user-agents');

const userAgent = new UserAgent();
console.log(userAgent.toString());

// 生成移动端 UA
const mobileAgent = new UserAgent({ deviceCategory: 'mobile' });
console.log(mobileAgent.toString());
```

---

## 浏览器扩展

### 19. Canvas Fingerprint Defender
**GitHub**: https://github.com/joue-quroi/canvas-fingerprint-defender  
**Stars**: ⭐ 200+  
**语言**: JavaScript  
**许可**: MIT

防止 Canvas 指纹追踪。

**Chrome 扩展**: [Canvas Fingerprint Defender](https://chrome.google.com/webstore/detail/canvas-fingerprint-defend/lanfdkkpgfjfdikkncbnojekcppdebfp)

---

### 20. Chameleon
**GitHub**: https://github.com/sereneblue/chameleon  
**Stars**: ⭐ 500+  
**语言**: JavaScript  
**许可**: GPL-3.0

随机化浏览器指纹的扩展。

**特性**:
- ✅ User-Agent 欺骗
- ✅ 屏幕分辨率欺骗
- ✅ 时区欺骗
- ✅ WebGL 欺骗
- ✅ Canvas 欺骗
- ✅ AudioContext 欺骗

**安装**:
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/chameleon-ext/)
- [Chrome](https://chrome.google.com/webstore/detail/chameleon/mibkekaeammmakbpkhpfhihfpfhpnepe)

---

### 21. User-Agent Switcher
**GitHub**: https://github.com/ray-lothian/UserAgent-Switcher  
**Stars**: ⭐ 300+  
**语言**: JavaScript  
**许可**: MPL-2.0

切换 User-Agent 的扩展。

**特性**:
- ✅ 预设 UA 列表
- ✅ 自定义 UA
- ✅ 快速切换
- ✅ 按域名设置

---

### 22. WebRTC Leak Prevent
**GitHub**: https://github.com/aghorler/WebRTC-Leak-Prevent  
**Stars**: ⭐ 400+  
**语言**: JavaScript  
**许可**: MIT

防止 WebRTC IP 泄漏。

**Chrome 扩展**: [WebRTC Leak Prevent](https://chrome.google.com/webstore/detail/webrtc-leak-prevent/eiadekoaikejlgdbkbdfeijglgfdalml)

---

## 完整浏览器

### 23. LibreWolf
**GitHub**: https://github.com/LibreWolf-Community/browser  
**Stars**: ⭐ 1,000+  
**语言**: C++  
**许可**: MPL-2.0

注重隐私的 Firefox 分支。

**特性**:
- ✅ 默认禁用遥测
- ✅ 增强隐私设置
- ✅ 内置 uBlock Origin
- ✅ 抵抗指纹追踪

**下载**: https://librewolf.net/

---

### 24. Ungoogled Chromium
**GitHub**: https://github.com/ungoogled-software/ungoogled-chromium  
**Stars**: ⭐ 19,000+  
**语言**: Python  
**许可**: BSD-3

移除 Google 服务的 Chromium。

**特性**:
- ✅ 无 Google 集成
- ✅ 增强隐私
- ✅ 移除追踪
- ✅ 保持兼容性

**下载**: https://ungoogled-software.github.io/

---

## 代理工具

### 25. Proxy Chain
**GitHub**: https://github.com/apify/proxy-chain  
**Stars**: ⭐ 700+  
**语言**: JavaScript  
**许可**: Apache-2.0

Node.js 代理服务器实现。

**安装**:
```bash
npm install proxy-chain
```

**使用**:
```javascript
const { Server } = require('proxy-chain');

const server = new Server({
    port: 8000,
    prepareRequestFunction: ({ request, username, password }) => {
        return {
            requestAuthentication: username !== 'user' || password !== 'pass',
        };
    },
});

await server.listen();
```

---

### 26. Luminati Proxy Manager
**GitHub**: https://github.com/luminati-io/luminati-proxy  
**Stars**: ⭐ 500+  
**语言**: JavaScript  
**许可**: MIT

Luminati 代理管理器（开源版本）。

**安装**:
```bash
npm install -g @luminati-io/luminati-proxy
```

---

### 27. ProxyBroker
**GitHub**: https://github.com/constverum/ProxyBroker  
**Stars**: ⭐ 3,000+  
**语言**: Python  
**许可**: Apache-2.0

异步代理服务器查找和检查工具。

**安装**:
```bash
pip install proxybroker
```

**使用**:
```python
from proxybroker import Broker

async def show(proxies):
    while True:
        proxy = await proxies.get()
        if proxy is None:
            break
        print(f'Found proxy: {proxy}')

proxies = asyncio.Queue()
broker = Broker(proxies)
tasks = asyncio.gather(
    broker.find(types=['HTTP', 'HTTPS'], limit=10),
    show(proxies))

loop = asyncio.get_event_loop()
loop.run_until_complete(tasks)
```

---

## 其他有用工具

### 28. FakeIt
**GitHub**: https://github.com/lk-geimfari/mimesis  
**Stars**: ⭐ 4,000+  
**语言**: Python  
**许可**: MIT

生成假数据的库。

**安装**:
```bash
pip install mimesis
```

**使用**:
```python
from mimesis import Person
from mimesis.locales import Locale

person = Person(Locale.EN)

print(person.full_name())
print(person.email())
print(person.telephone())
```

---

### 29. Faker.js
**GitHub**: https://github.com/faker-js/faker  
**Stars**: ⭐ 12,000+  
**语言**: TypeScript  
**许可**: MIT

JavaScript 假数据生成器。

**安装**:
```bash
npm install @faker-js/faker
```

**使用**:
```javascript
import { faker } from '@faker-js/faker';

console.log(faker.person.fullName());
console.log(faker.internet.email());
console.log(faker.phone.number());
```

---

### 30. Headless Recorder
**GitHub**: https://github.com/checkly/headless-recorder  
**Stars**: ⭐ 2,000+  
**语言**: JavaScript  
**许可**: MIT

Chrome 扩展，记录浏览器操作并生成 Puppeteer/Playwright 代码。

**安装**: [Chrome Web Store](https://chrome.google.com/webstore/detail/headless-recorder/djeegiggegleadkkbgopoonhjimgehda)

---

## 学习资源项目

### 31. Awesome Browser Fingerprinting
**GitHub**: https://github.com/niespodd/awesome-browser-fingerprinting  
**Stars**: ⭐ 300+  
**语言**: -  
**许可**: CC0-1.0

浏览器指纹相关资源集合。

---

### 32. Awesome Web Security
**GitHub**: https://github.com/qazbnm456/awesome-web-security  
**Stars**: ⭐ 10,000+  
**语言**: -  
**许可**: CC0-1.0

Web 安全资源集合。

---

## 贡献

如果你知道其他优秀的开源项目，欢迎提交 PR！

---

[返回主页](../README.md)
