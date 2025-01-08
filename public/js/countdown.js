class Countdown {
    constructor() {
        this.display = document.getElementById('countdown-display');
        this.label = document.getElementById('countdown-label');
        this.targetDateInput = document.getElementById('target-date');
        this.titleInput = document.getElementById('countdown-title');
        this.startButton = document.getElementById('start-countdown');
        this.holidaySelect = document.getElementById('holiday-select');
        
        this.countdown = null;
        this.targetDate = null;
        this.title = '';
        
        this.holidays = {
            'new-year': {
                title: "New Year's Day",
                getDate: () => {
                    const now = new Date();
                    const thisYear = now.getFullYear();
                    const newyear = new Date(thisYear, 0, 1);
                    return now > newyear ? new Date(thisYear + 1, 0, 1) : newyear;
                }
            },
            'christmas': {
                title: 'Christmas',
                getDate: () => {
                    const now = new Date();
                    const thisYear = now.getFullYear();
                    const christmas = new Date(thisYear, 11, 25);
                    return now > christmas ? new Date(thisYear + 1, 11, 25) : christmas;
                }
            },
            'halloween': {
                title: 'Halloween',
                getDate: () => {
                    const now = new Date();
                    const thisYear = now.getFullYear();
                    const halloween = new Date(thisYear, 9, 31);
                    return now > halloween ? new Date(thisYear + 1, 9, 31) : halloween;
                }
            },
            'thanksgiving': {
                title: 'Thanksgiving Day',
                getDate: () => {
                    const now = new Date();
                    const thisYear = now.getFullYear();
                    // 11月第四个星期四
                    let thanksgiving = new Date(thisYear, 10, 1);
                    while (thanksgiving.getDay() !== 4) {
                        thanksgiving.setDate(thanksgiving.getDate() + 1);
                    }
                    thanksgiving.setDate(thanksgiving.getDate() + 21);
                    return now > thanksgiving ? this.getNextThanksgiving(thisYear + 1) : thanksgiving;
                }
            },
            'valentine': {
                title: "Valentine's Day",
                getDate: () => {
                    const now = new Date();
                    const thisYear = now.getFullYear();
                    const valentine = new Date(thisYear, 1, 14);
                    return now > valentine ? new Date(thisYear + 1, 1, 14) : valentine;
                }
            },
            'easter': {
                title: 'Easter Sunday',
                getDate: () => {
                    return this.getEasterDate(new Date().getFullYear());
                }
            },
            'patrick': {
                title: "St. Patrick's Day",
                getDate: () => {
                    const now = new Date();
                    const thisYear = now.getFullYear();
                    const patrick = new Date(thisYear, 2, 17);
                    return now > patrick ? new Date(thisYear + 1, 2, 17) : patrick;
                }
            },
            'independence': {
                title: 'Independence Day',
                getDate: () => {
                    const now = new Date();
                    const thisYear = now.getFullYear();
                    const independence = new Date(thisYear, 6, 4);
                    return now > independence ? new Date(thisYear + 1, 6, 4) : independence;
                }
            }
        };

        this.init();
    }

    init() {
        // 设置默认日期为明天
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        this.targetDateInput.value = tomorrow.toISOString().slice(0, 16);

        // 加载保存的倒计时
        this.loadCountdown();

        this.startButton.addEventListener('click', () => this.startCountdown());

        // 添加节日选择事件监听
        this.holidaySelect.addEventListener('change', () => this.onHolidaySelect());
    }

    startCountdown() {
        // 清除现有倒计时
        if (this.countdown) {
            clearInterval(this.countdown);
        }

        this.targetDate = new Date(this.targetDateInput.value).getTime();
        this.title = this.titleInput.value || 'Countdown';

        // 保存设置
        this.saveCountdown();

        // 开始倒计时
        this.updateDisplay();
        this.countdown = setInterval(() => this.updateDisplay(), 1000);
    }

    updateDisplay() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            this.display.textContent = "EXPIRED";
            this.label.textContent = this.title;
            clearInterval(this.countdown);
            return;
        }

        // 计算时间
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // 显示倒计时
        this.display.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        this.label.textContent = this.title;
    }

    saveCountdown() {
        const data = {
            targetDate: this.targetDate,
            title: this.title
        };
        localStorage.setItem('countdownSettings', JSON.stringify(data));
    }

    loadCountdown() {
        const saved = localStorage.getItem('countdownSettings');
        if (saved) {
            const data = JSON.parse(saved);
            this.targetDate = data.targetDate;
            this.title = data.title;
            this.titleInput.value = this.title;
            this.startCountdown();
        }
    }

    onHolidaySelect() {
        const selectedHoliday = this.holidaySelect.value;
        if (selectedHoliday && this.holidays[selectedHoliday]) {
            const holiday = this.holidays[selectedHoliday];
            const date = holiday.getDate();
            
            // 更新日期和标题输入
            this.targetDateInput.value = date.toISOString().slice(0, 16);
            this.titleInput.value = holiday.title;
            
            // 开始倒计时
            this.startCountdown();
        }
    }

    // 计算复活节日期 (Meeus/Jones/Butcher 算法)
    getEasterDate(year) {
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        
        const easter = new Date(year, month, day);
        const now = new Date();
        return now > easter ? this.getEasterDate(year + 1) : easter;
    }

    // 获取下一个感恩节日期
    getNextThanksgiving(year) {
        let thanksgiving = new Date(year, 10, 1);
        while (thanksgiving.getDay() !== 4) {
            thanksgiving.setDate(thanksgiving.getDate() + 1);
        }
        thanksgiving.setDate(thanksgiving.getDate() + 21);
        return thanksgiving;
    }
}

// 初始化倒计时
document.addEventListener('DOMContentLoaded', () => {
    new Countdown();
}); 