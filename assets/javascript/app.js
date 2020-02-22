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
var gameOverButton;

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
var maxRounds = 10; //Max Rounds(Questions) per Game, Adust if Needed
var totalCorrect = 0;
var totalIncorrect = 0;
var totalUnanswered = 0;

var roundTime = 0;
var timePerRound = 10; //Time to answer question, Adust if Needed
var roundTimeInteravl;
var queueTime = 0;
var timeBetweenRound = 3000; //Time delay to start next round, Adjust if Needed
var queueTimeInterval;

//All Questions Container
var allQuestions = [];
//Random Questions Selected for round
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
var questionOne = new QuestionObject(
  "Which of these science fiction movies stars David Bowie as Jareth, the Goblin King?",

  "Labyrinth",
  "The Dark Crystal",
  "Legend",
  "Time Piece",

  "assets/images/labyrinth.jpg"
);
var questionTwo = new QuestionObject(
  "Directed by Andrew Niccol, which movie features a society where eugenics is common and DNA plays a major role in determining one's social class?",

  "Gattacaa",
  "THX 1138",
  "Daybreakers",
  "In Time",

  "assets/images/gattaca.jpeg"
);
var questionThree = new QuestionObject(
  "Which of the following films stars Mel Gibson as Max Rockatansky?",

  "The Road Warrior",
  "Waterworld",
  "After Earth",
  "Doomsday",

  "assets/images/theroadwarrior.jpg"
);
var questionFour = new QuestionObject(
  "Released in 2004, which movie depicts the story of two young engineers who accidently invent a time machine?",

  "Primer",
  "Timecrimes",
  "Upstream Color",
  "Looper",

  "assets/images/primer.jpg"
);
var questionFive = new QuestionObject(
  "In the movie, 'The Matrix,' what was the name of the computer hacker who discovered that all life on Earth was actually a simulated reality?",

  "Neo",
  "Theo",
  "Sam",
  "Leo",

  "assets/images/neomatrix.jpg"
);
var questionSix = new QuestionObject(
  "Directed by Fritz Lang and released in 1927, what was the first full-length science fiction movie ever made?",

  "Metropolis",
  "Battleship Potemkin",
  "The Blue Angel",
  "The Last Laugh",

  "assets/images/metropolis.jpg"
);
var questionSeven = new QuestionObject(
  "Which of the following science fiction films is based on a 1961 novel by Polish writer Stanislaw Lem?",

  "Solaris",
  "First Spaceship on Venus",
  "The Invasion",
  "Planet of the Apes",

  "assets/images/solaris.jpg"
);
var questionEight = new QuestionObject(
  "Living in harmony with nature, which film features the Na'vi, 10-foot tall blueskinned humanoids?",

  "Avatar",
  "Star Trek",
  "Tron",
  "Pacific Rim",

  "assets/images/avatar.jpg"
);
var questionNine = new QuestionObject(
  "In which movie do we see Marty McFly wayfaring back through time in a DeLorean to interfere in his parents' love story?",

  "Back to the Future",
  "Time After Time",
  "The Time Machine",
  "The Goonies",

  "assets/images/backtothefuture.jpg"
);
var questionTen = new QuestionObject(
  "Christened the greatest science-fiction film ever made according to Ray Bradbury, in what year was 'Close Encounters of the Third Kind' released?",

  "1977",
  "1997",
  "1967",
  "1987",

  "assets/images/closeencounters.jpg"
);
var questionEleven = new QuestionObject(
  "Which science fiction film tells the story of a health-food storeowner who is cryogenically frozen and wakes up in 2173 during a rebellion?",

  "Sleeper",
  "Scoop",
  "Reds",
  "Idiocracy",

  "assets/images/sleeper.jpg"
);
var questionTwelve = new QuestionObject(
  "Which movie features an alien humanoid named Klaatu that visits earth with a message for humankind?",

  "The Day the Earth Stood Still",
  "War of the Worlds",
  "The Day the Earth Stopped",
  "The Day After Tomorrow",

  "assets/images/daytheearthstoodstill.jpg"
);
var questionThirteen = new QuestionObject(
  "In the science fiction thriller 'Terminator 3,' who played the role of T-X, the first onscreen female Terminator?",

  "Kristanna Loken",
  "Katherine Moennig",
  "Claire Danes",
  "Michelle Rodriguez",
  /////////Need TX Image/////////////
  "assets/images/test.jpg"
);
var questionFourteen = new QuestionObject(
  "Released in 2005, which film is a continuation of Joss Whedon's short-lived 2002 television series 'Firefly'?",

  "Serenity",
  "The Chronicles of Riddick",
  "Ender's Game",
  "Slither",

  "assets/images/sereniity.jpg"
);
var questionFifteen = new QuestionObject(
  "What character does Felicity Jones play in the 2016 Walt Disney film 'Star Wars Rogue One'?",

  "Jyn Erso",
  "Rey",
  "Padme Amidala",
  "Leia Organa",

  "assets/images/rougueone.jpg"
);
var questionSixteen = new QuestionObject(
  "'Bruce Willis' and 'Brad Pitt' star in what 1995 Terry Gillam science fiction film?",

  "12 Monkeys",
  "Time Bandits",
  "Jupiter Ascending",
  "The Zero Theorem",

  "assets/images/twelvemonkeys.jpg"
);
var questionSeventeen = new QuestionObject(
  "'Rick Deckard' is a character associated with which film that was directed by Ridley Scott?",

  "Blade Runner",
  "Prometheus",
  "Legend",
  "Alien",

  "assets/images/bladerunner.jpg"
);
var questionEightteen = new QuestionObject(
  "'Jane Fonda' travels 41st-century space with her blind guardian angel 'Pygar' in what 1968 science fiction film?",

  "Barbarella",
  "Thunderbird 6",
  "Countdown",
  "Voyage to the Planet of Prehistoric Women",

  "assets/images/barbella.jpg"
);
var questionNineteen = new QuestionObject(
  "Select the correct subtitle to the 1984 film 'Star Trek III'?",

  "The Search for Spock",
  "The Voyage Home",
  "The Final Frontier",
  "Wrath of Khan",

  "assets/images/searchforspock.jpg"
);
var questionTwenty = new QuestionObject(
  "What is the name of Malcolm McDowell's character in the 1971 film 'A Clockwork Orange'?",

  "Alex DeLarge",
  "Daniel DeLarge",
  "Thomas DeLarge",
  "Steven DeLarge",

  "assets/images/alexdelargeclockworkorange.jpg"
);
var questionTwentyone = new QuestionObject(
  "Who played the role of 'The Fly' (1986)?",

  "Jeff Goldblum",
  "Richard Attenborough",
  "Michael Keaton",
  "Sam Neill",

  "assets/images/jeffgoldblumfly.jpg"
);
var questionTwentytwo = new QuestionObject(
  "Released in 2006, which of the following films is an adaptation of a P. D. James' novel?",

  "Children of Men",
  "Altered",
  "The Host",
  "The Prestige",

  "assets/images/childrenofmen.jpg"
);
var questionTwentythree = new QuestionObject(
  "Who directed the 2009 epic science fiction film 'Avatar'?",

  "James Cameron",
  "Steven Spielberg",
  "Ridley Scott",
  "George Lucas",

  "assets/images/avatar.jpg"
);
var questionTwentyfour = new QuestionObject(
  "With which classic science fiction film would you associate the quote 'Game over, man. Game over!'?",

  "Alien",
  "Close Encounters of the Third Kind",
  "The Thing",
  "Predator",

  "assets/images/aliengameover.jpg"
);
var questionTwentyfive = new QuestionObject(
  "What year saw the release of the science fiction comedy film 'Men in Black'?",

  "1997",
  "1993",
  "1999",
  "1995",

  "assets/images/meninblack.jpg"
);
var questionTwentysix = new QuestionObject(
  "What is the name of the character that Tom Cruise plays in the 2014 film 'Edge of Tomorrow'?",

  "Cage",
  "Kimmel",
  "Skinner",
  "Farrell",

  "assets/images/edgeoftmrw.jpg"
);
var questionTwentyseven = new QuestionObject(
  "The Wachowski Brothers became well-known for which science fiction film series?",

  "The Matrix",
  "Men in Black",
  "Jurassic Park",
  "Predators",

  "assetsimages\neomatrix.jpg"
);
var questionTwentyeight = new QuestionObject(
  "'Kevin Spacey' and 'Sam Rockwell' co-star in which 2009 British science fiction film?",

  "Moon",
  "Gravity",
  "Europa Report",
  "Mission to Mars",

  "assets/images/moon.jpg"
);
var questionTwentynine = new QuestionObject(
  "Genetically perfect DNA is the subject of which science fiction film?",

  "Gattaca",
  "The Final Cut",
  "Equilibrium",
  "THX 1138",

  "assets/images/gattaca.jpeg"
);
var questionThirty = new QuestionObject(
  "'The Terminator' was the first film in which Arnold Schwarzenegger said what catchphrase?",

  "Hasta La Vista, Baby",
  "You're Terminated",
  "Chill Out, Dickwad",
  "I'll be Back",

  "assets/images/hastalavistaTerminator.jpg"
);

allQuestions = [
  //TO DO: Store all question here
  //templateQuestion

  questionOne,
  questionTwo,
  questionThree,
  questionFour,
  questionFive,
  questionSix,
  questionSeven,
  questionEight,
  questionNine,
  questionTen,
  questionEleven,
  questionTwelve,
  questionThirteen,
  questionFourteen,
  questionFifteen,
  questionSixteen,
  questionSeventeen,
  questionEightteen,
  questionNineteen,
  questionTwenty,
  questionTwentyone,
  questionTwentytwo,
  questionTwentythree,
  questionTwentyfour,
  questionTwentyfive,
  questionTwentysix,
  questionTwentyseven,
  questionTwentyeight,
  questionTwentynine,
  questionThirty
];

//#endregion

//#region Methods

function resetRoundTimer() {
  clearInterval(roundTimeInteravl);
  roundTime = timePerRound;
  timerElement.text("00:" + timePerRound);
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

    //Display Time
    timerElement.text(displayTime);
  }
}

function timeConverter(t) {
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
  gameOverButton = $("#gameOverButton");
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
  totalUnanswered = 0;
  totalCorrect = 0;
  totalIncorrect = 0;
  roundTime = timePerRound;
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
      i--;
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

  //clear result image
  solutionImage.attr("src", "");

  //Start Round Timer
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

  //Show Results Panel
  resultsPanel.show();
  //Increment Round
  currentRound++;
  //Start Queue Timer(newRound after timer expires, or game over)
  if (currentRound < maxRounds) {
    queueTimeInterval = setTimeout(newRound, timeBetweenRound);
  } else {
    console.log("gameOver");
    queueTimeInterval = setTimeout(gameOver, timeBetweenRound);
  }
};

var gameOver = function() {
  // Hide Round Result Panel
  resultsPanel.hide();
  gameOverPanel.show();

  //Get Score
  var finalScore = (totalCorrect / maxRounds) * 100;

  //Load Game results to elements (incorrect, Correct, unanswered, and final percentage)
  scoreElement.text(finalScore + "%");
  correctValueElement.text("Number of Correct: " + totalCorrect);
  incorrectValueElement.text("Number of Incorrect: " + totalIncorrect);
  unansweredValueElement.text("Number of Unanswered: " + totalUnanswered);

  //Reset Game
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

  //Button Clicks
  gameStartButton.on("click", newRound);

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

  gameOverButton.on("click", newRound);
  // $("#gameOverButton").on("click", newRound);
});

//#region

//#endregion
