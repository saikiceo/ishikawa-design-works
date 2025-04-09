// 石川デザインワークス - スクリプト

document.addEventListener('DOMContentLoaded', function() {
    // ヘッダースクロールエフェクト
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // モバイルメニュートグル
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // ナビゲーションリンククリック時にモバイルメニューを閉じる
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // スクロールアニメーション
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // 初期表示時にも実行

    // AOS風アニメーション
    const aosElements = document.querySelectorAll('[data-aos]');
    
    function aosAnimation() {
        const windowHeight = window.innerHeight;
        
        aosElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    window.addEventListener('scroll', aosAnimation);
    
    // 遅延を適用するための関数
    function startAOSAnimation() {
        aosAnimation();
        
        aosElements.forEach(element => {
            const delay = element.getAttribute('data-aos-delay');
            
            if (delay) {
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }
    
    // 初期読み込み時にアニメーションを開始
    setTimeout(startAOSAnimation, 100);

    // カウンターアニメーション
    const counters = document.querySelectorAll('.counter');
    
    function startCounting() {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let count = 0;
            const duration = 2000; // ミリ秒
            const frameDuration = 1000 / 60; // 60FPS
            const totalFrames = Math.round(duration / frameDuration);
            const increment = target / totalFrames;
            
            const timer = setInterval(() => {
                count += increment;
                
                if (count >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(count);
                }
            }, frameDuration);
        });
    }
    
    // カウンターセクションが表示されたらカウント開始
    const statsSection = document.querySelector('.about-stats');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounting();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // 施工例フィルター
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // アクティブクラスの切り替え
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    card.style.display = 'none';
                    
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        setTimeout(() => {
                            card.style.display = 'block';
                        }, 300);
                    }
                });
            });
        });
    }

    // お問い合わせフォームバリデーション
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 簡易的なバリデーション
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // メールアドレスのバリデーション
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // フォーム送信処理
                alert('お問い合わせありがとうございます。近日中にご連絡いたします。');
                contactForm.reset();
            } else {
                alert('必須項目をすべて入力してください。');
            }
        });
    }

    // パーティクルアニメーション
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer) {
        class Particle {
            constructor(x, y, size, color) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * size + 1;
                this.color = color;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.size > 0.2) this.size -= 0.05;
            }
            
            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        function createParticles() {
            const canvas = document.createElement('canvas');
            particlesContainer.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            canvas.width = particlesContainer.offsetWidth;
            canvas.height = particlesContainer.offsetHeight;
            
            let particlesArray = [];
            const numberOfParticles = Math.floor(canvas.width * canvas.height / 9000);
            const colors = ['#F8B195', '#F67280', '#C06C84'];
            
            for (let i = 0; i < numberOfParticles; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 5 + 1;
                const color = colors[Math.floor(Math.random() * colors.length)];
                particlesArray.push(new Particle(x, y, size, color));
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                    particlesArray[i].draw(ctx);
                    
                    if (particlesArray[i].size <= 0.2) {
                        particlesArray.splice(i, 1);
                        i--;
                        
                        // 新しいパーティクルを追加
                        const x = Math.random() * canvas.width;
                        const y = Math.random() * canvas.height;
                        const size = Math.random() * 5 + 1;
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        particlesArray.push(new Particle(x, y, size, color));
                    }
                }
                
                requestAnimationFrame(animate);
            }
            
            animate();
            
            // ウィンドウサイズ変更時にキャンバスリサイズ
            window.addEventListener('resize', function() {
                canvas.width = particlesContainer.offsetWidth;
                canvas.height = particlesContainer.offsetHeight;
            });
        }
        
        createParticles();
    }
});