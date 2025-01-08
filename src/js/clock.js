function initClock() {
    const clockContainer = document.getElementById('clock-container');
    const themeSelect = document.getElementById('theme-select');

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockContainer.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Update clock every second
    updateClock();
    setInterval(updateClock, 1000);

    // Theme handling
    themeSelect.addEventListener('change', (e) => {
        document.body.className = e.target.value;
    });
}

document.addEventListener('DOMContentLoaded', initClock); 