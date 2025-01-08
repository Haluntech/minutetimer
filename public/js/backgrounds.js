class BackgroundManager {
    constructor() {
        this.themes = {
            dark: {
                background: '#000000',
                color: '#ffffff'
            },
            light: {
                background: '#ffffff',
                color: '#000000'
            },
            nature: {
                backgrounds: [
                    'assets/backgrounds/nature1.jpg',
                    'assets/backgrounds/nature2.jpg'
                ],
                color: '#ffffff'
            },
            gradient: {
                backgrounds: [
                    'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    'linear-gradient(45deg, #614385, #516395)'
                ],
                color: '#ffffff'
            }
        };
        
        this.currentTheme = 'dark';
        this.init();
    }

    init() {
        const themeSelect = document.getElementById('theme-select');
        themeSelect.addEventListener('change', (e) => this.setTheme(e.target.value));
        
        // 初始化自定义主题选项
        this.initCustomTheme();
    }

    setTheme(themeName) {
        this.currentTheme = themeName;
        const theme = this.themes[themeName];
        
        if (!theme) return;

        const body = document.body;
        body.className = themeName;

        if (theme.backgrounds) {
            const randomBg = theme.backgrounds[Math.floor(Math.random() * theme.backgrounds.length)];
            if (randomBg.includes('gradient')) {
                body.style.backgroundImage = randomBg;
                body.style.backgroundColor = '';
            } else {
                body.style.backgroundImage = `url(${randomBg})`;
                body.style.backgroundColor = '';
            }
        } else {
            body.style.backgroundColor = theme.background;
            body.style.backgroundImage = '';
        }
        
        body.style.color = theme.color;
    }

    initCustomTheme() {
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.id = 'custom-color';
        colorPicker.style.display = 'none';
        document.getElementById('controls').appendChild(colorPicker);

        colorPicker.addEventListener('change', (e) => {
            this.themes.custom = {
                background: e.target.value,
                color: this.getContrastColor(e.target.value)
            };
            this.setTheme('custom');
        });

        document.getElementById('theme-select').addEventListener('change', (e) => {
            colorPicker.style.display = e.target.value === 'custom' ? 'block' : 'none';
        });
    }

    getContrastColor(hexcolor) {
        const r = parseInt(hexcolor.substr(1,2), 16);
        const g = parseInt(hexcolor.substr(3,2), 16);
        const b = parseInt(hexcolor.substr(5,2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#000000' : '#ffffff';
    }
}

// 初始化背景管理器
const backgroundManager = new BackgroundManager(); 