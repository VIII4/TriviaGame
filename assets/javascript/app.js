//#region HTML
////HTML Element

//Timer Element
var timerElement;

//Question Panel
var questionPanel;
//Displays question
var questionElement;
//Clickable Button that displays answer for question
var answerAElement;
var answerBElement;
var answerCElement;
var answerDElement;

//Round Result Panel
var resultsPanel;
//result element ("Wrong" or "Corect")
var resultElement;
//solution element ("The Correct answer was: ")
var solutionElement;
//Question Image element (Image to visualize correct aanswer)
var solutionImage;

//Game Over Panel
var gameOverPanel;
//Score Element
var scoreElement;
//Correct Value
var correctElement;
//Incorrect Value
var incorrectElement;
//Unanswered Value
var unanswered;
//#endregion

//#region Global Var

var currentRound = 0;

var roundTime = 0;

var queueTime = 0;

var allQuesions = [
  /*TO DO: add all question objects here*/
];

var selectedQuestions = [];

var currentQuestions;

//var finalScore = score(selectedQuestions);

//#endregion

//#region Objects

//Question Object Construct
function QuestionObject(
  _question,
  _answerA,
  _answerB,
  _answerC,
  _answerD,
  _img
) {
  this.question = _question;
  this.answerA = _answerA;
  this.answerB = _answerB;
  this.answerC = _answerC;
  this.answerD = _answerD;
  this.correctAnswer = "";
  this.result = 0;
}

//TO DO: Create ALL question objects here

//#endregion

//#region Methods
var score = function(_selectedQuestions) {
  var tally = 0;
  for (i = 0; i < selectedQuestions.length; i++) {
    //TO DO : check if question result true, increment tally
  }
};

var setGame = function() {
  selectedQuestions = [];
  currentRound = 0;
  roundTime = 45;
  generateQuestions();
  console.log("Game (re)Set");
};

var generateQuestions = function() {
  var _selectedIndex = [];
  for (i = 0; i < 10; i++) {
    var random = Math.floor(Math.random() * 30);
    if (!_selectedIndex.includes(random)) {
      //selectedQuestions.push(allQuesions[random]);
      _selectedIndex.push(random);
      console.log(_selectedIndex);
    }
  }
};

var newRound = function() {
  //
  if (currentRound < 10) {
    //TO DO: Load Question equal to round number and answers into elements
    //TO DO: Show Question Panel
    currentRound++;
    //TO DO: Start Round Timer
  }
  //
  else {
    //TO DO: Game Over
  }
};

var endRound = function(_result) {
  //
  //TO DO: Clear Round Timer, Reset Round timer to 45
  //TO DO: Check if Result is Correct Answer or unanswered, set result on question object
  //TO DO: Hide Question Panel
  //TO DO: Load result and img into ELements
  //TO DO: Show Results Panel
  //TO DO: Start Queue Timer(newRound after timer expires)
};

var gameOver = function() {
  //
  //TO DO: Hide Questions Panel
  //TO DO: Get Results from questions
  //TO DO: Load Game results to elements (incorrect, Correct, unanswered, and final percentage)
  //TO DO: Show Game Over Panel
};

//TO DO: EndRound Method that recieves string from Button Click, or unaswered if timer expires, Starts queue timer to run StartRound method

//#endregion

$(document).ready(function() {
  setGame();

  ////Button Clicks
  //TO DO: Add Start Game Button

  //TO DO: Add Answer A Button
  //TO DO: Add Answer B Button
  //TO DO: Add Answer C Button
  //TO DO: Add Answer D Button

  //TO DO: Add New Game Button
});

//#region

/////

//Counter for Round
function RoundCounter() {
  //Timer is zero or below
  if (roundTime <= 0) {
    //clearInterval()
    //End Round(Run RoundCheck Method with unanswered parameter)
  }
  //Timer not Expired
  else {
    roundTime--;
    var displayTime = timeConverter(roundTime);
    console.log(" count function" + displayTime);

    //Display Time
    //$("#display").html(displayTime);
  }
}

//Queue Timer
function QueueTimer() {
  if (queueTime > 0) {
    queueTime--;
    console.log(queueTime);
  } else {
  }
}

//Time Converter
function timeConverter(t) {
  //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
  var minutes = Math.floor(t / 60);
  var seconds = t - minutes * 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}

//#endregion
