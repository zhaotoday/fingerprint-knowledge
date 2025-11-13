"""
Selenium Stealth 反检测示例
展示如何使用 Selenium 配合 selenium-stealth 绕过机器人检测
"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium_stealth import stealth
import time

def setup_driver():
    """配置并返回一个隐身的 Chrome WebDriver"""
    
    # Chrome 选项配置
    chrome_options = Options()
    
    # 基础反检测选项
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    
    # 其他有用的选项
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    
    # 可选：无头模式
    # chrome_options.add_argument('--headless')
    
    # 初始化 WebDriver
    driver = webdriver.Chrome(options=chrome_options)
    
    # 应用 stealth 配置
    stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
    )
    
    return driver

def test_bot_detection(driver):
    """测试各种机器人检测网站"""
    
    print("测试 1: Sannysoft Bot Detection")
    driver.get("https://bot.sannysoft.com")
    time.sleep(3)
    driver.save_screenshot("selenium-bot-detection.png")
    print("✓ 截图已保存: selenium-bot-detection.png")
    
    print("\n测试 2: BrowserLeaks")
    driver.get("https://browserleaks.com/canvas")
    time.sleep(3)
    driver.save_screenshot("selenium-browserleaks.png")
    print("✓ 截图已保存: selenium-browserleaks.png")
    
    print("\n测试 3: PixelScan")
    driver.get("https://pixelscan.net")
    time.sleep(5)
    driver.save_screenshot("selenium-pixelscan.png")
    print("✓ 截图已保存: selenium-pixelscan.png")

def test_fingerprint(driver):
    """检查浏览器指纹"""
    
    print("\n获取浏览器指纹信息...")
    
    driver.get("about:blank")
    
    fingerprint = driver.execute_script("""
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            languages: navigator.languages,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            webdriver: navigator.webdriver,
            plugins: navigator.plugins.length,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            screenResolution: screen.width + 'x' + screen.height,
            colorDepth: screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    """)
    
    print("\n当前浏览器指纹:")
    for key, value in fingerprint.items():
        print(f"  {key}: {value}")

def main():
    """主函数"""
    
    print("=" * 60)
    print("Selenium Stealth 反检测测试")
    print("=" * 60)
    
    # 创建隐身浏览器
    driver = setup_driver()
    
    try:
        # 测试指纹
        test_fingerprint(driver)
        
        # 测试机器人检测
        test_bot_detection(driver)
        
        print("\n" + "=" * 60)
        print("所有测试完成!")
        print("=" * 60)
        
        # 保持浏览器打开以便查看
        input("\n按 Enter 键关闭浏览器...")
        
    except Exception as e:
        print(f"\n错误: {e}")
        
    finally:
        driver.quit()

if __name__ == "__main__":
    main()
