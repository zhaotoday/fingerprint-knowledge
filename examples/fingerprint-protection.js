/**
 * 浏览器指纹防护脚本
 * 注入此脚本以修改或隐藏各种指纹特征
 * 
 * 使用方法:
 * 1. 在 Puppeteer/Playwright 中通过 evaluateOnNewDocument 注入
 * 2. 作为浏览器扩展的内容脚本
 * 3. 在 Tampermonkey/Violentmonkey 中运行
 */

(function() {
  'use strict';

  // ==================== 基础信息伪装 ====================

  /**
   * 修改 User-Agent
   */
  Object.defineProperty(navigator, 'userAgent', {
    get: () => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  /**
   * 修改 Platform
   */
  Object.defineProperty(navigator, 'platform', {
    get: () => 'Win32'
  });

  /**
   * 修改 Vendor
   */
  Object.defineProperty(navigator, 'vendor', {
    get: () => 'Google Inc.'
  });

  /**
   * 隐藏 WebDriver
   */
  Object.defineProperty(navigator, 'webdriver', {
    get: () => false
  });

  /**
   * 修改语言
   */
  Object.defineProperty(navigator, 'language', {
    get: () => 'en-US'
  });

  Object.defineProperty(navigator, 'languages', {
    get: () => ['en-US', 'en']
  });

  // ==================== 硬件信息伪装 ====================

  /**
   * 修改 CPU 核心数
   */
  Object.defineProperty(navigator, 'hardwareConcurrency', {
    get: () => 8
  });

  /**
   * 修改内存大小
   */
  Object.defineProperty(navigator, 'deviceMemory', {
    get: () => 8
  });

  /**
   * 修改触摸点数
   */
  Object.defineProperty(navigator, 'maxTouchPoints', {
    get: () => 0
  });

  // ==================== Chrome 对象伪装 ====================

  /**
   * 添加 Chrome 对象
   */
  if (!window.chrome) {
    window.chrome = {
      runtime: {
        id: 'abcdefghijklmnopqrstuvwxyz',
        OnInstalledReason: {
          CHROME_UPDATE: "chrome_update",
          INSTALL: "install",
          SHARED_MODULE_UPDATE: "shared_module_update",
          UPDATE: "update"
        },
        OnRestartRequiredReason: {
          APP_UPDATE: "app_update",
          OS_UPDATE: "os_update",
          PERIODIC: "periodic"
        },
        PlatformArch: {
          ARM: "arm",
          ARM64: "arm64",
          MIPS: "mips",
          MIPS64: "mips64",
          X86_32: "x86-32",
          X86_64: "x86-64"
        },
        PlatformNaclArch: {
          ARM: "arm",
          MIPS: "mips",
          MIPS64: "mips64",
          X86_32: "x86-32",
          X86_64: "x86-64"
        },
        PlatformOs: {
          ANDROID: "android",
          CROS: "cros",
          LINUX: "linux",
          MAC: "mac",
          OPENBSD: "openbsd",
          WIN: "win"
        },
        RequestUpdateCheckStatus: {
          NO_UPDATE: "no_update",
          THROTTLED: "throttled",
          UPDATE_AVAILABLE: "update_available"
        }
      },
      loadTimes: function() {},
      csi: function() {},
      app: {}
    };
  }

  // ==================== Permissions 伪装 ====================

  /**
   * 修改 Permissions API
   */
  const originalQuery = window.navigator.permissions.query;
  window.navigator.permissions.query = (parameters) => (
    parameters.name === 'notifications' ?
      Promise.resolve({ state: Notification.permission }) :
      originalQuery(parameters)
  );

  // ==================== 插件伪装 ====================

  /**
   * 伪装插件列表
   */
  Object.defineProperty(navigator, 'plugins', {
    get: () => {
      const plugins = [
        {
          0: {
            type: "application/pdf",
            suffixes: "pdf",
            description: "Portable Document Format"
          },
          description: "Portable Document Format",
          filename: "internal-pdf-viewer",
          length: 1,
          name: "Chrome PDF Plugin"
        },
        {
          0: {
            type: "application/x-google-chrome-pdf",
            suffixes: "pdf",
            description: ""
          },
          description: "",
          filename: "internal-pdf-viewer",
          length: 1,
          name: "Chrome PDF Viewer"
        },
        {
          0: {
            type: "application/x-nacl",
            suffixes: "",
            description: "Native Client Executable"
          },
          description: "",
          filename: "internal-nacl-plugin",
          length: 2,
          name: "Native Client"
        }
      ];

      plugins.__proto__ = PluginArray.prototype;
      return plugins;
    }
  });

  // ==================== Canvas 指纹防护 ====================

  /**
   * Canvas 添加噪声
   */
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
  const originalToBlob = HTMLCanvasElement.prototype.toBlob;
  const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;

  // 生成随机噪声
  function addNoise(canvas, context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // 随机修改少量像素
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < 0.001) { // 0.1% 的像素
        const noise = Math.floor(Math.random() * 3) - 1; // -1, 0, 或 1
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
    }

    context.putImageData(imageData, 0, 0);
  }

  HTMLCanvasElement.prototype.toDataURL = function(type, ...args) {
    const context = this.getContext('2d');
    if (context) {
      addNoise(this, context);
    }
    return originalToDataURL.apply(this, [type, ...args]);
  };

  HTMLCanvasElement.prototype.toBlob = function(callback, type, ...args) {
    const context = this.getContext('2d');
    if (context) {
      addNoise(this, context);
    }
    return originalToBlob.apply(this, [callback, type, ...args]);
  };

  // ==================== WebGL 指纹防护 ====================

  /**
   * 修改 WebGL 参数
   */
  const getParameter = WebGLRenderingContext.prototype.getParameter;
  WebGLRenderingContext.prototype.getParameter = function(parameter) {
    // UNMASKED_VENDOR_WEBGL
    if (parameter === 37445) {
      return 'Intel Inc.';
    }
    // UNMASKED_RENDERER_WEBGL
    if (parameter === 37446) {
      return 'Intel Iris OpenGL Engine';
    }
    return getParameter.apply(this, arguments);
  };

  /**
   * 禁用 WEBGL_debug_renderer_info 扩展
   */
  const originalGetExtension = WebGLRenderingContext.prototype.getExtension;
  WebGLRenderingContext.prototype.getExtension = function(name) {
    if (name === 'WEBGL_debug_renderer_info') {
      return null;
    }
    return originalGetExtension.apply(this, arguments);
  };

  // ==================== AudioContext 指纹防护 ====================

  /**
   * 修改 AudioContext 采样率
   */
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (AudioContext) {
    const OriginalAudioContext = AudioContext;
    
    window.AudioContext = function() {
      const context = new OriginalAudioContext();
      
      const originalCreateOscillator = context.createOscillator;
      context.createOscillator = function() {
        const oscillator = originalCreateOscillator.apply(this, arguments);
        
        const originalStart = oscillator.start;
        oscillator.start = function(when = 0) {
          // 添加微小的随机延迟
          const randomDelay = Math.random() * 0.0001;
          return originalStart.call(this, when + randomDelay);
        };
        
        return oscillator;
      };
      
      return context;
    };
    
    window.AudioContext.prototype = OriginalAudioContext.prototype;
  }

  // ==================== 字体检测防护 ====================

  /**
   * 修改 measureText 返回值
   */
  const originalMeasureText = CanvasRenderingContext2D.prototype.measureText;
  CanvasRenderingContext2D.prototype.measureText = function(text) {
    const metrics = originalMeasureText.apply(this, arguments);
    
    // 添加微小的随机偏差
    const noise = (Math.random() - 0.5) * 0.0001;
    
    return new Proxy(metrics, {
      get(target, prop) {
        if (prop === 'width') {
          return target.width + noise;
        }
        return target[prop];
      }
    });
  };

  // ==================== 屏幕信息伪装 ====================

  /**
   * 修改 devicePixelRatio
   */
  Object.defineProperty(window, 'devicePixelRatio', {
    get: () => 1
  });

  // ==================== WebRTC 防护 ====================

  /**
   * 禁用 WebRTC（可选，会影响某些功能）
   */
  // delete window.RTCPeerConnection;
  // delete window.webkitRTCPeerConnection;
  // delete window.mozRTCPeerConnection;

  /**
   * 或者修改 ICE 候选以隐藏真实 IP
   */
  if (window.RTCPeerConnection) {
    const originalAddIceCandidate = RTCPeerConnection.prototype.addIceCandidate;
    
    RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
      if (candidate && candidate.candidate) {
        // 过滤本地 IP 地址
        if (candidate.candidate.indexOf('.local') !== -1 ||
            candidate.candidate.indexOf('192.168') !== -1 ||
            candidate.candidate.indexOf('10.') !== -1) {
          return Promise.resolve();
        }
      }
      return originalAddIceCandidate.apply(this, arguments);
    };
  }

  // ==================== 电池 API 防护 ====================

  /**
   * 禁用电池 API
   */
  if (navigator.getBattery) {
    delete navigator.getBattery;
  }

  // ==================== 其他防护 ====================

  /**
   * 修改 Date.getTimezoneOffset
   */
  const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
  Date.prototype.getTimezoneOffset = function() {
    // 返回 UTC-5 (EST)
    return 300;
  };

  /**
   * 防止检测 iframe
   */
  Object.defineProperty(window, 'top', {
    get: () => window
  });

  Object.defineProperty(window, 'frameElement', {
    get: () => null
  });

  /**
   * 防止检测 phantom/selenium
   */
  delete window._phantom;
  delete window.__phantomas;
  delete window.callPhantom;
  delete window.__selenium_unwrapped;
  delete window.__webdriver_script_fn;

  console.log('✓ 指纹防护脚本已加载');

})();
