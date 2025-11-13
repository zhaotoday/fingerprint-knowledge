# 贡献指南

感谢你对本项目的关注！我们欢迎各种形式的贡献。

## 🤝 如何贡献

### 贡献类型

我们欢迎以下类型的贡献：

1. **📚 添加学习资源**
   - 技术文章
   - 视频教程
   - 在线课程
   - 学术论文

2. **🛠️ 推荐开源项目**
   - 指纹检测工具
   - 反检测库
   - 浏览器自动化框架
   - 相关工具

3. **💻 提交代码示例**
   - 实用脚本
   - 完整示例
   - 最佳实践代码

4. **📝 改进文档**
   - 修正错误
   - 补充说明
   - 翻译内容
   - 优化排版

5. **🐛 报告问题**
   - 文档错误
   - 链接失效
   - 内容过时
   - 其他问题

## 📋 贡献流程

### 1. Fork 项目

点击页面右上角的 "Fork" 按钮，将项目 fork 到你的 GitHub 账号。

### 2. Clone 到本地

```bash
git clone https://github.com/你的用户名/browser-fingerprint-kb.git
cd browser-fingerprint-kb
```

### 3. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-fix-name
```

**分支命名规范**:
- `feature/` - 新功能
- `fix/` - 修复问题
- `docs/` - 文档更新
- `example/` - 添加示例

### 4. 进行修改

根据你要贡献的内容，修改相应的文件：

#### 添加开源项目

编辑 `docs/open-source-projects.md`：

```markdown
### X. 项目名称
**GitHub**: https://github.com/username/project  
**Stars**: ⭐ 1000+  
**语言**: JavaScript  
**许可**: MIT

项目描述...

**安装**:
\`\`\`bash
npm install package-name
\`\`\`

**使用**:
\`\`\`javascript
// 代码示例
\`\`\`

**特性**:
- ✅ 特性1
- ✅ 特性2
```

#### 添加学习资源

编辑 `docs/learning-resources.md`：

```markdown
### 资源标题

- **链接**: https://example.com
- **类型**: 文章/视频/课程
- **难度**: 入门/中级/高级
- **语言**: 中文/英文
- **描述**: 简短描述内容
```

#### 添加代码示例

在 `examples/` 目录下创建新文件：

```bash
# JavaScript 示例
examples/your-example.js

# Python 示例
examples/your-example.py
```

记得在 `examples/README.md` 中添加说明。

### 5. 提交更改

```bash
git add .
git commit -m "描述你的更改"
```

**提交信息规范**:
- `feat: 添加XXX功能`
- `fix: 修复XXX问题`
- `docs: 更新XXX文档`
- `example: 添加XXX示例`

### 6. 推送到 GitHub

```bash
git push origin feature/your-feature-name
```

### 7. 创建 Pull Request

1. 访问你 fork 的项目页面
2. 点击 "New Pull Request"
3. 选择你的分支
4. 填写 PR 描述
5. 提交 PR

## ✅ 质量标准

### 文档要求

- ✅ 语言清晰，无语法错误
- ✅ 格式统一，使用 Markdown
- ✅ 链接有效，能正常访问
- ✅ 内容准确，信息真实

### 代码要求

- ✅ 代码可运行，无明显错误
- ✅ 包含必要的注释
- ✅ 遵循最佳实践
- ✅ 包含使用说明

### 资源要求

- ✅ 内容质量高
- ✅ 来源可靠
- ✅ 持续维护
- ✅ 对学习有帮助

## 📝 内容规范

### 开源项目

提交开源项目时，请包含：

```markdown
- 项目名称
- GitHub 链接
- Stars 数量（如果有）
- 编程语言
- 许可证
- 简短描述
- 安装方法
- 使用示例
- 主要特性
```

### 学习资源

提交学习资源时，请包含：

```markdown
- 资源标题
- 链接
- 类型（文章/视频/课程等）
- 难度级别
- 语言
- 简短描述
```

### 代码示例

提交代码示例时，请包含：

```markdown
- 文件名（描述性的）
- 顶部注释说明用途
- 依赖安装说明
- 使用方法
- 预期输出
- 注意事项
```

## 🚫 不接受的内容

以下内容不会被接受：

- ❌ 违法或违规的内容
- ❌ 恶意代码或病毒
- ❌ 侵犯版权的内容
- ❌ 垃圾信息或广告
- ❌ 低质量或错误的信息
- ❌ 重复的内容

## 💡 贡献建议

### 优先需要的内容

1. **中文学习资源**
   - 高质量的中文教程
   - 实战案例分析
   - 技术博客文章

2. **实用代码示例**
   - 常见场景的解决方案
   - 最佳实践代码
   - 完整的项目示例

3. **最新技术**
   - 新的指纹技术
   - 最新的反检测方法
   - 新兴的工具和库

4. **文档改进**
   - 修正错误
   - 补充细节
   - 优化结构

## 🏆 贡献者

我们会在 README 中感谢所有贡献者。

### 如何成为主要贡献者

做出重大贡献的用户可以成为项目的协作者：

- 📚 贡献 5+ 个高质量资源
- 💻 提交 3+ 个完整代码示例
- 📝 显著改进文档
- 🐛 修复多个重要问题

## 📞 联系方式

如有任何问题或建议，请：

1. 提交 [Issue](https://github.com/yourusername/browser-fingerprint-kb/issues)
2. 发起 [Discussion](https://github.com/yourusername/browser-fingerprint-kb/discussions)

## 📄 许可证

通过贡献，你同意你的贡献将采用 MIT 许可证。

---

## 示例 PR 描述

```markdown
## 📋 变更类型

- [ ] 添加资源
- [x] 添加代码示例
- [ ] 文档改进
- [ ] 修复问题

## 📝 变更说明

添加了一个完整的 Playwright 反检测示例，包括：
- 基础配置
- 指纹伪装
- 行为模拟
- 实际测试

## ✅ 检查清单

- [x] 代码可以正常运行
- [x] 包含使用说明
- [x] 遵循项目规范
- [x] 测试通过

## 📸 截图（如适用）

![示例输出](screenshot.png)

## 💡 额外说明

这个示例适合初学者，演示了如何使用 Playwright 进行反检测。
```

---

感谢你的贡献！🎉
