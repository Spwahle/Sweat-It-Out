'use strict'

var userInputArray = [];
var questionArray = [];

function Question () {
  this.question = '';
  this.name = '';
}

var sectionQuestion = new Question ();
sectionQuestion.question = 'What section do you want to work out? Upper or Lower?';
sectionQuestion.name = 'sectionQuestion';
questionArray.push(sectionQuestion);

var intenseQuestion = new Question ();
intenseQuestion.question = 'Do you want an intense workout?';
intenseQuestion.name = 'intenseQuestion';
questionArray.push(intenseQuestion);

var timeQuestion = new Question ();
timeQuestion.question = 'Do you have a lot of time to dedicate?';
timeQuestion.name = 'timeQuestion';
questionArray.push(timeQuestion);

var cardioQuestion = new Question ();
cardioQuestion.question = 'Do you want the workout to include cardio?';
cardioQuestion.name = 'cardioQuestion';
questionArray.push(cardioQuestion);


var caloriesQuestion = new Question ();
caloriesQuestion.question = 'Do you want to build a lot of calories?';
caloriesQuestion.name = 'caloriesQuestion';
questionArray.push(caloriesQuestion);



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

  for (var i = 0; i < questionArray.length; i++) {
    var questionName = questionArray[i].name;
    var userAnswer = event.target[questionName].value;
    console.log(userAnswer);
    createUserArray(questionName, userAnswer);
  }
  assignexerciseScores();
  sortResults();
  removeForm();
  appendResultList();
}
//CREATE RANKED LIST AFTER FORM RESULTS
function appendResultList() {
  var formResults = document.getElementById('form-results');
  var resultsHeader = document.createElement('h2');
  resultsHeader.textContent = 'Here are the exercises that meet your needs in order from best to worst:';
  formResults.appendChild(resultsHeader);
  var formResultsOL = document.createElement('ol');
  formResults.appendChild(formResultsOL);
  for (i = 0; i < exerciseArray.length; i++) {
    var formResultsLI = document.createElement('li');
    formResultsOL.appendChild(formResultsLI);
    var aTag = document.createElement('a');
    aTag.setAttribute('href', 'exercise.html?id=' + exerciseArray[i].pageLink);
    aTag.innerHTML = exerciseArray[i].name;
    formResultsLI.appendChild(aTag);
  }
}

//EVENT LISTENER FOR FORM PAGE
var getUserAnswers = document.getElementById('help-me-choose-form');
getUserAnswers.addEventListener('submit', processUserAnswers);
