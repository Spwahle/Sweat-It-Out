
var currentexercise;
var commentsArray = [];
var exerciseArray = [];
var exerciseIntense = [];
var exerciseTime = [];
var exercisesection = [];
var exerciseCardio = [];
var exerciseCalories = [];


function Exercise (name) {
  this.name = name;
  this.intensity = [];
  this.section = [];
  this.time = [];
  this.cardio = [];
  this.calories = [];
  this.equipment = [];
  // this.characteristics = [];
}

Exercise.prototype.addCharacteristic = function(characteristic, value) {
  // characteristic = time, this would be this.time = value;
  this[characteristic] = value;
  // var char = {
  //   characteristic: characteristic,
  //   value: value
  // };
  // this.characteristics.push(char);
};

// create var list of 'section', 'resist', ... etc to correspond to boolean answers

//	Front Squat •	Cross body reach •	Upright row •	Triceps extensions •	Overhead press •	Bent over rows •	Lateral raise •	Lying chest press •	Russian twist •	Tricep kickbacks •	Bicep curls
var resist = new Exercise ('resist');
resist.addCharacteristic('section', true);
resist.addCharacteristic('cardio', false);
resist.addCharacteristic('time', false);
resist.addCharacteristic('intense', false);
resist.addCharacteristic('calories', true);
resist.pageLink = 'resistance.html';
resist.photo = 'Assets/Band/images.jpg';
resist.factsList = [''];
exerciseArray.push(resist);

var pullups = new Exercise ('pullups');
pullups.addCharacteristic('section', true);
pullups.addCharacteristic('cardio', true);
pullups.addCharacteristic('time', true);
pullups.addCharacteristic('intense', false);
pullups.addCharacteristic('calories', true);
pullups.pageLink = 'pullups';
pullups.photo = 'Assets/pullups.jpg';
pullups.factsList = [''];
exerciseArray.push(pullups);

var chair = new Exercise ('chair');
chair.addCharacteristic('section', true);
chair.addCharacteristic('cardio', false);
chair.addCharacteristic('time', false);
chair.addCharacteristic('intense', true);
chair.addCharacteristic('calories', true);
chair.pageLink = 'chair';
chair.photo = 'Assets/chair.jpg';
chair.factsList = [''];
exerciseArray.push(chair);

var bodyweight = new Exercise ('bodyweight');
bodyweight.addCharacteristic('section', true);
bodyweight.addCharacteristic('cardio', false);
bodyweight.addCharacteristic('time', false);
bodyweight.addCharacteristic('intense', false);
bodyweight.addCharacteristic('calories', false);
bodyweight.pageLink = 'bodyweight';
bodyweight.photo = 'Assets/bodyweight.jpg';
bodyweight.factsList = [''];
exerciseArray.push(bodyweight);



// function createUserArray(characteristic, value){
//   var userChar = {
//     characteristic: characteristic,
//     value: value
//   };
//   userInputArray.push(userChar);
// }

//QUERYSTRING STUFF
//based on css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  var key, value;
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    key = pair[0];
    value = pair[1];
    console.log('key: ' + key);
    if( key === 'id' ){
      for (var i = 0; i < exerciseArray.length; i++){
        if (exerciseArray[i].pageLink === pair[1]){
          displayexercise(exerciseArray[i]);
          return;
        }
      }
    }
  }
}

var exerciseCheck = document.getElementById('exercise-name');
if (exerciseCheck) {
  getQueryVariable('id');
}

//DISPLAY PAGE CONTENT FOR exercise.HTML
function displayexercise(exercise){

  fetchCommentsFromLocal();

  var title = document.createElement('h1');
  title.textContent = exercise.name;
  document.getElementById('exercise-name').appendChild(title);

  // var mapImage = document.createElement('iframe');
  // mapImage.src = exercise.map;
  // document.getElementById('google-map').appendChild(mapImage);

  var blurbContent = document.createElement('section');
  blurbContent.textContent = exercise.blurb;
  document.getElementById('info-box').appendChild(blurbContent);

  currentexercise = exercise.pageLink;

  var exercisePhoto = document.createElement('img');
  exercisePhoto.setAttribute('src', exercise.photo);
  document.getElementById('info-box').appendChild(exercisePhoto);

  var factsContent = document.createElement('ul');
  document.getElementById('info-box').appendChild(factsContent);

  for (var i = 0; i < commentsArray.length; i++) {
    var userComment = document.createElement('p');
    var inputName = document.createElement('p');
    if (commentsArray[i].exercise === currentexercise) {
      userComment.textContent = commentsArray[i].comment;
      inputName.textContent = commentsArray[i].username;
      document.getElementById('comments').appendChild(inputName);
      document.getElementById('comments').appendChild(userComment);
    }
  }

  for (var i = 0; i < exercise.factsList.length; i++){
    var facts = document.createElement('li');
    facts.textContent = exercise.factsList[i];
    factsContent.appendChild(facts);
  }
}

function displayExercises() {
  var places = document.getElementById('places-list');
  var resultsHeader = document.createElement('h2');
  resultsHeader.textContent = 'List of exercises';
  places.appendChild(resultsHeader);
  var formResultsOL = document.createElement('ul');
  places.appendChild(formResultsOL);
  for (i = 0; i < exerciseArray.length; i++) {
    var formResultsLI = document.createElement('li');
    formResultsOL.appendChild(formResultsLI);
    var aTag = document.createElement('a');
    aTag.setAttribute('href', 'exercise.html?id=' + exerciseArray[i].pageLink);
    aTag.innerHTML = exerciseArray[i].name;
    formResultsLI.appendChild(aTag);
  }
}

//display page content for places.html - navigation backup page
var exerciseCheck = document.getElementById('exercise-list');
if (exerciseCheck) {
  displayExercises();
}

//EVENT LISTENER FOR COMMENTS
var commentForm = document.getElementById('exercise-comment-form');
//commentForm.addEventListener('submit', processComment);

function processComment(event){
  event.preventDefault();
  var userComment = document.createElement('p');
  userComment.setAttribute('class', currentexercise);
  userComment.textContent = 'Comment: ' + event.target.comment.value;
  console.log(userComment);
  var inputName = document.createElement('p');
  inputName.setAttribute('class', currentexercise);
  inputName.textContent = 'Name: ' + event.target.nameofuser.value;
  console.log(inputName);
  document.getElementById('comments').appendChild(inputName);
  document.getElementById('comments').appendChild(userComment);
  var commentObject = {
    exercise: currentexercise,
    username: inputName.textContent,
    comment: userComment.textContent
  };
  commentsArray.push(commentObject);
  saveCommentsToLocal();
  commentForm.reset();
}

function saveCommentsToLocal(){
  localStorage.setItem('savedComments', JSON.stringify(commentsArray));
}

function fetchCommentsFromLocal(){
  var savedComments = JSON.parse(localStorage.getItem('savedComments'));
  if (savedComments){
    console.log('User has comments from last time.');
    commentsArray = savedComments; }
}

//EVENT LISTENER FOR FORM PAGE
// var getUserAnswers = document.getElementById('sweat-it-out-form');
// getUserAnswers.addEventListener('submit', processUserAnswers);

//EVENT LISTENER FOR COMMENTS
// var commentForm = document.getElementById('exercise-comment-form');
// commentForm.addEventListener('submit', processComment);
