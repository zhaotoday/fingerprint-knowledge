# 技术原理深度解析

## 目录

- [浏览器指纹概述](#浏览器指纹概述)
- [Canvas 指纹](#canvas-指纹)
- [WebGL 指纹](#webgl-指纹)
- [AudioContext 指纹](#audiocontext-指纹)
- [字体指纹](#字体指纹)
- [硬件指纹](#硬件指纹)
- [行为指纹](#行为指纹)
- [网络指纹](#网络指纹)
- [防护技术](#防护技术)

---

## 浏览器指纹概述

### 什么是浏览器指纹？

浏览器指纹是通过收集浏览器和设备的各种特征信息，生成一个唯一或高度独特的标识符。即使用户清除 Cookie，这些特征仍然可以用来追踪用户。

### 指纹分类

#### 1. 主动指纹（Active Fingerprinting）
需要执行 JavaScript 代码来收集：
- Canvas/WebGL 渲染
- AudioContext 处理
- 字体枚举
- 插件检测

#### 2. 被动指纹（Passive Fingerprinting）
通过 HTTP 请求头自动收集：
- User-Agent
- Accept-Language
- Accept-Encoding
- Referer

#### 3. 跨浏览器指纹（Cross-Browser Fingerprinting）
基于硬件和操作系统的特征：
- CPU 核心数
- GPU 信息
- 屏幕分辨率
- 系统字体

---

## Canvas 指纹

### 原理

Canvas API 用于在网页上绘制图形。不同的设备由于以下差异会产生略微不同的渲染结果：
- 图形卡型号
- 驱动程序版本
- 操作系统
- 字体渲染引擎
- 抗锯齿算法

### 实现方式

```javascript
function getCanvasFingerprint() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // 设置文本属性
  ctx.textBaseline = 'top';
  ctx.font = '14px "Arial"';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#f60';
  ctx.fillRect(125, 1, 62, 20);
  
  // 绘制文本
  ctx.fillStyle = '#069';
  ctx.fillText('Browser Fingerprint 🎨', 2, 15);
  
  // 绘制更多内容增加熵
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
  ctx.fillText('Canvas fingerprinting', 4, 17);
  
  // 转换为数据URL
  const dataURL = canvas.toDataURL();
  
  // 生成哈希
  return hashFunction(dataURL);
}
```

### 检测到的信息

- 像素渲染差异
- 字体渲染方式
- 颜色处理
- 图形加速方式

### 防护方法

#### 方法1：返回空白画布
```javascript
HTMLCanvasElement.prototype.toDataURL = function() {
  return 'data:image/png;base64,iVBORw0KG...'; // 固定值
};
```
❌ **缺点**：容易被检测为异常

#### 方法2：添加随机噪声
```javascript
const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL = function(type) {
  // 添加轻微的随机噪声
  const ctx = this.getContext('2d');
  const imageData = ctx.getImageData(0, 0, this.width, this.height);
  
  for (let i = 0; i < imageData.data.length; i += 4) {
    // 随机修改1-2个像素值
    if (Math.random() < 0.1) {
      imageData.data[i] = Math.min(255, imageData.data[i] + Math.floor(Math.random() * 3) - 1);
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  return originalToDataURL.apply(this, arguments);
};
```
✅ **优点**：更自然，难以检测

#### 方法3：阻止 Canvas 读取
```javascript
const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
CanvasRenderingContext2D.prototype.getImageData = function() {
  const imageData = originalGetImageData.apply(this, arguments);
  // 添加噪声或返回修改后的数据
  return imageData;
};
```

---

## WebGL 指纹

### 原理

WebGL 通过 GPU 渲染 3D 图形，不同的 GPU 和驱动会产生独特的渲染结果。

### 收集的信息

```javascript
function getWebGLFingerprint() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return null;
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  
  return {
    // 基础信息
    vendor: gl.getParameter(gl.VENDOR),
    renderer: gl.getParameter(gl.RENDERER),
    version: gl.getParameter(gl.VERSION),
    shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
    
    // 详细信息（如果有扩展）
    unmaskedVendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : null,
    unmaskedRenderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null,
    
    // 支持的扩展
    supportedExtensions: gl.getSupportedExtensions(),
    
    // 参数
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
    maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
    
    // 着色器精度
    vertexShaderPrecision: getShaderPrecision(gl, gl.VERTEX_SHADER),
    fragmentShaderPrecision: getShaderPrecision(gl, gl.FRAGMENT_SHADER)
  };
}

function getShaderPrecision(gl, shaderType) {
  const precisionFormats = ['LOW_FLOAT', 'MEDIUM_FLOAT', 'HIGH_FLOAT', 'LOW_INT', 'MEDIUM_INT', 'HIGH_INT'];
  const precision = {};
  
  precisionFormats.forEach(format => {
    const formatInfo = gl.getShaderPrecisionFormat(shaderType, gl[format]);
    precision[format] = {
      rangeMin: formatInfo.rangeMin,
      rangeMax: formatInfo.rangeMax,
      precision: formatInfo.precision
    };
  });
  
  return precision;
}
```

### WebGL 渲染指纹

```javascript
function getWebGLRenderFingerprint() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  
  // 创建着色器程序
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `);
  gl.compileShader(vertexShader);
  
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `);
  gl.compileShader(fragmentShader);
  
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  
  // 绘制三角形
  const vertices = new Float32Array([-1, -1, 1, -1, 0, 1]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  
  // 读取像素
  const pixels = new Uint8Array(canvas.width * canvas.height * 4);
  gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  
  return hashFunction(pixels);
}
```

### 防护方法

```javascript
// 修改 WebGL 参数
const getParameter = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function(parameter) {
  // 伪装 GPU 信息
  if (parameter === 37445) { // UNMASKED_VENDOR_WEBGL
    return 'Intel Inc.';
  }
  if (parameter === 37446) { // UNMASKED_RENDERER_WEBGL
    return 'Intel Iris OpenGL Engine';
  }
  
  // 修改其他参数
  if (parameter === 3379) { // MAX_TEXTURE_SIZE
    return 8192;
  }
  
  return getParameter.apply(this, arguments);
};

// 禁用 debug 扩展
const getExtension = WebGLRenderingContext.prototype.getExtension;
WebGLRenderingContext.prototype.getExtension = function(name) {
  if (name === 'WEBGL_debug_renderer_info') {
    return null; // 阻止获取真实 GPU 信息
  }
  return getExtension.apply(this, arguments);
};
```

---

## AudioContext 指纹

### 原理

Web Audio API 用于音频处理。不同的硬件和浏览器在音频处理上会有细微差异。

### 实现方式

```javascript
function getAudioFingerprint() {
  return new Promise((resolve) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // 创建振荡器
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.value = 10000;
    
    // 创建动态压缩器
    const compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;
    
    // 连接节点
    oscillator.connect(compressor);
    compressor.connect(audioContext.destination);
    
    // 开始生成音频
    oscillator.start(0);
    
    // 创建分析器
    const analyser = audioContext.createAnalyser();
    compressor.connect(analyser);
    
    // 获取音频数据
    setTimeout(() => {
      const dataArray = new Float32Array(analyser.frequencyBinCount);
      analyser.getFloatFrequencyData(dataArray);
      
      oscillator.stop();
      audioContext.close();
      
      // 计算哈希
      const fingerprint = hashFunction(dataArray);
      resolve(fingerprint);
    }, 100);
  });
}
```

### 收集的信息

```javascript
function getAudioContextInfo() {
  const audioContext = new AudioContext();
  
  return {
    sampleRate: audioContext.sampleRate,
    state: audioContext.state,
    maxChannelCount: audioContext.destination.maxChannelCount,
    numberOfInputs: audioContext.destination.numberOfInputs,
    numberOfOutputs: audioContext.destination.numberOfOutputs,
    channelCount: audioContext.destination.channelCount,
    channelCountMode: audioContext.destination.channelCountMode,
    channelInterpretation: audioContext.destination.channelInterpretation
  };
}
```

### 防护方法

```javascript
// 修改 AudioContext 属性
const AudioContext = window.AudioContext || window.webkitAudioContext;
const OriginalAudioContext = AudioContext;

window.AudioContext = function() {
  const context = new OriginalAudioContext();
  
  // 修改采样率
  Object.defineProperty(context, 'sampleRate', {
    get: () => 44100 // 统一采样率
  });
  
  return context;
};
```

---

## 字体指纹

### 原理

通过检测系统安装的字体列表来识别用户。不同的操作系统和用户安装的软件会导致字体列表不同。

### 检测方法

#### 方法1：使用 Canvas 测量
```javascript
function getFonts() {
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const testFonts = [
    'Arial', 'Verdana', 'Times New Roman', 'Courier New',
    'Comic Sans MS', 'Impact', 'Georgia', 'Trebuchet MS',
    'Arial Black', 'Palatino', 'Garamond', 'Bookman',
    'Courier', 'Helvetica', 'Geneva', 'Monaco',
    // 中文字体
    'Microsoft YaHei', 'SimSun', 'SimHei', 'KaiTi',
    'FangSong', 'NSimSun', 'PMingLiU', 'MingLiU',
    // Mac 字体
    'Heiti SC', 'Songti SC', 'STHeiti', 'STSong',
    'PingFang SC', 'Hiragino Sans GB',
    // 设计字体
    'Futura', 'Gill Sans', 'Optima', 'Avenir'
  ];
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const text = 'mmmmmmmmmmlli';
  
  const baseSizes = {};
  baseFonts.forEach(baseFont => {
    ctx.font = `72px ${baseFont}`;
    baseSizes[baseFont] = ctx.measureText(text).width;
  });
  
  const detectedFonts = [];
  
  testFonts.forEach(font => {
    let detected = false;
    baseFonts.forEach(baseFont => {
      ctx.font = `72px "${font}", ${baseFont}`;
      const width = ctx.measureText(text).width;
      if (width !== baseSizes[baseFont]) {
        detected = true;
      }
    });
    if (detected) {
      detectedFonts.push(font);
    }
  });
  
  return detectedFonts;
}
```

#### 方法2：使用 CSS Font Loading API
```javascript
async function getFontsModern() {
  const fonts = [
    'Arial', 'Verdana', 'Times New Roman', 'Courier New',
    'Microsoft YaHei', 'SimSun', 'SimHei'
  ];
  
  const detectedFonts = [];
  
  for (const font of fonts) {
    try {
      const fontFace = new FontFace(font, `local("${font}")`);
      await fontFace.load();
      detectedFonts.push(font);
    } catch (e) {
      // 字体不存在
    }
  }
  
  return detectedFonts;
}
```

### 防护方法

```javascript
// 方法1：禁用字体枚举
if (window.FontFaceSet) {
  delete window.FontFaceSet.prototype.load;
}

// 方法2：返回固定的字体列表
const measureText = CanvasRenderingContext2D.prototype.measureText;
CanvasRenderingContext2D.prototype.measureText = function(text) {
  // 返回标准化的测量结果
  const result = measureText.apply(this, arguments);
  // 添加随机噪声
  result.width += (Math.random() - 0.5) * 0.1;
  return result;
};
```

---

## 硬件指纹

### CPU 信息

```javascript
function getCPUInfo() {
  return {
    hardwareConcurrency: navigator.hardwareConcurrency, // CPU 核心数
    platform: navigator.platform,
    deviceMemory: navigator.deviceMemory, // GB
    maxTouchPoints: navigator.maxTouchPoints
  };
}
```

### 屏幕信息

```javascript
function getScreenInfo() {
  return {
    // 屏幕尺寸
    screenWidth: screen.width,
    screenHeight: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    
    // 颜色深度
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    
    // 像素比
    devicePixelRatio: window.devicePixelRatio,
    
    // 屏幕方向
    orientation: screen.orientation?.type
  };
}
```

### 电池信息

```javascript
async function getBatteryInfo() {
  if (!navigator.getBattery) return null;
  
  const battery = await navigator.getBattery();
  return {
    charging: battery.charging,
    chargingTime: battery.chargingTime,
    dischargingTime: battery.dischargingTime,
    level: battery.level
  };
}
```

### 防护方法

```javascript
// 修改硬件并发数
Object.defineProperty(navigator, 'hardwareConcurrency', {
  get: () => 4 // 统一返回4核
});

// 修改内存信息
Object.defineProperty(navigator, 'deviceMemory', {
  get: () => 8 // 统一返回8GB
});

// 禁用电池 API
delete navigator.getBattery;
```

---

## 行为指纹

### 鼠标移动轨迹

```javascript
let mouseMovements = [];

document.addEventListener('mousemove', (e) => {
  mouseMovements.push({
    x: e.clientX,
    y: e.clientY,
    timestamp: Date.now()
  });
});

function analyzeMouseBehavior() {
  // 计算速度、加速度、曲率等特征
  const features = {
    avgSpeed: calculateAverageSpeed(mouseMovements),
    maxSpeed: calculateMaxSpeed(mouseMovements),
    avgAcceleration: calculateAverageAcceleration(mouseMovements),
    curvature: calculateCurvature(mouseMovements)
  };
  
  return features;
}
```

### 键盘输入节奏

```javascript
let keyPressTimings = [];

document.addEventListener('keydown', (e) => {
  keyPressTimings.push({
    key: e.key,
    timestamp: Date.now()
  });
});

function analyzeTypingBehavior() {
  const intervals = [];
  for (let i = 1; i < keyPressTimings.length; i++) {
    intervals.push(keyPressTimings[i].timestamp - keyPressTimings[i-1].timestamp);
  }
  
  return {
    avgInterval: average(intervals),
    stdDeviation: standardDeviation(intervals)
  };
}
```

### 触摸屏行为

```javascript
document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  analyzeTouchPattern({
    x: touch.clientX,
    y: touch.clientY,
    pressure: touch.force,
    radiusX: touch.radiusX,
    radiusY: touch.radiusY
  });
});
```

---

## 网络指纹

### WebRTC IP 泄漏

```javascript
function getLocalIPs() {
  return new Promise((resolve) => {
    const ips = [];
    const RTCPeerConnection = window.RTCPeerConnection ||
                              window.webkitRTCPeerConnection ||
                              window.mozRTCPeerConnection;
    
    if (!RTCPeerConnection) {
      resolve(ips);
      return;
    }
    
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    
    pc.createDataChannel('');
    pc.createOffer().then(offer => pc.setLocalDescription(offer));
    
    pc.onicecandidate = (ice) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) {
        resolve(ips);
        return;
      }
      
      const parts = ice.candidate.candidate.split(' ');
      const ip = parts[4];
      
      if (ip && ips.indexOf(ip) === -1) {
        ips.push(ip);
      }
    };
  });
}
```

### 防护 WebRTC 泄漏

```javascript
// 方法1：修改 ICE 候选
RTCPeerConnection.prototype.originalAddIceCandidate = 
  RTCPeerConnection.prototype.addIceCandidate;

RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
  if (candidate && candidate.candidate) {
    // 过滤本地 IP
    if (candidate.candidate.indexOf('.local') !== -1) {
      return Promise.resolve();
    }
  }
  return this.originalAddIceCandidate(candidate);
};

// 方法2：禁用 WebRTC
delete window.RTCPeerConnection;
delete window.webkitRTCPeerConnection;
delete window.mozRTCPeerConnection;
```

### DNS 泄漏检测

```javascript
async function checkDNSLeak() {
  const response = await fetch('https://dnsleaktest.com/api/v1/test');
  const data = await response.json();
  return data;
}
```

---

## 防护技术

### 综合防护方案

```javascript
// 1. User-Agent 伪装
Object.defineProperty(navigator, 'userAgent', {
  get: () => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...'
});

// 2. Platform 伪装
Object.defineProperty(navigator, 'platform', {
  get: () => 'Win32'
});

// 3. 语言伪装
Object.defineProperty(navigator, 'language', {
  get: () => 'en-US'
});

Object.defineProperty(navigator, 'languages', {
  get: () => ['en-US', 'en']
});

// 4. 插件隐藏
Object.defineProperty(navigator, 'plugins', {
  get: () => []
});

// 5. WebDriver 隐藏
Object.defineProperty(navigator, 'webdriver', {
  get: () => false
});

// 6. Chrome 特征伪装
window.chrome = {
  runtime: {}
};

// 7. Permissions 伪装
const originalQuery = window.navigator.permissions.query;
window.navigator.permissions.query = (parameters) => (
  parameters.name === 'notifications' ?
    Promise.resolve({ state: Notification.permission }) :
    originalQuery(parameters)
);

// 8. 时区一致性
// 确保时区与 IP 地理位置匹配
```

### 检测清单

创建一个完整的检测清单：

```javascript
async function comprehensiveCheck() {
  const results = {
    basicInfo: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack
    },
    
    hardwareInfo: {
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory,
      maxTouchPoints: navigator.maxTouchPoints
    },
    
    screenInfo: getScreenInfo(),
    
    canvasFingerprint: getCanvasFingerprint(),
    webglFingerprint: getWebGLFingerprint(),
    audioFingerprint: await getAudioFingerprint(),
    fontsDetected: getFonts(),
    
    webRTCIPs: await getLocalIPs(),
    
    timezone: {
      offset: new Date().getTimezoneOffset(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    
    plugins: Array.from(navigator.plugins).map(p => p.name),
    mimeTypes: Array.from(navigator.mimeTypes).map(m => m.type),
    
    webdriver: navigator.webdriver,
    chrome: !!window.chrome,
    
    touchSupport: 'ontouchstart' in window
  };
  
  return results;
}
```

---

## 参考资源

- [Fingerprint.js Documentation](https://github.com/fingerprintjs/fingerprintjs)
- [AmIUnique Research](https://www.amiunique.org/links)
- [Browser Fingerprinting: An Introduction and the Challenges Ahead](https://blog.torproject.org/browser-fingerprinting-introduction-and-challenges-ahead/)
- [Technical analysis of client identification mechanisms](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)

---

[返回主页](../README.md)
