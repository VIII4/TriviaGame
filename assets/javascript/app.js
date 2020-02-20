//#region HTML

var timerElement;
var questionPanel;
var questionElement;
//Clickable Buttons
var answerAElement;
var answerBElement;
var answerCElement;
var answerDElement;
var gameStartButton;

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
//Game Start Panel
var gameStartPanel;
//Score Element
var scoreElement;
//Correct Value
var correctValueElement;
//Incorrect Value
var incorrectValueElement;
//Unanswered Value
var unansweredValueElement;
//#endregion

//#region Global Var

var currentRound = 0;
var maxRounds = 2;
var totalCorrect = 0;
var totalIncorrect = 0;
var totalUnanswered = 0;

var roundTime = 0;
var roundTimeInteravl;
var queueTime = 0;
var queueTimeInterval;

var allQuestions = [];

var selectedQuestions = [];

var currentQuestions;

//var finalScore = score(selectedQuestions);

//#endregion

//#region Objects

//Results Object
var roundResult = {
  unanswered: "Ran out of time",
  correct: "Nice Work",
  incorrect: "Nope"
};

//Question Object Construct
function QuestionObject(
  _question,
  _correctAnswer,
  _wrongAnswerA,
  _wrongAnswerB,
  _wrongAnswerC,
  _img
) {
  //Store Question, Correct Answer and All Answers in Container
  this.question = _question;
  this.correctAnswer = _correctAnswer;
  this.result = "";
  this.allAnswers = [
    _correctAnswer,
    _wrongAnswerA,
    _wrongAnswerB,
    _wrongAnswerC
  ];

  this.image = _img;

  this.randomizeAnswers = function() {
    var temp = [];
    var selectedAnswers = [];
    for (i = 0; i < 4; i++) {
      var random = Math.floor(Math.random() * 4);
      if (!selectedAnswers.includes(random)) {
        selectedAnswers.push(random);
        temp.push(this.allAnswers[random]);
      } else {
        i--;
      }
    }

    this.allAnswers = temp;
  };
}

//TO DO: Create ALL question objects here

var templateQuestion = new QuestionObject(
  " Question",
  " Correct Answer",
  " Option 2",
  " Otions 3",
  " Option 4",
  "assets/images/test.jpg"
);

var templateQuestion2 = new QuestionObject(
  " Question2",
  " Correct Answer2",
  " Option 22",
  " Otions 32",
  " Option 42",
  "assets/images/hello.png"
);

//TO DO: Store all question here
allQuestions = [templateQuestion, templateQuestion2];

//#endregion

//#region Methods

var getElements = function() {
  //Panels
  gameStartPanel = $("#gameStartPanel");
  questionPanel = $("#questionPanel");
  resultsPanel = $("#resultsPanel");
  gameOverPanel = $("#gameOverPanel");

  //Timer
  timerElement = $("#roundTimer");

  //Image
  solutionImage = $("solutionImage");

  //Text Displays/Buttons
  gameStartButton = $("#gameStartButton");
  questionElement = $("#questionElement");
  answerAElement = $("#answerAElement");
  answerBElement = $("#answerBElement");
  answerCElement = $("#answerCElement");
  answerDElement = $("#answerDElement");
  resultElement = $("#resultElement");
  solutionElement = $("#solutionElement");
  solutionImage = $("#solutionImage");
  scoreElement = $("#scoreElement");
  correctValueElement = $("#correctValueElement");
  incorrectValueElement = $("#incorrectValueElement");
  unansweredValueElement = $("#unansweredValueElement");
};

var score = function(_selectedQuestions) {
  var tally = 0;
  for (i = 0; i < selectedQuestions.length; i++) {
    //TO DO : check if question result true, increment tally
  }
};

var setGame = function() {
  selectedQuestions = [];
  currentRound = 0;
  roundTime = 30;
  generateQuestions();
  console.log("Game (re)Set");
};

var generateQuestions = function() {
  var _selectedIndex = [];
  for (i = 0; i < 10; i++) {
    var random = Math.floor(Math.random() * allQuestions.length);
    if (!_selectedIndex.includes(random)) {
      selectedQuestions.push(allQuestions[random]);
      _selectedIndex.push(random);
    } else {
      //i--;
    }
  }
  console.log(selectedQuestions);
};

var newRound = function() {
  //Load Question equal to round number, randomize answers then Load and answers into elements
  currentQuestions = selectedQuestions[currentRound];
  currentQuestions.randomizeAnswers();

  questionElement.text(currentQuestions.question);
  answerAElement.text(currentQuestions.allAnswers[0]);
  answerBElement.text(currentQuestions.allAnswers[1]);
  answerCElement.text(currentQuestions.allAnswers[2]);
  answerDElement.text(currentQuestions.allAnswers[3]);

  //Show Question Panel, hide other panels
  gameStartPanel.hide();
  resultsPanel.hide();
  gameOverPanel.hide();
  questionPanel.show();

  //TO DO: Start Round Timer
  roundTimeInteravl = setInterval(roundCounter, 1000);
};

var endRound = function(_result) {
  var result;
  //Clear Round Timer, Reset Round timer to 30 and display
  resetRoundTimer();
  //Check if Result is Correct Answer or unanswered, set result on question object
  if (_result === "unanswered") {
    totalUnanswered++;
    result = roundResult.unanswered;
  } else {
    if (currentQuestions.correctAnswer === _result) {
      totalCorrect++;
      result = roundResult.correct;
    } else {
      totalIncorrect++;
      result = roundResult.incorrect;
    }
  }

  //Hide Question Panel
  questionPanel.hide();
  //Load result and img into ELements
  resultElement.text(result);
  solutionElement.text(
    "The Correct Answer was " + currentQuestions.correctAnswer
  );
  solutionImage.attr("src", currentQuestions.image);

  //TO DO: Show Results Panel
  resultsPanel.show();
  //TO DO: Start Queue Timer(newRound after timer expires, or game over)
  currentRound++;
  if (currentRound < maxRounds) {
    queueTimeInterval = setTimeout(newRound, 7000);
  } else {
    console.log("gameOver");
    queueTimeInterval = setTimeout(gameOver, 3000);
  }
};

var gameOver = function() {
  //
  //TO DO: Hide Round Result Panel
  resultsPanel.hide();
  gameOverPanel.show();

  //TO DO: Get Score
  var finalScore = (totalCorrect / maxRounds) * 100;

  //TO DO: Load Game results to elements (incorrect, Correct, unanswered, and final percentage)
  scoreElement.text(finalScore + "%");
  correctValueElement.text("Number of Correct: " + totalCorrect);
  incorrectValueElement.text("Number of Incorrect: " + totalIncorrect);
  unansweredValueElement.text("Number of Unanswered: " + totalUnanswered);

  //TO DO: Reset Game
  setGame();
};

var debugTest = function() {
  //gameStartPanel.hide();
  //questionPanel.show();
  //resultsPanel.show();
  //gameOverPanel.show();
};

//TO DO: EndRound Method that recieves string from Button Click, or unaswered if timer expires, Starts queue timer to run StartRound method

//#endregion

$(document).ready(function() {
  getElements();
  setGame();

  ////Button Clicks
  //TO DO: Add Start Game Button
  gameStartButton.on("click", newRound);

  //TO DO: Add Answer Buttons
  // answerAElement.on("click", endRound /* add Function Here */);
  // answerBElement.on("click", endRound /* add Function Here */);
  // answerCElement.on("click", endRound /* add Function Here */);
  // answerDElement.on("click", endRound /* add Function Here */);

  answerAElement.on("click", function() {
    endRound(answerAElement.text());
  });
  answerBElement.on("click", function() {
    endRound(answerBElement.text());
  });
  answerCElement.on("click", function() {
    endRound(answerCElement.text());
  });
  answerDElement.on("click", function() {
    endRound(answerDElement.text());
  });

  $("#gameOverButton").on("click", newRound);
});

//#region

/////

//T
function resetRoundTimer() {
  clearInterval(roundTimeInteravl);
  roundTime = 30;
  timerElement.text("00:30");
}

function roundCounter() {
  //Timer is zero or below
  if (roundTime <= 0) {
    //End Round(Run RoundCheck Method with unanswered parameter)
    endRound("unanswered");
  }
  //Timer not Expired
  else {
    roundTime--;
    var displayTime = timeConverter(roundTime);
    console.log(" count function" + displayTime);

    //Display Time
    timerElement.text(displayTime);
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
