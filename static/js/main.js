// 页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 网络安全学习平台已加载');
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 获取进度数据
function fetchProgress() {
    fetch('/api/progress')
        .then(response => response.json())
        .then(data => {
            console.log('进度数据:', data);
            // 更新UI
            updateProgressUI(data);
        })
        .catch(error => console.error('获取进度失败:', error));
}

function updateProgressUI(data) {
    // 这里可以根据返回的数据更新页面内容
    const progressPercentage = data.progress_percentage || 0;
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = progressPercentage + '%';
    }
}

// 页面加载时获取进度
if (document.querySelector('.progress-fill')) {
    fetchProgress();
}
