function rollDice() {
    const dice = document.getElementById('dice');
    if (dice) {
        dice.classList.add('rolling');
        setTimeout(() => {
            dice.classList.remove('rolling');
        }, 1000);
    }

    // After the page reloads and prize section appears, scroll to it
    setTimeout(() => {
        const prizeSection = document.getElementById('prize-section');
        if (prizeSection) {
            prizeSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, 1200); // Wait a bit longer than the dice animation
}

// Also scroll to prize section when page loads if there's a prize
document.addEventListener('DOMContentLoaded', function () {
    const prizeSection = document.getElementById('prize-section');
    if (prizeSection) {
        setTimeout(() => {
            prizeSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500); // Small delay to ensure page is fully loaded
    }
});