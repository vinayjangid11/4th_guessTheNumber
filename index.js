//random number generation
let randomNumber = parseInt(Math.random() * 100 + 1)

//now we extract everything from html
const Submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')//.value
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')


let prevGuess = [];
let numGuess = 1
let playGame = true;

if(playGame){
  Submit.addEventListener('click', function(e){
    e.preventDefault()//value has to stop
    const guess = parseInt(userInput.value)//we are holding the value in guess
    console.log(guess)
    validateGuess(guess)//pass to next function
  })
}

//number jo user daal ra h vo valid h ya nhi h ye check rr re h 
function validateGuess(guess){
    if(isNaN(guess)){
      alert('please enter a valid number')
    }else if(guess < 1){
      alert('please enter a number more then 1')
    }else if(guess > 100){
      alert('please enter a number less then 100')
    }else{//agr valid number h toh 
      prevGuess.push(guess)//prevGuess vali list me add ho jayega
      if(numGuess === 11){//jaada guess krr diye toh ...
        displayGuess(guess)//jitne bhi guess h vo display ho jayege
        displayMessage(`Game Over. Random number was ${randomNumber}`)//game over ka msg jayega
        endGame()//game end ho jayega
      }else{//agr 10 p hi ruk gya toh bhi guesses display ho jayege
        displayGuess(guess)
        checkGuess(guess)
      }
    }
}

//check krna h ki rando value k equal h high h low h 
function checkGuess(guess){
  if(guess === randomNumber){
      displayMessage(`You guessed it right`)
      endGame()
  }else if(guess < randomNumber){
      displayMessage(`Number is Tooo low`)
  }else if (guess > randomNumber){
      displayMessage('Number is Tooo high')
  }
}

//cleaning up the guesses
function displayGuess(guess){
  userInput.value = '' //input value will store here
  guessSlot.innerHTML += `${guess} ` //previous guess me add ho jayega gussed value 
  numGuess++; //number of guesses 1 tha usme ++ ho jayega
  remaining.innerHTML = `${11 - numGuess}`//remaining guess show krega -- ho jayega
}

//low or high print krana h 
function displayMessage(message){
  lowOrHi.innerHTML = `<h2>${message}</h2>`
}

//game end krna h 
function endGame(){
  userInput.value = ''
  userInput.setAttribute('disabled', '')
  p.classList.add('button')
  p.innerHTML = `<h2 id="newGame"> Start new game</h2>`;
  startOver.appendChild(p)
  playGame = false;
  newGame();
}
function newGame(){
  const newGameButon = document.querySelector('#newGame')
  newGameButon.addEventListener('click', function(e){
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute('disabled')
    startOver.removeChild(p)

    playGame = true;
  })
}



