from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cybersec_learning.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ==================== 数据库模型 ====================

class User(db.Model):
    """用户模型"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    progress = db.relationship('UserProgress', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.username}>'

class Course(db.Model):
    """课程模型"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    week = db.Column(db.Integer)  # 第几周
    category = db.Column(db.String(50))  # 基础/密码学/Web安全等
    content_url = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Course {self.title}>'

class UserProgress(db.Model):
    """用户进度模型"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    progress_percentage = db.Column(db.Integer, default=0)
    completed_at = db.Column(db.DateTime)
    
    def __repr__(self):
        return f'<UserProgress user_id={self.user_id} course_id={self.course_id}>'

class Experiment(db.Model):
    """实验模型"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    difficulty = db.Column(db.String(20))  # 简单/中等/困难
    category = db.Column(db.String(50))
    instructions = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Experiment {self.title}>'

# ==================== 路由 ====================

@app.route('/')
def index():
    """首页"""
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """学习仪表板"""
    return render_template('dashboard.html')

@app.route('/courses')
def courses():
    """课程列表"""
    all_courses = Course.query.all()
    return render_template('courses.html', courses=all_courses)

@app.route('/courses/<int:course_id>')
def course_detail(course_id):
    """课程详情"""
    course = Course.query.get_or_404(course_id)
    return render_template('course_detail.html', course=course)

@app.route('/lab')
def lab():
    """实验室"""
    experiments = Experiment.query.all()
    return render_template('lab.html', experiments=experiments)

@app.route('/api/courses')
def api_courses():
    """API: 获取所有课程"""
    courses = Course.query.all()
    return jsonify([
        {
            'id': c.id,
            'title': c.title,
            'week': c.week,
            'category': c.category,
            'description': c.description
        }
        for c in courses
    ])

@app.route('/api/progress')
def api_progress():
    """API: 获取学习进度"""
    # 这里需要认证，暂时返回示例数据
    return jsonify({
        'completed_courses': 2,
        'total_courses': 12,
        'progress_percentage': 17,
        'current_week': 1
    })

@app.route('/about')
def about():
    """关于页面"""
    return render_template('about.html')

@app.errorhandler(404)
def not_found(error):
    """404错误处理"""
    return render_template('404.html'), 404

# ==================== 初始化数据 ====================

def init_courses():
    """初始化课程数据"""
    if Course.query.first() is not None:
        return  # 已有课程数据，跳过
    
    courses_data = [
        # 第1周：基础知识
        {'title': '网络基础概念', 'week': 1, 'category': '基础知识', 'description': '学习IP、TCP/UDP协议'},
        {'title': 'OSI七层模型', 'week': 1, 'category': '基础知识', 'description': '理解网络分层架构'},
        {'title': 'HTTP/HTTPS协议', 'week': 1, 'category': '基础知识', 'description': '掌握Web通信协议'},
        
        # 第2周：密码学
        {'title': '加密与解密基础', 'week': 2, 'category': '密码学', 'description': '对称与非对称加密'},
        {'title': 'AES对称加密', 'week': 2, 'category': '密码学', 'description': '深入理解AES算法'},
        {'title': 'RSA非对称加密', 'week': 2, 'category': '密码学', 'description': '掌握公钥密码体制'},
        
        # 第3周：Web安全
        {'title': 'OWASP Top 10概览', 'week': 3, 'category': 'Web安全', 'description': '十大Web漏洞类型'},
        {'title': 'SQL注入漏洞', 'week': 3, 'category': 'Web安全', 'description': '学习SQL注入攻击原理'},
        {'title': 'XSS跨站脚本', 'week': 3, 'category': 'Web安全', 'description': '跨站脚本攻击防御'},
        
        # 第4周：实战项目
        {'title': 'CTF挑战入门', 'week': 4, 'category': '实战', 'description': '参与捕获旗子竞赛'},
        {'title': '漏洞复现实验', 'week': 4, 'category': '实战', 'description': '复现常见Web漏洞'},
        {'title': '综合安全审计项目', 'week': 4, 'category': '实战', 'description': '完成端到端安全审计'},
    ]
    
    for course_data in courses_data:
        course = Course(**course_data)
        db.session.add(course)
    
    db.session.commit()
    print("✅ 课程数据初始化成功！")

def init_experiments():
    """初始化实验数据"""
    if Experiment.query.first() is not None:
        return
    
    experiments_data = [
        {
            'title': 'TCP/IP基础实验',
            'difficulty': '简单',
            'category': '网络',
            'description': '使用Wireshark抓包分析'
        },
        {
            'title': '密码破解挑战',
            'difficulty': '中等',
            'category': '密码学',
            'description': '破解各类加密信息'
        },
        {
            'title': 'SQL注入实战',
            'difficulty': '中等',
            'category': 'Web安全',
            'description': '在安全环境中测试SQL注入'
        },
    ]
    
    for exp_data in experiments_data:
        experiment = Experiment(**exp_data)
        db.session.add(experiment)
    
    db.session.commit()
    print("✅ 实验数据初始化成功！")

# ==================== 主程序 ====================

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        init_courses()
        init_experiments()
        print("\n" + "="*50)
        print("🚀 网络安全学习平台启动成功！")
        print("访问地址: http://localhost:5000")
        print("="*50 + "\n")
    
    app.run(debug=True, host='localhost', port=5000)
