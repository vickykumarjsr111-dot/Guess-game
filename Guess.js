'use strict';
let randomNumber = Math.floor(Math.random() * 20) + 1;
let attempts = 3;
let previousGuessesArray = [];
let score = 20;
let sco=0;
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const highSco=document.getElementById('highSco');
const gameScore = document.getElementById('gameScore');
const messageDisplay = document.getElementById('gameMessage'); 
const attemptsLeft = document.getElementById('attemptsLeft'); 
const previousGuesses = document.getElementById('previousGuesses'); 

guessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);
guessInput.addEventListener('keydown', function(event) 
{
    if (event.key === 'Enter') 
    {
        checkGuess();
    }
});

function setMessage(msg, color) 
{
    const formattedMsg = msg.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    
    messageDisplay.innerHTML = formattedMsg; 
    messageDisplay.style.color = color;
}
function updatehighSco()
{
    highSco.textContent = sco;
}
function updateScoreDisplay() 
{
    gameScore.textContent = score;
}
function checkGuess() 
{
    const userGuess = parseInt(guessInput.value);

    if (userGuess < 1 || userGuess > 20) {
        setMessage('🚫 Enter a number between 1 and 20!', 'yellow');
        guessInput.value = '';
        return;
    }

    attempts--;
    previousGuessesArray.push(userGuess);
    attemptsLeft.textContent = attempts;
    previousGuesses.textContent = previousGuessesArray.join(', ');
    guessInput.value = ''; 

    if (userGuess === randomNumber)
    {
        setMessage('😍🎉 **You won!** The number was ' + randomNumber, 'aqua');
        if (score > sco)
        {
            sco = score;
            updatehighSco();
        }
        endGame(true);
    } 
    else if (attempts === 0) 
    {
        score = 0;
        updateScoreDisplay();
        setMessage('❌🥺 **Game Over!** The number was ' + randomNumber, 'red');
        endGame(false);
    } 
    else 
    {
        score-=5;
        updateScoreDisplay();
        const hint = userGuess < randomNumber ? 'Too Low' : 'Too High';
        setMessage(`➡️ ${hint}. Try again!`, 'white');
    }
}

function endGame(won) 
{
    guessInput.disabled = true;
    guessButton.disabled = true;
    document.body.style.backgroundColor = won ? 'rgba(0, 150, 0, 0.8)' : 'rgba(150, 0, 0, 0.8)';
}

function resetGame() 
{
    randomNumber = Math.floor(Math.random() * 20) + 1;
    attempts = 3;
    previousGuessesArray = [];

    attemptsLeft.textContent = attempts;
    previousGuesses.textContent = 'None';
    setMessage('Start Guessing', 'rgb(248, 248, 248)');
    
    guessInput.disabled = false;
    guessButton.disabled = false;
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.878)'; 
    updateScoreDisplay();
}
updateScoreDisplay();