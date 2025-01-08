class BigText {
    constructor(element) {
        this.element = element;
        this.resize = this.resize.bind(this);
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', this.resize);
    }

    resize() {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        const fontSize = Math.min(containerWidth / 5, containerHeight / 3);
        this.element.style.fontSize = `${fontSize}px`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.big-text');
    elements.forEach(element => new BigText(element));
}); 