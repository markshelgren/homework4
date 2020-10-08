// Global variable definition
var curQuestion = 0;
var timeoutHandle;
var answerId = "";
var userAnswer = 0;

// For keeping score
var totCorrect = 0;
var totWrong = 0;
var totQuestions = 5;
var totScore = "";
var questionCount = "";

function countdown(minutes, seconds) {
	var seconds = 60;
	var mins = minutes;

	function tick() {
		var counter = document.getElementById("timer");
		var current_minutes = mins - 1;
		seconds--;
		counter.innerHTML =
			current_minutes.toString() +
			":" +
			(seconds < 10 ? "0" : "") +
			String(seconds);
		if (seconds > 0) {
			timeoutHandle = setTimeout(tick, 1000);
		} else {
			if (mins > 1) {
				setTimeout(function () {
					countdown(mins - 1);
				}, 1000);
			}
		}
	}
	tick();
}

// Suppress the seed html before the first question
$("#question").empty();
$(".text-danger").empty();
$("button").empty();
$(".question bg-white p-3 border-bottom").empty();
$("#A0").empty();
$("#A1").empty();
$("#A2").empty();
$("#A3").empty();
$("#A4").empty();

// Start the timer and remove the start button when Start is pressed
$("#start").on("click", function () {
	countdown(5);
	// remove the start button when clicked
	$("#start").remove();

	// Display the first question
	curQuestion = 0;

	questionCount =
		"Question (" + (curQuestion + 1) + " of " + totQuestions + ")";
	console.log("Question (" + (curQuestion + 1) + " of " + totQuestions + ")");
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
		console.log(questions[curQuestion].answers[j]);
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
	if (
		questions[curQuestion].answers[userAnswer] ==
		questions[curQuestion].correctAnswer
	) {
		console.log("The answer is correct for question " + curQuestion);
		console.log(
			"The value of the answer is  " + questions[curQuestion].correctAnswer
		);

		//Add to total correct
		totCorrect++;

		// Update the scoreboard on the screen

		curQuestion = curQuestion + 1;

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

		curQuestion = curQuestion + 1;
		if (curQuestion < 5) {
			displayQuestions();
		}
	}
}

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
		correctAnswer: "-",
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
