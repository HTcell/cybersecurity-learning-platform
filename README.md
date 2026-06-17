# 网络安全学习平台 (Cybersecurity Learning Platform)

一个为完全初学者设计的网络安全学习平台，专为每天3小时的学习时间优化。

## 📚 平台功能

- ✅ **结构化学习路径** - 循序渐进的课程大纲
- ✅ **基础理论教程** - 网络基础、密码学、Web安全等
- ✅ **实验室环境** - 在线实战练习
- ✅ **资源库** - 精选工具、文章、视频
- ✅ **进度追踪** - 记录学习进度

## 🎯 学习路线图

### 第1周：计算机基础 (Week 1: Computer Fundamentals)
- 网络基础（IP、TCP/UDP、DNS）
- OSI七层模型
- HTTP/HTTPS协议

### 第2周：密码学入门 (Week 2: Cryptography Basics)
- 加密与解密基本概念
- 对称加密（AES）
- 非对称加密（RSA）
- 哈希函数

### 第3-4周：Web安全基础 (Week 3-4: Web Security)
- OWASP Top 10
- SQL注入
- XSS跨站脚本
- CSRF跨站请求伪造

### 第5-8周：实战项目 (Week 5-8: Practical Projects)
- CTF挑战
- 漏洞复现
- 综合项目

## ⏰ 学习计划（每天3小时）

- **30分钟** - 理论学习（阅读教程）
- **1.5小时** - 实验操作（动手实践）
- **1小时** - 巩固复习（笔记总结）

## 🛠️ 快速开始

### 方式一：本地运行

```bash
# 克隆项目
git clone https://github.com/HTcell/cybersecurity-learning-platform.git
cd cybersecurity-learning-platform

# 安装依赖
pip install -r requirements.txt

# 启动应用
python app.py

# 访问 http://localhost:5000
```

### 方式二：在线访问

访问部署地址：https://htcell-cybersecurity.herokuapp.com (建设中)

## 📁 项目结构

```
cybersecurity-learning-platform/
├── app.py                 # Flask应用入口
├── requirements.txt       # Python依赖
├── config.py             # 配置文件
├── database/             # 数据库
│   └── init.py
├── static/               # 静态资源（CSS、JS、图片）
│   ├── css/
│   ├── js/
│   └── images/
├── templates/            # HTML模板
│   ├── index.html
│   ├── dashboard.html
│   ├── courses.html
│   └── lab.html
├── courses/              # 课程内容
│   ├── week1_basics.md
│   ├── week2_crypto.md
│   ├── week3_websec.md
│   └── week4_practice.md
└── docs/                 # 文档
    ├── SETUP.md
    ├── LEARNING_GUIDE.md
    └── FAQ.md
```

## 📖 学习资源

### 推荐平台
- [HackTheBox](https://www.hackthebox.com/) - 实战靶场
- [TryHackMe](https://tryhackme.com/) - 交互式学习
- [OWASP WebGoat](https://owasp.org/www-project-webgoat/) - Web安全

### 推荐书籍
- 《计算机网络：自顶向下方法》
- 《Web安全攻防》
- 《图解密码技术》

## 🎓 学习目标

- [ ] 周1-2：掌握网络和密码学基础
- [ ] 周3-4：理解Web安全漏洞
- [ ] 周5-8：完成3个实战项目
- [ ] 月末：准备考取CompTIA Security+ 或 CEH

## 💡 学习建议

1. **坚持每日学习** - 每天固定时间学习，养成习惯
2. **动手实践** - 理论学习后立即动手做实验
3. **记录笔记** - 用自己的话总结所学内容
4. **加入社区** - 在论坛讨论，与他人交流
5. **定期复习** - 周末花1小时复习本周内容

## 🤝 如何贡献

欢迎提交Issue和Pull Request来改进这个学习平台！

## 📝 许可证

MIT License

## 📞 联系方式

- GitHub: [@HTcell](https://github.com/HTcell)
- 有问题？提交 [Issue](https://github.com/HTcell/cybersecurity-learning-platform/issues)

---

**开始你的网安学习之旅吧！** 🔐🚀
