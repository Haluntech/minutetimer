class MessageTab {
    constructor() {
        this.messageDisplay = document.getElementById('message-display');
        this.messageInput = document.getElementById('message-input');
        this.effectSelect = document.getElementById('message-effect');
        this.colorPicker = document.getElementById('message-color');
        this.fontSelect = document.getElementById('font-select');
        this.updateButton = document.getElementById('update-message');
        
        this.currentEffect = 'none';
        this.currentAnimation = null;
        this.currentFont = 'Arial';
        
        this.init();
    }

    init() {
        // 加载保存的消息设置
        this.loadSettings();

        // 初始化事件监听
        this.updateButton.addEventListener('click', () => this.updateMessage());
        this.effectSelect.addEventListener('change', () => this.updateEffect());
        this.colorPicker.addEventListener('change', () => this.updateColor());
        this.fontSelect.addEventListener('change', () => this.updateFont());

        // 自动调整字体大小
        window.addEventListener('resize', () => this.adjustFontSize());
        
        // 预加载字体
        this.preloadFonts();
    }

    preloadFonts() {
        const fonts = [
            { family: 'Digital', url: '../assets/fonts/digital-7.ttf' },
            { family: 'Roboto', url: '../assets/fonts/Roboto-Regular.ttf' },
            { family: 'OpenSans', url: '../assets/fonts/OpenSans-Regular.ttf' },
            { family: 'Montserrat', url: '../assets/fonts/Montserrat-Regular.ttf' },
            { family: 'SourceCodePro', url: '../assets/fonts/SourceCodePro-Regular.ttf' }
        ];

        fonts.forEach(font => {
            const fontFace = new FontFace(font.family, `url(${font.url})`);
            fontFace.load().then(loadedFace => {
                document.fonts.add(loadedFace);
            }).catch(error => {
                console.error(`Error loading font ${font.family}:`, error);
            });
        });
    }

    updateMessage() {
        const message = this.messageInput.value || 'Enter your message';
        this.messageDisplay.textContent = message;
        this.adjustFontSize();
        this.saveSettings();
        this.applyEffect();
    }

    updateEffect() {
        this.currentEffect = this.effectSelect.value;
        this.applyEffect();
        this.saveSettings();
    }

    updateColor() {
        this.messageDisplay.style.color = this.colorPicker.value;
        this.saveSettings();
    }

    updateFont() {
        this.currentFont = this.fontSelect.value;
        this.messageDisplay.style.fontFamily = this.currentFont;
        this.saveSettings();
    }

    applyEffect() {
        // 清除现有动画
        if (this.currentAnimation) {
            this.messageDisplay.style.animation = 'none';
            this.messageDisplay.offsetHeight; // 触发重绘
        }

        // 应用新动画
        switch (this.currentEffect) {
            case 'fade':
                this.messageDisplay.style.animation = 'fadeInOut 2s infinite';
                break;
            case 'slide':
                this.messageDisplay.style.animation = 'slideLeftRight 3s infinite';
                break;
            case 'bounce':
                this.messageDisplay.style.animation = 'bounce 1s infinite';
                break;
            default:
                this.messageDisplay.style.animation = 'none';
        }
    }

    adjustFontSize() {
        const container = document.querySelector('.message-container');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const messageLength = this.messageDisplay.textContent.length;
        
        // 根据容器大小和文本长度计算合适的字体大小
        const fontSize = Math.min(
            containerWidth / (messageLength * 0.7),
            containerHeight / 2
        );
        
        this.messageDisplay.style.fontSize = `${fontSize}px`;
    }

    saveSettings() {
        const settings = {
            message: this.messageInput.value,
            effect: this.currentEffect,
            color: this.colorPicker.value,
            font: this.currentFont
        };
        localStorage.setItem('messageSettings', JSON.stringify(settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('messageSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.messageInput.value = settings.message || '';
            this.effectSelect.value = settings.effect || 'none';
            this.colorPicker.value = settings.color || '#ffffff';
            this.fontSelect.value = settings.font || 'Arial';
            this.currentEffect = settings.effect;
            this.currentFont = settings.font || 'Arial';
            this.updateMessage();
            this.messageDisplay.style.fontFamily = this.currentFont;
        }
    }
}

// 初始化消息标签页
document.addEventListener('DOMContentLoaded', () => {
    new MessageTab();
}); 