// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 滚动动画功能
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加观察
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 导航栏滚动功能
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标板块的ID
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // 滚动到目标板块
            window.scrollTo({
                top: targetSection.offsetTop - 80, // 减去导航栏高度
                behavior: 'smooth'
            });
            
            // 移动端导航栏点击后关闭菜单
            if (window.innerWidth <= 768) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    });
    
    // 移动端导航栏切换功能
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // 切换按钮动画效果
        const spans = this.querySelectorAll('span');
        spans[0].classList.toggle('rotate-top');
        spans[1].classList.toggle('hide');
        spans[2].classList.toggle('rotate-bottom');
    });
    

    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(51, 51, 51, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(51, 51, 51, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        // 滚动时高亮当前板块对应的导航链接
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // 初始化页面时高亮当前板块
    window.dispatchEvent(new Event('scroll'));
});