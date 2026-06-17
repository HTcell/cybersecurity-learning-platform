# 环境搭建指南

## 系统要求

- **操作系统**：Windows 10+、macOS 10.14+、Linux
- **Python**：3.8+
- **内存**：4GB+
- **磁盘空间**：2GB+

## 第1步：克隆项目

```bash
git clone https://github.com/HTcell/cybersecurity-learning-platform.git
cd cybersecurity-learning-platform
```

## 第2步：创建虚拟环境

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

## 第3步：安装依赖

```bash
pip install -r requirements.txt
```

## 第4步：运行应用

```bash
python app.py
```

你应该会看到类似的输出：

```
==================================================
🚀 网络安全学习平台启动成功！
访问地址: http://localhost:5000
==================================================
```

## 第5步：打开浏览器

访问 `http://localhost:5000`

## 常见问题

### 问题1：Python not found

**解决**：
- 确保已安装Python
- Windows用户检查是否添加到PATH
- 使用 `python --version` 检查

### 问题2：pip install失败

**解决**：
```bash
# 更新pip
python -m pip install --upgrade pip

# 使用清华源
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
```

### 问题3：端口5000被占用

**解决**：
```bash
# 修改app.py中的端口
app.run(debug=True, host='localhost', port=5001)  # 改为5001
```

## Docker部署（可选）

如果安装了Docker，可以使用以下命令：

```bash
# 构建镜像
docker build -t cybersec-platform .

# 运行容器
docker run -p 5000:5000 cybersec-platform
```

## 生产环境部署

### 使用Gunicorn

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### 使用Heroku

```bash
# 登录Heroku
heroku login

# 创建应用
heroku create your-app-name

# 部署
git push heroku main
```

## 配置数据库（可选）

默认使用SQLite，如果要使用PostgreSQL：

```bash
pip install psycopg2-binary

# 设置环境变量
export DATABASE_URL=postgresql://user:password@localhost/dbname
```

## 配置环境变量

创建 `.env` 文件：

```
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///cybersec_learning.db
```

## 下一步

✅ 环境搭建完成
✅ 现在可以开始学习了
✅ 查看 LEARNING_GUIDE.md 了解学习方法
