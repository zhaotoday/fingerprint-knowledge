# 代码示例

本目录包含各种浏览器指纹检测和防护的实用代码示例。

## 📁 文件说明

### JavaScript 示例

#### 1. `fingerprint-detection.js`
**完整的浏览器指纹检测工具**

**功能**:
- ✅ 基础信息收集（User-Agent, Platform 等）
- ✅ 硬件信息检测（CPU、内存、屏幕）
- ✅ Canvas 指纹生成
- ✅ WebGL 指纹提取
- ✅ AudioContext 指纹
- ✅ 字体检测
- ✅ 插件枚举
- ✅ 时区检测
- ✅ WebRTC IP 泄漏检测

**使用方法**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>指纹检测测试</title>
</head>
<body>
    <h1>浏览器指纹检测</h1>
    <div id="result"></div>
    
    <script src="fingerprint-detection.js"></script>
</body>
</html>
```

或在浏览器控制台直接运行：
```javascript
// 复制 fingerprint-detection.js 的内容到控制台
// 查看 window.fingerprint 获取结果
```

---

#### 2. `fingerprint-protection.js`
**浏览器指纹防护脚本**

**功能**:
- ✅ User-Agent 伪装
- ✅ WebDriver 隐藏
- ✅ Chrome 对象伪装
- ✅ Canvas 噪声注入
- ✅ WebGL 参数修改
- ✅ AudioContext 干扰
- ✅ 字体检测防护
- ✅ WebRTC 保护
- ✅ 插件列表伪装

**使用方法 1: Puppeteer**
```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');

const protectionScript = fs.readFileSync('./fingerprint-protection.js', 'utf8');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // 在每个新页面加载前注入脚本
  await page.evaluateOnNewDocument(protectionScript);
  
  await page.goto('https://bot.sannysoft.com');
  await browser.close();
})();
```

**使用方法 2: Tampermonkey**
1. 安装 Tampermonkey 扩展
2. 创建新脚本
3. 复制 `fingerprint-protection.js` 内容
4. 添加脚本头部：
```javascript
// ==UserScript==
// @name         指纹防护
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  防止浏览器指纹追踪
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

// 在这里粘贴 fingerprint-protection.js 的内容
```

---

#### 3. `puppeteer-stealth-demo.js`
**Puppeteer Stealth 插件使用示例**

**功能**:
- ✅ 使用 puppeteer-extra-plugin-stealth
- ✅ 完整的反检测配置
- ✅ 自动测试多个检测网站
- ✅ 自动截图保存结果

**安装依赖**:
```bash
npm install puppeteer-extra puppeteer-extra-plugin-stealth puppeteer
```

**运行**:
```bash
node puppeteer-stealth-demo.js
```

**输出**:
- `bot-detection-test.png` - Sannysoft 检测结果
- `amiunique-test.png` - AmIUnique 检测结果
- `browserleaks-test.png` - BrowserLeaks 检测结果

---

### Python 示例

#### 4. `selenium-stealth-demo.py`
**Selenium Stealth 使用示例**

**功能**:
- ✅ 使用 selenium-stealth 库
- ✅ Chrome 反检测配置
- ✅ 指纹信息检查
- ✅ 自动化测试多个网站

**安装依赖**:
```bash
pip install selenium selenium-stealth webdriver-manager
```

**运行**:
```bash
python selenium-stealth-demo.py
```

**输出**:
- `selenium-bot-detection.png` - Sannysoft 检测结果
- `selenium-browserleaks.png` - BrowserLeaks 检测结果
- `selenium-pixelscan.png` - PixelScan 检测结果
- 控制台输出当前浏览器指纹信息

---

## 🚀 快速开始

### JavaScript 环境

1. **测试指纹检测**
```bash
# 创建 HTML 文件
cat > test.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>指纹检测测试</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        pre { background: #f4f4f4; padding: 15px; overflow: auto; }
    </style>
</head>
<body>
    <h1>浏览器指纹检测工具</h1>
    <p>打开控制台查看详细信息</p>
    <div id="output"></div>
    <script src="fingerprint-detection.js"></script>
</body>
</html>
EOF

# 在浏览器中打开 test.html
```

2. **测试指纹防护**
```bash
# 创建测试文件
cat > test-protection.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>指纹防护测试</title>
</head>
<body>
    <h1>指纹防护测试</h1>
    <p>此页面已启用指纹防护</p>
    
    <!-- 先加载防护脚本 -->
    <script src="fingerprint-protection.js"></script>
    
    <!-- 再加载检测脚本 -->
    <script src="fingerprint-detection.js"></script>
    
    <script>
        console.log('对比开启防护前后的指纹差异');
    </script>
</body>
</html>
EOF
```

3. **Puppeteer 测试**
```bash
# 安装依赖
npm install puppeteer-extra puppeteer-extra-plugin-stealth puppeteer

# 运行示例
node puppeteer-stealth-demo.js
```

---

### Python 环境

1. **安装依赖**
```bash
# 创建虚拟环境（推荐）
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate  # Windows

# 安装所需包
pip install selenium selenium-stealth webdriver-manager
```

2. **运行 Selenium 示例**
```bash
python selenium-stealth-demo.py
```

3. **自定义使用**
```python
from selenium import webdriver
from selenium_stealth import stealth

# 创建驱动
driver = webdriver.Chrome()

# 应用隐身配置
stealth(driver,
    languages=["zh-CN", "zh"],
    vendor="Google Inc.",
    platform="Win32",
    webgl_vendor="Intel Inc.",
    renderer="Intel Iris OpenGL Engine",
    fix_hairline=True,
)

# 开始使用
driver.get("https://example.com")
```

---

## 📊 测试网站

使用这些网站测试你的反检测效果：

### 机器人检测
- https://bot.sannysoft.com/ - 综合机器人检测
- https://arh.antoinevastel.com/bots/areyouheadless - Headless 检测
- https://infosimples.github.io/detect-headless/ - Headless Chrome 检测

### 指纹检测
- https://amiunique.org/ - 浏览器唯一性
- https://panopticlick.eff.org/ - EFF 指纹测试
- https://coveryourtracks.eff.org/ - EFF 隐私测试
- https://browserleaks.com/ - 全面的浏览器泄漏检测
- https://pixelscan.net/ - 像素级检测

### 专项测试
- https://browserleaks.com/canvas - Canvas 指纹
- https://browserleaks.com/webgl - WebGL 指纹
- https://browserleaks.com/webrtc - WebRTC 泄漏
- https://browserleaks.com/fonts - 字体检测
- https://ipleak.net/ - IP 泄漏检测

---

## 🔧 高级用法

### 组合使用

**完整的反检测方案（Puppeteer）**:
```javascript
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

// 使用 stealth 插件
puppeteer.use(StealthPlugin());

// 读取自定义防护脚本
const customProtection = fs.readFileSync('./fingerprint-protection.js', 'utf8');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
    ]
  });

  const page = await browser.newPage();

  // 设置视口
  await page.setViewport({ width: 1920, height: 1080 });

  // 注入自定义防护脚本
  await page.evaluateOnNewDocument(customProtection);

  // 设置 User-Agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  );

  // 设置语言
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9'
  });

  // 访问目标网站
  await page.goto('https://bot.sannysoft.com');
  
  // 进行你的操作...

  await browser.close();
})();
```

**完整的反检测方案（Selenium）**:
```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium_stealth import stealth

def create_stealth_driver():
    options = Options()
    
    # 反检测选项
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    
    # 其他选项
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1920,1080')
    
    # 创建驱动
    driver = webdriver.Chrome(options=options)
    
    # 应用 stealth
    stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
    )
    
    # 注入额外的防护脚本
    with open('fingerprint-protection.js', 'r', encoding='utf-8') as f:
        protection_js = f.read()
    
    driver.execute_cdp_cmd('Page.addScriptToEvaluateOnNewDocument', {
        'source': protection_js
    })
    
    return driver

# 使用
driver = create_stealth_driver()
driver.get('https://bot.sannysoft.com')
```

---

## 📝 注意事项

### 1. 兼容性
- 确保浏览器版本与 WebDriver 版本匹配
- 某些防护方法可能影响正常功能
- 测试时使用真实的浏览器环境

### 2. 法律合规
- ⚠️ 仅用于合法目的
- 遵守网站的 robots.txt 和服务条款
- 不要用于恶意攻击或欺诈

### 3. 最佳实践
- 不要使用单一的防护方法
- 定期更新反检测策略
- 使用高质量的代理
- 模拟真实用户行为
- 控制请求频率

### 4. 调试技巧
- 使用 `headless: false` 查看浏览器行为
- 在检测网站上测试效果
- 查看控制台输出
- 使用截图记录结果

---

## 🤝 贡献

欢迎提交新的示例代码！

**贡献方式**:
1. Fork 项目
2. 添加你的示例到 `examples/` 目录
3. 更新此 README
4. 提交 Pull Request

---

## 📚 相关资源

- [主文档](../README.md)
- [技术原理](../docs/technical-principles.md)
- [开源项目](../docs/open-source-projects.md)
- [学习资源](../docs/learning-resources.md)

---

## ⚖️ 许可证

所有示例代码采用 MIT 许可证。

---

**提示**: 这些示例仅供学习和研究使用。在生产环境中使用前，请确保理解其工作原理和潜在风险。
