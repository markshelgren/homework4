// Global variable definition

// for the timer
var curSeconds = 0;
var curMinutes = 0;
var timeoutHandle;
var tmpSeconds = 0;

// For processing questions and answers
var curQuestion = 0;
var answerId = "";
var userAnswer = 0;
var questionCount = "";
var wrongAnswer = "";

// For keeping score
var totCorrect = 0;
var totWrong = 0;
var totQuestions = 5;
var totScore = ""; 
var lastAnswer = "";

var counter = 150;

// For storing high scores
var userInitials = "";
var userScores = [];

var scoresObject = {
	userInitials: userInitials,
	Correct: totCorrect,
	Incorrect: totWrong,
	Minutes: curMinutes,
	Seconds: curSeconds,
	Timehandle: timeoutHandle,
};


$(document).ready(function() {
// Suppress the seed html before the first question

$("#question").empty();
$(".text-danger").empty();
$("button").empty();
$(".question bg-white p-3 border-bottom").empty();
$("#A0").empty();
$("#A1").empty();
$("#A2").empty();
$("#A3").empty();  


function countdown(minutes, seconds) {
	function tick() {
		var counter = document.getElementById("timer");

		if (curMinutes > 0 || curSeconds > 0) {
			minutes = curMinutes;
			seconds = curSeconds;
		} 


		counter.innerHTML =
			minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
		seconds--;
		if (seconds >= 0) {
			timeoutHandle = setTimeout(tick, 1000);
		}
		 else { 
				// countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
				setTimeout(function () {
					countdown(minutes - 1, 59);
				}, 1000);
			}
		

		curSeconds = seconds;
		curMinutes = minutes;
		// console.log(curMinutes + "Secfromcountdown function" + curSeconds);
		
	if (curMinutes === 0 && curSeconds <= 0) {
		alert("TIME IS UP!  YOU LOSE!!! Press OK to continue")
		init();
		document.location.reload(true)
	} 
	}
	tick();  

}

// retrieve local storage
init();

// Start the timer and remove the start button when Start is pressed
$("#start").on("click", function () {
	countdown(1, 15); 
	console.log("Started the initial time");

	// remove the start button when clicked
	$("#start").hide();
	// $("#start").remove();

	// Display the first question
	curQuestion = 0;

	questionCount =
		"Question (" + (curQuestion + 1) + " of " + totQuestions + ")";

	console.log(questionCount);

	console.log(questions[curQuestion].question);
	$("#questionStatus").html(questionCount);

	displayQuestions();
});

function displayQuestions() {
	$("#question").html(questions[curQuestion].question);
	loadAnswers();
}

function loadAnswers() {
	// Loop through the possible answers
	for (let j = 0; j < questions[curQuestion].answers.length; j++) {
		const element = questions[curQuestion].answers[j];

		answerId = "#A" + j;

		$(answerId).html(questions[curQuestion].answers[j]);
	}
}

// Monitor Button pressed for answer and process

$("#A0").on("click", function () {
	// Inside the on-click event...
	userAnswer = 0;
	console.log("the users answer is " + userAnswer);
	checkAnswer();
});

$("#A1").on("click", function () {
	// Inside the on-click event...
	userAnswer = 1;
	console.log("the users answer is " + userAnswer);
	checkAnswer();
});

$("#A2").on("click", function () {
	// Inside the on-click event...
	userAnswer = 2;
	console.log("the users answer is " + userAnswer);
	checkAnswer();
});

$("#A3").on("click", function () {
	// Inside the on-click event...
	userAnswer = 3;
	console.log("the users answer is " + userAnswer);
	checkAnswer();
});

// Function to check the user answer against the correct answer.

function checkAnswer() {
	console.log(questions[curQuestion].answers[userAnswer]);
	console.log(questions[curQuestion].correctAnswer);

	// Process incorrect and correct answers
	wrongAnswer = "";

	if (
		questions[curQuestion].answers[userAnswer] ==
		questions[curQuestion].correctAnswer
	) {
		console.log("The answer is correct for question " + curQuestion);
		console.log(
			"The correctly matched value of the answer is  " +
				questions[curQuestion].correctAnswer
		);

		//Add to total correct
		totCorrect++;

		// Update the scoreboard on the screen
		curQuestion = curQuestion + 1;
		lastAnswer = "The last answer was CORRECT";
		$("#lastAnswer").html(lastAnswer);
		$("#lastAnswer").css('color', 'green');


		if (curQuestion < 5) {
			questionCount =
				"Question (" + (curQuestion + 1) + " of " + totQuestions + ")";
			console.log(
				"Question (" + (curQuestion + 1) + " of " + totQuestions + ")"
			);
			console.log(questionCount);
			console.log(questions[curQuestion].question);
			$("#questionStatus").html(questionCount);
			displayQuestions();
		} else {
			// last question answered
			lastQuestion();
		}
	} else {
		console.log("The answer is wrong for question " + curQuestion);
		console.log(
			"The answer entered by the user is  " +
				questions[curQuestion].answers[userAnswer]
		);
		console.log(
			"The correct answer is  " + questions[curQuestion].correctAnswer
		);

		//Add to total incorrect
		totWrong++;

		// Update the scoreboard on the screen
		curQuestion = curQuestion + 1;
		console.log(curQuestion);
		lastAnswer = "The last answer was PATHETIC";
		$("#lastAnswer").html(lastAnswer);
		$("#lastAnswer").css('color', 'red');

		// Need to subtract 30 seconds from the time 
		 console.log(curMinutes + "before calc" + curSeconds);

			tmpSeconds = (curMinutes * 60 ) + curSeconds;
			console.log("Total TEMP Seconds " + tmpSeconds); 

			tmpSeconds = tmpSeconds - 30;
			console.log("Total seconds after subtraction " + tmpSeconds);

			curMinutes = Math.floor(tmpSeconds / 60);
			console.log("Total Cur Minutes after rounding " + curMinutes);
			
			curSeconds = tmpSeconds % 60;
			console.log(curMinutes + " Seconds" + curSeconds);

		console.log("Current minutes " + curMinutes);
		console.log("Current seconds " + curSeconds);  

		if (curMinutes === 0 && curSeconds <= 0) {
			alert("TIME IS UP! YOU LOSE! Press a button continue")
			return;
		}

		countdown(curMinutes, curSeconds);

		console.log("Sent time to countdown function ");

		if (curQuestion < 5) {
			questionCount =
				"Question (" + (curQuestion + 1) + " of " + totQuestions + ")";
			console.log(
				"Question (" + (curQuestion + 1) + " of " + totQuestions + ")"
			);
			console.log(questionCount);
			console.log(questions[curQuestion].question);

			$("#questionStatus").html(questionCount);
			displayQuestions();
		} else {
			// last question answered
			lastQuestion();
		}
	}
}

function lastQuestion() {
	userInitials = prompt("Game Over! Enter your initials to save this score");
	storeScores();
}

// Retreive previous/existing high scores from local storage

function init() {
	// Get stored scores from localStorage
	// Parsing the JSON string to an object

	var storedScores = JSON.parse(localStorage.getItem("userScores"));

	// If Scores were retrieved from localStorage, update the Scores array to it
	if (storedScores !== null) {
		userScores = storedScores;
	}
	console.log("userScores: ", userScores);

	$("#start").show(); 
	lastAnswer = "";
	$("#lastAnswer").html(lastAnswer);

}

function storeScores() {
	// Stringify and set "Scores" key in localStorage to Scores array  

	console.log("Minutes " + curMinutes);
	console.log("Seconds " + curSeconds); 

	scoresObject.userInitials = userInitials;
	scoresObject.Timehandle = timeoutHandle;
	scoresObject.Correct = totCorrect;
	scoresObject.Incorrect = totWrong;	
	scoresObject.Minutes = curMinutes;
	scoresObject.Seconds = curSeconds;

	userScores.push(scoresObject);

	localStorage.setItem("userScores", JSON.stringify(userScores)); 

	$("#subwrapper").empty();
	$("#question").empty();
	$(".text-danger").empty();
	$("button").empty();
	$(".question bg-white p-3 border-bottom").empty();
	$("#A0").empty();
	$("#A1").empty();
	$("#A2").empty();
	$("#A3").empty(); 

	$("#start").show(); 
	lastAnswer = "";
	$("#lastAnswer").html(lastAnswer); 
	init();
	document.location.reload(true)
};		

// Variable for questions, an array of objects

var questions = [
	{
		question: "How do you round the number 7.25, to the nearest integer?",
		answers: ["round(7.25)", "rnd(7.25)", "Math.round(7.25)", "Math.rnd(7.25)"],
		correctAnswer: "Math.round(7.25)",
	},
	{
		question: "Which event occurs when the user clicks on an HTML element?",
		answers: ["onchange", "onclick", "onmouseclick", "onmouseover"],
		correctAnswer: "onclick",
	},
	{
		question: "Which operator is used to assign a value to a variable?",
		answers: ["=", "X", "*", "-"],
		correctAnswer: "=",
	},
	{
		question: "How to write an IF statement in JavaScript?",
		answers: ["if (i == 5)", "if i == 5 then", "if i = 5 then", "if i = 5"],
		correctAnswer: "if (i == 5)",
	},
	{
		question: "How does a FOR loop start?",
		answers: [
			"for (i = 0; i <= 5)",
			"for (i <= 5; i++)",
			"for i = 1 to 5",
			"for (i = 0; i <= 5; i++)",
		],
		correctAnswer: "for (i = 0; i <= 5; i++)",
	},
];

      // Call initializeCalculater so we can set the state of our app
	  init(); 

    });