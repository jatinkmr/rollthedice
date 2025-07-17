function rollDice() {
    const dice = document.getElementById('dice');
    const diceDots = document.getElementById('dice-dots');
    const rollBtn = document.getElementById('roll-btn');
    const prizeSection = document.getElementById('prize-section');
    const rollingMessage = document.getElementById('rolling-message');
    const prizeNameEl = document.getElementById('prize-name');
    const prizeDescriptionEl = document.getElementById('prize-description');
    const prizeValueEl = document.getElementById('prize-value');

    // Disable button during roll
    rollBtn.disabled = true;
    rollBtn.textContent = '🎲 Rolling...';

    // Hide prize section and show rolling message
    prizeSection.style.display = 'none';
    rollingMessage.style.display = 'block';

    // Start dice rolling animation
    dice.classList.add('rolling');
    diceDots.textContent = '?';

    // Simulate dice rolling with changing numbers
    let rollCount = 0;
    const rollInterval = setInterval(() => {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        diceDots.textContent = randomNum;
        rollCount++;

        if (rollCount >= 10) { // Stop after 10 quick changes
            clearInterval(rollInterval);
        }
    }, 100);

    // After 1 second, get the actual result from server
    setTimeout(async () => {
        try {
            const response = await fetch('/api/roll');
            const data = await response.json();

            // Stop dice animation
            dice.classList.remove('rolling');
            diceDots.textContent = data.diceResult;

            // Hide rolling message
            rollingMessage.style.display = 'none';

            // Show prize after a short delay
            setTimeout(() => {
                prizeNameEl.textContent = data.prize.name;
                prizeDescriptionEl.textContent = data.prize.description;
                prizeValueEl.textContent = `Value: ${data.prize.value} points`;

                prizeSection.style.display = 'block';

                // Scroll to prize section
                prizeSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);

            // Re-enable button
            rollBtn.disabled = false;
            rollBtn.textContent = '🎲 Roll Again!';
        } catch (error) {
            console.error('Error:', error);
            // Re-enable button on error
            rollBtn.disabled = false;
            rollBtn.textContent = '🎲 Roll the Dice!';
            dice.classList.remove('rolling');
            rollingMessage.style.display = 'none';
        }
    }, 1000);
}
