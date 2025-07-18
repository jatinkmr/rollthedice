const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

// Prize configuration based on dice number
const prizes = {
    1: { name: 'Consolation Prize', description: 'Better luck next time! Here\'s a small token.', value: 10 },
    2: { name: 'Bronze Medal', description: 'Nice roll! You won a bronze medal.', value: 50 },
    3: { name: 'Silver Coin', description: 'Great! You earned a silver coin.', value: 100 },
    4: { name: 'Gold Star', description: 'Excellent! You got a gold star.', value: 200 },
    5: { name: 'Diamond Ring', description: 'Amazing! You won a diamond ring.', value: 500 },
    6: { name: 'JACKPOT!', description: 'Incredible! You hit the jackpot!', value: 1000 }
};

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Dice Roll Game',
        diceResult: null,
        prize: null,
        allPrizes: prizes
    });
});

app.get('/api/roll', (req, res) => {
    // Generate random number between 1 and 6
    const diceResult = Math.floor(Math.random() * 6) + 1;
    const prize = prizes[diceResult];

    res.json({
        diceResult: diceResult,
        prize: prize
    });
});

app.listen(port, () => {
    console.log(`Dice roll app listening at http://localhost:${port}`);
});
