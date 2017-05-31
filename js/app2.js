'use strict';

var userInputArray = [];
var questionArray = [];

function Question () {
  this.question = '';
  this.name = '';
}

var indoorsQuestion = new Question ();
indoorsQuestion.question = 'Do you want to work out indoors?';
indoorsQuestion.name = 'indoorsQuestion';
questionArray.push(indoorsQuestion);

var cardioQuestion = new Question ();
cardioQuestion.question = 'Do you want the workout to include cardio?';
cardioQuestion.name = 'cardioQuestion';
questionArray.push(cardioQuestion);

var timeQuestion = new Question ();
timeQuestion.question = 'Do you have a lot of time to dedicate?';
timeQuestion.name = 'timeQuestion';
questionArray.push(timeQuestion);

var intenseQuestion = new Question ();
intenseQuestion.question = 'Do you want an intense workout?';
intenseQuestion.name = 'intenseQuestion';
questionArray.push(intenseQuestion);

var caloriesQuestion = new Question ();
caloriesQuestion.question = 'Do you want to burn a lot of calories?';
caloriesQuestion.name = 'caloriesQuestion';
questionArray.push(caloriesQuestion);

var partnerQuestion = new Question ();
partnerQuestion.question = 'Do you want to workout with a partner?';
partnerQuestion.name = 'partnerQuestion';
questionArray.push(partnerQuestion);

var bodyQuestion = new Question ();
bodyQuestion.question = 'Do you want a full body workout?';
bodyQuestion.name = 'bodyQuestion';
questionArray.push(bodyQuestion);

var sweatQuestion = new Question ();
sweatQuestion.question = 'Do you want to SWEAT IT OUT!?';
sweatQuestion.name = 'sweatQuestion';
questionArray.push(sweatQuestion);


for (var i = 0; i < questionArray.length; i++){
  var aquestion = document.createElement('label');
  aquestion.setAttribute('class', 'questionCSS');
  var space = document.createElement('br');
  var input1 = document.createElement('input');
  var yes = document.createElement('p');
  input1.type = 'radio';
  input1.value = 'true';
  input1.name = questionArray[i].name;
  input1.setAttribute('class', 'answerCSS');
  yes.textContent = 'YES';
  yes.setAttribute('class', 'answerCSS');
  var input2 = document.createElement('input');
  var no = document.createElement('p');
  input2.type = 'radio';
  input2.value = 'false';
  input2.name = questionArray[i].name;
  input2.setAttribute('class', 'answerCSS');
  no.textContent = 'NO';
  no.setAttribute('class', 'answerCSS');
  aquestion.textContent = questionArray[i].question;
  document.getElementById('question-space').appendChild(aquestion);
  document.getElementById('question-space').appendChild(yes);
  document.getElementById('question-space').appendChild(input1);
  document.getElementById('question-space').appendChild(no);
  document.getElementById('question-space').appendChild(input2);
  document.getElementById('question-space').appendChild(space);
}

function scoreAssignment(exercise){
  for (var i = 0; i < userInputArray.length; i++){
    if (destringify(userInputArray[i].value) === exercise.characteristics[i].value){
      exercise.score++;
    }
  }
}

function removeForm(){
  document.getElementById('form-selection').style.display = 'none';
}

function assignexerciseScores(){
  for(var i = 0; i < exerciseArray.length; i++){
    scoreAssignment(exerciseArray[i]);
    console.log(exerciseArray[i]);
  }
}

function destringify(string){
  if(string === 'true'){
    string = true;
  }
  else if(string === 'false'){
    string = false;
  }
  return string;
}

function sortResults(){
  exerciseArray.sort(function (a, b) {
    if (a.score > b.score){
      return -1;
    }
    if (b.score > a.score){
      return 1;
    } return 0;
  });
}

function processUserAnswers(event){
  event.preventDefault();
  console.log(event.target);

  // create answerArray
  var answerArray = [];

  for (var i = 0; i < questionArray.length; i++) {
    var questionName = questionArray[i].name;
    var userAnswer = event.target[questionName].value;
    // Add userAnswer to array with .push
    console.log(userAnswer);
    answerArray.push(userAnswer);
  }

  var sortedList = getSortedExercises(answerArray);
  // [{score:5, exerciseName: 'pullups', ..... }]
  console.log('sorted list is ', sortedList);

  // assignexerciseScores();
  // sortResults();
  // removeForm();
  appendResultList(sortedList);
}

function getSortedExercises(userAnswer) {
  // these booleans correspond to indoors, cardio, time, intense and calories in that order
  // for loop..
  // for each item in your list of exercises, and each user answer, iterate a score.
  var scoreArray = [];

  // Create a fit score for each exercise based on the booleans in the user answer answerArray
  for (var i = 0; i < exerciseArray.length; i++) {
    var scoreStruct = {};
    var score = 0;
    if (exerciseArray[i].indoors.toString() == userAnswer[0])  score++;
    if (exerciseArray[i].cardio.toString() == userAnswer[1])  score++;
    if (exerciseArray[i].time.toString() == userAnswer[2]) score++;
    if (exerciseArray[i].intense.toString() == userAnswer[3]) score++;
    if (exerciseArray[i].calories.toString() == userAnswer[4]) score++;
    if (exerciseArray[i].partner.toString() == userAnswer[5]) score++;
    if (exerciseArray[i].body.toString() == userAnswer[6]) score++;
    if (exerciseArray[i].sweat.toString() == userAnswer[7]) score++;
    // do the same for the other 4
    console.log("score is ", score);
    scoreStruct.exercise = exerciseArray[i];
    scoreStruct.matchScore = score;
    scoreArray.push(scoreStruct);
  }

  // score list of matches [3, 5, 2, 3], correspond to [resist, pullups, chair, bodyweight]
  // [pullups, resist, bodyweight, chair]

  // sort the exercises and return
  scoreArray.sort(function(a, b){ return b.matchScore - a.matchScore; });

  return scoreArray;
}

//CREATE RANKED LIST AFTER FORM RESULTS
function appendResultList(sortedArray) {
  var formResults = document.getElementById('form-results');
  var resultsHeader = document.createElement('h2');
  resultsHeader.textContent = 'Here are the exercises that meet your needs in order from best to worst:';
  formResults.appendChild(resultsHeader);
  var formResultsOL = document.createElement('ol');
  formResults.appendChild(formResultsOL);
  for (i = 0; i < sortedArray.length; i++) {
    var formResultsLI = document.createElement('li');
    formResultsOL.appendChild(formResultsLI);
    var aTag = document.createElement('a');
    aTag.setAttribute('href', sortedArray[i].exercise.pageLink);
    //aTag.setAttribute('href', + sortedArray[i].exercise.pageLink);
    aTag.innerHTML = sortedArray[i].exercise.name;
    formResultsLI.appendChild(aTag);
  }
}

//EVENT LISTENER FOR FORM PAGE
var getUserAnswers = document.getElementById('help-me-choose-form');
getUserAnswers.addEventListener('submit', processUserAnswers);
