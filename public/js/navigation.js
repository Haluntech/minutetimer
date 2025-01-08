class Navigation {
    constructor() {
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.pages = document.querySelectorAll('.page');
        this.init();
    }

    init() {
        this.navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetPage = e.target.dataset.page;
                this.showPage(targetPage);
            });
        });
    }

    showPage(pageName) {
        // 更新导航按钮状态
        this.navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.page === pageName);
        });

        // 更新页面显示
        this.pages.forEach(page => {
            page.classList.toggle('active', page.id === `${pageName}-page`);
        });
    }
}

// 初始化导航
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
}); 