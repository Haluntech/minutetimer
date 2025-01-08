class Clock {
    constructor() {
        this.clockContainer = document.getElementById('bt-top-line');
        this.dateContainer = document.getElementById('bt-bot-line');
        this.formatSelect = document.getElementById('format-select');
        this.showSecondsCheckbox = document.getElementById('show-seconds');
        
        this.settings = {
            format: '24',
            showSeconds: true
        };

        this.init();
    }

    init() {
        if (!this.clockContainer || !this.dateContainer) {
            console.error('Clock containers not found!');
            return;
        }

        // 加载保存的设置
        this.loadSettings();
        
        // 初始化事件监听
        this.formatSelect.addEventListener('change', (e) => {
            this.settings.format = e.target.value;
            this.saveSettings();
        });

        this.showSecondsCheckbox.addEventListener('change', (e) => {
            this.settings.showSeconds = e.target.checked;
            this.saveSettings();
        });

        // 启动时钟
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    updateClock() {
        const now = new Date();
        
        // 更新时间
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        if (this.settings.format === '12') {
            const period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            hours = String(hours).padStart(2, '0');
            this.clockContainer.textContent = `${hours}:${minutes}${this.settings.showSeconds ? ':' + seconds : ''} ${period}`;
        } else {
            hours = String(hours).padStart(2, '0');
            this.clockContainer.textContent = `${hours}:${minutes}${this.settings.showSeconds ? ':' + seconds : ''}`;
        }

        // 更新日期
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.dateContainer.textContent = now.toLocaleDateString(undefined, options);
    }

    loadSettings() {
        const saved = localStorage.getItem('clockSettings');
        if (saved) {
            this.settings = JSON.parse(saved);
            this.formatSelect.value = this.settings.format;
            this.showSecondsCheckbox.checked = this.settings.showSeconds;
        }
    }

    saveSettings() {
        localStorage.setItem('clockSettings', JSON.stringify(this.settings));
    }
}

// 初始化时钟
document.addEventListener('DOMContentLoaded', () => {
    new Clock();
}); 