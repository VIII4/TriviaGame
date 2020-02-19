# Trivia Game

Start Game(New Game Button)

1. Set Game
   --Empty generated question pool
   --Set Current Round number to Zero
   --set Timer to 45
   --randomly select 10 questions from pool and add to selected pool

2. Round(check if round is less than 10)
   --Select Question_Obj from randomly selected question pool (select by round number)
   --Display Question and Answers in Elements
   --Start Timer
   --Get Click from player to choose answer(run Method with string as arg)
   --Check if incorrect or correct
   --Set Result on question object
   --if timer expires run method with "unanswered" as arg

3. Round Result
   --Display Round Result
   --Display Answer
   --Display Question Image
   --Start Queue
4. Queue
   --Timer start
   --When Timer ends Start Round
   --increment Round Number
   ----Reapeat until step 2-4 until 10 rounds complete
   --End Game

5. Game Over
   --Stop/Hide Timer
   --Hide Question Panel
   --Show Incorrect/Correct Tally
   --Show Score Percent
   ----If 100 percent show imagery
   --Display "New Game" Button(click starts new Game)

## Flow

Click Start -> Show Question panel with clickable answer buttons
Click Answer -> Check if content matches, correct answer, store result. Hide question panel and show results Panel, increments round. if round is less than 10, execute new round function after delay timer. If greater than to execute game over function.
