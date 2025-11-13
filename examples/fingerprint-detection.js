/**
 * 浏览器指纹检测完整示例
 * 收集各种浏览器和设备特征信息
 */

class FingerprintDetector {
  constructor() {
    this.fingerprint = {};
  }

  /**
   * 收集所有指纹信息
   */
  async collect() {
    this.fingerprint = {
      basic: this.getBasicInfo(),
      hardware: this.getHardwareInfo(),
      screen: this.getScreenInfo(),
      canvas: this.getCanvasFingerprint(),
      webgl: this.getWebGLFingerprint(),
      audio: await this.getAudioFingerprint(),
      fonts: this.getFonts(),
      plugins: this.getPlugins(),
      timezone: this.getTimezoneInfo(),
      webrtc: await this.getWebRTCInfo()
    };

    return this.fingerprint;
  }

  /**
   * 基础信息
   */
  getBasicInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      onLine: navigator.onLine,
      webdriver: navigator.webdriver
    };
  }

  /**
   * 硬件信息
   */
  getHardwareInfo() {
    return {
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory,
      maxTouchPoints: navigator.maxTouchPoints,
      vendor: navigator.vendor,
      vendorSub: navigator.vendorSub,
      product: navigator.product,
      productSub: navigator.productSub
    };
  }

  /**
   * 屏幕信息
   */
  getScreenInfo() {
    return {
      width: screen.width,
      height: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
      devicePixelRatio: window.devicePixelRatio,
      orientation: screen.orientation?.type
    };
  }

  /**
   * Canvas 指纹
   */
  getCanvasFingerprint() {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = 200;
      canvas.height = 50;

      // 绘制文本
      ctx.textBaseline = 'top';
      ctx.font = '14px "Arial"';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('Canvas Fingerprint 🎨', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('abcdefghijklmnopqrstuvwxyz', 4, 17);

      const dataURL = canvas.toDataURL();
      return this.hashCode(dataURL);
    } catch (e) {
      return 'unsupported';
    }
  }

  /**
   * WebGL 指纹
   */
  getWebGLFingerprint() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!gl) return 'unsupported';

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

      return {
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
        version: gl.getParameter(gl.VERSION),
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        unmaskedVendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : null,
        unmaskedRenderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null,
        supportedExtensions: gl.getSupportedExtensions(),
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
        maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
        maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
      };
    } catch (e) {
      return 'unsupported';
    }
  }

  /**
   * AudioContext 指纹
   */
  async getAudioFingerprint() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return 'unsupported';

      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const analyser = context.createAnalyser();
      const gainNode = context.createGain();
      const scriptProcessor = context.createScriptProcessor(4096, 1, 1);

      gainNode.gain.value = 0; // 静音
      oscillator.type = 'triangle';
      oscillator.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.start(0);

      return new Promise((resolve) => {
        scriptProcessor.onaudioprocess = (event) => {
          const output = event.inputBuffer.getChannelData(0);
          const hash = this.hashCode(output.slice(0, 100).join(','));
          
          scriptProcessor.disconnect();
          oscillator.stop();
          context.close();
          
          resolve({
            hash: hash,
            sampleRate: context.sampleRate,
            state: context.state
          });
        };
      });
    } catch (e) {
      return 'unsupported';
    }
  }

  /**
   * 字体检测
   */
  getFonts() {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const detect = (font) => {
      const baselines = baseFonts.map(baseFont => {
        ctx.font = testSize + ' ' + baseFont;
        return ctx.measureText(testString).width;
      });

      return baseFonts.some((baseFont, index) => {
        ctx.font = testSize + ' "' + font + '",' + baseFont;
        return ctx.measureText(testString).width !== baselines[index];
      });
    };

    const fontsToTest = [
      'Arial', 'Verdana', 'Times New Roman', 'Courier New',
      'Georgia', 'Palatino', 'Garamond', 'Bookman',
      'Comic Sans MS', 'Trebuchet MS', 'Impact',
      'Microsoft YaHei', 'SimSun', 'SimHei', 'KaiTi',
      'Heiti SC', 'Songti SC', 'PingFang SC'
    ];

    return fontsToTest.filter(font => detect(font));
  }

  /**
   * 插件信息
   */
  getPlugins() {
    return Array.from(navigator.plugins).map(plugin => ({
      name: plugin.name,
      description: plugin.description,
      filename: plugin.filename,
      mimeTypes: Array.from(plugin).map(mime => ({
        type: mime.type,
        description: mime.description,
        suffixes: mime.suffixes
      }))
    }));
  }

  /**
   * 时区信息
   */
  getTimezoneInfo() {
    return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      locale: Intl.DateTimeFormat().resolvedOptions().locale
    };
  }

  /**
   * WebRTC IP 检测
   */
  async getWebRTCInfo() {
    try {
      const RTCPeerConnection = window.RTCPeerConnection ||
                                window.webkitRTCPeerConnection ||
                                window.mozRTCPeerConnection;

      if (!RTCPeerConnection) return 'unsupported';

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      const ips = [];

      pc.createDataChannel('');
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          pc.close();
          resolve(ips);
        }, 2000);

        pc.onicecandidate = (ice) => {
          if (!ice || !ice.candidate || !ice.candidate.candidate) {
            clearTimeout(timeout);
            pc.close();
            resolve(ips);
            return;
          }

          const parts = ice.candidate.candidate.split(' ');
          const ip = parts[4];

          if (ip && !ips.includes(ip)) {
            ips.push(ip);
          }
        };
      });
    } catch (e) {
      return 'unsupported';
    }
  }

  /**
   * 简单哈希函数
   */
  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  }

  /**
   * 生成最终指纹
   */
  generateFingerprint() {
    const str = JSON.stringify(this.fingerprint);
    return this.hashCode(str);
  }

  /**
   * 格式化输出
   */
  prettyPrint() {
    console.log('='.repeat(60));
    console.log('浏览器指纹检测结果');
    console.log('='.repeat(60));
    console.log(JSON.stringify(this.fingerprint, null, 2));
    console.log('='.repeat(60));
    console.log('最终指纹哈希:', this.generateFingerprint());
    console.log('='.repeat(60));
  }
}

// 使用示例
(async () => {
  const detector = new FingerprintDetector();
  await detector.collect();
  detector.prettyPrint();

  // 导出到全局变量以便在控制台查看
  window.fingerprint = detector.fingerprint;
  console.log('指纹数据已保存到 window.fingerprint');
})();
