
/* 1.The game randomly shuffles the cards.
 * A user wins once all cards have successfully been matched * 
 * Shuffle function https://goo.gl/zzMeM1
*/

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//2.Selecting the cards so we can shuffle them 
var deck = document.querySelector('.deck');

function shuffleNodeList() {
  var nl = deck.getElementsByTagName('li'),arr = [],i,n;
  
  // Copy the nodeList to an array
  for (i = 0; n = nl[i]; ++i) {
    arr.push(n);
  }

  // Shuffle the array
  shuffle(arr);

  // Append the elements back to the ul in shuffled order
  for (i = 0; i < arr.length; i++) {
    deck.appendChild(arr[i]);
  }
}

// 3. Start the Game by first shuffling the cards 
function startGame(){
  shuffleNodeList();  
}

/* 4. A user wins once all 
 *    cards have successfully been matched.
 *   Choose a pair of cards 
 *   If they match - flip and leave open 
 *   If they dont match - flip back 
 *   to flip open - add classes 'open and show'
 *   to flip back - remove classes 'open and show'
 *   to match - add class 'match'
*/

var count = 0;
var intialTime = 0 ;
var interval = null;
let cardsPicked = [];
let cardsMatched = [];


/*
 * 5. Choose , open show and compare cards 
 */
const cards = document.querySelectorAll('.card');

function chooseCard(){
  
  //if not open - open ,then add a second to compare 
  //if card is open add a second and compare 
  
  this.classList.add("open","show","lock");

  count++;

  if(count === 1){
    interval = setInterval(startTimer,1000);
  }

  if(cardsPicked.length === 1 ){
    
    cardsPicked.push(this);

    //unpack the array for comparison
    let [firstCardPicked,secondCardPicked] = cardsPicked;

    //check Cards for equality
    checkCards(firstCardPicked,secondCardPicked);

    
  } else {
    cardsPicked.push(this);
    
  }
} 

function checkCards(firstCardPicked,secondCardPicked){
  

    if (firstCardPicked.innerHTML === secondCardPicked.innerHTML) {

    firstCardPicked.classList.add('match');
    secondCardPicked.classList.add('match'); 
          
    //total up the cards have been matched & empty the cardsPicked array we use for comparison!
    cardsMatched.push(firstCardPicked,secondCardPicked);
    cardsPicked = [];

    // Add New successful Moves to total moves 
    totalMoves();
    
    //check if the game is over 
    gameOver();
                   
    
  } else {

    /*if the two cards clicked dont match , 
      Empty the(cards of open cards and start afresh
    */
        setTimeout( function() {
          firstCardPicked.classList.remove("open", "show","lock");
          secondCardPicked.classList.remove("open", "show","lock");            
      }, 400);   
      
      // Add failed moves to total Moves - they also count toward total game moves 
      totalMoves();               
      
      /* empty the cardsPicked array where we keep the cards we are 
      comparing and start afresh */
      cardsPicked = [];  
    }
}

/*
 * 6. Modal congragulating player 
 */
var congratsModal = document.querySelector('.modal');  
function gameOver(){

  if(cards.length === cardsMatched.length){

    //stop timer when game is done
    clearInterval(interval);

    //Values to be displayed  
    let gameTime = document.getElementById('timer').innerHTML;
    let gameMoves = document.querySelector('.moves').innerHTML;
    let gameRating  = document.querySelector('.stars').innerHTML;
    let message = document.querySelector('.modalText1');
    

   //display modal    
    congratsModal.style.display = 'block'; 
    message.innerHTML = 
    `   You have completed this game in,
        ${gameTime} and ${gameMoves} moves. 
        Click the Restart button to start game again.
        ${gameRating} stars.`;
  }  
}

// 7. Game displays the current number of moves a user has made.
let moves = document.querySelector('.moves').innerHTML;

function totalMoves(){
  //1.moves only counted when a pair of cards is chosen    
  moves = Number(moves)+2; 

  //2.modify number of moves value displayed on game 
  document.querySelector('.moves').innerHTML = moves; 
  
  //3. Call the Rating function - rating depends on moves made 
  gameRating(moves);
}

/* 8.
 *  A restart button allows the player to reset the game board, 
 *  the timer, and the star rating. 
*/

const restartButton = document.querySelector('.fa-repeat');
restartButton.addEventListener('click', startGameAfresh);

function startGameAfresh(){
    //reset all the variables 
    cardsPicked = [];
    cardsMatched = [];
       
    //remove additional classes from the cards to flip them back 
    cards.forEach(function(card){
        card.classList.remove("open", "show","lock","match");
    });

    //reset moves to zero 
    moves = 0 
    document.querySelector('.moves').innerHTML = moves;
   
   //reset game Rating 
   totalStars.innerHTML = '<li><i class="fa fa-star"></i></li>'+'<li><i class="fa fa-star"></i></li>'+'<li><i class="fa fa-star"></i></li>';
   
   //Reset timer
   document.getElementById('timer').innerHTML =  "0 mins: "+ "0 secs";
   clearInterval(interval);
   count = count - count ;
   intialTime = 0;

   //Hide the congragulations modal 
   congratsModal.style.display = 'none';
}


/* 9.The game displays a star rating (from 1 to at least 3)
* that reflects the player's performance. 
* At the beginning of a game, it should display at 
* least 3 stars. After some number of moves, it should 
* change to a lower star rating. After a few more moves,
* it should change to a even lower star rating (down to 1).
*/

let totalStars = document.querySelector(".stars");

function gameRating(moves){   

  /*the 4*4 matrix is a grid with 16 cards 
   * Choosing 8 as the minimum half way mark in the game
   * and 16 as the minimum moves to finish game.
   */
  if (moves > 8) { 
      totalStars.innerHTML = '<li><i class="fa fa-star"></i>'+ '</li><li><i class="fa fa-star"></i></li>' ;
  }
  if (moves > 16 ){
      totalStars.innerHTML = '<li><i class="fa fa-star"></i>';
  }
 
}

//10. Adding game timer 

function startTimer(){  
    intialTime++;
    var minutes = Math.floor(intialTime/60);
    var seconds = Math.floor(intialTime%60);      
    document.getElementById('timer').innerHTML = minutes+ " mins: "+ seconds + " secs";
}

function stopTimer(interval){
    clearInterval(interval);
}


/* 11. When game is loaded  - shuffle cards */
window.onload = function(){
  startGame();
}

/*10.Add click events to cards */
cards.forEach(function(card){      
  card.addEventListener('click',chooseCard);            
});


/* 10.References used to make Project 
Udacity - Study Jam | Fend - P3 Memory Game
https://goo.gl/tuNdu2
Memory Game Webinar with Ryan Waite
https://goo.gl/HrVvea
*/