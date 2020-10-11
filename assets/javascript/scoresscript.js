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

	// Get stored scores from localStorage
	// Parsing the JSON string to an object

	var storedScores = JSON.parse(localStorage.getItem("userScores"));

	// If Scores were retrieved from localStorage, update the Scores array to it
	if (storedScores !== null) {
		userScores = storedScores;
	}
	console.log("userScores: ", userScores); 
 
	for (let i = 0; i < userScores.length; i++) {

		const element = userScores[i];  
		console.log("Looping at " + i); 

		var row = '<tr>'+
				  '<td scope="col">'+userScores[i].userInitials+'</td>'+
				  '<td scope="col">'+userScores[i].Correct+'</td>'+
				  '<td scope="col">'+userScores[i].Incorrect+'</td>' +
				  '<td scope="col">'+userScores[i].Minutes+'</td>' + 
				  '<td scope="col">'+userScores[i].Seconds+'</td>'; 
		row += '</tr>';
		
		console.log(row);

		$('table> tbody:last').append(row);

	}