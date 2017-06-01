
var currentexercise;
var commentsArray = [];
var exerciseArray = [];



function Exercise (name) {
  this.name = name;
  this.indoors = [];
  this.cardio = [];
  this.time = [];
  this.intense = [];
  this.calories = [];
  this.partner = [];
  this.body = [];
  this.sweat = [];
  // this.characteristics = [];
}

var rotate = false;
function setbackground(){
  window.setTimeout( "setbackground()", 5000);
  newImage = rotate ? 'url(../Assets/Inspiration/Inspiration5.jpg)' : '../Assets/Inspiration/Inspiration2.jpg)';
  rotate = !rotate;
  document.getElementById('change').style.backgroundImage = newImage;
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

// create var list of 'indoors', 'Resistance', ... etc to correspond to boolean answers

//	Front Squat •	Cross body reach •	Upright row •	Triceps extensions •	Overhead press •	Bent over rows •	Lateral raise •	Lying chest press •	Russian twist •	Tricep kickbacks •	Bicep curls
var Resistance = new Exercise ('Resistance Band');
Resistance.addCharacteristic('indoors', true);
Resistance.addCharacteristic('cardio', false);
Resistance.addCharacteristic('time', false);
Resistance.addCharacteristic('intense', true);
Resistance.addCharacteristic('calories', true);
Resistance.addCharacteristic('partner', true);
Resistance.addCharacteristic('body', true);
Resistance.addCharacteristic('sweat', false);
Resistance.pageLink = 'resistance.html';
Resistance.photo = 'Assets/Band/images.jpg';
Resistance.factsList = ['Use the heel of your feet to push your body up to the starting position as you exhale.'];
exerciseArray.push(Resistance);

var Pullups = new Exercise ('Pullups');
Pullups.addCharacteristic('indoors', false);
Pullups.addCharacteristic('cardio', true);
Pullups.addCharacteristic('time', false);
Pullups.addCharacteristic('intense', true);
Pullups.addCharacteristic('calories', false);
Pullups.addCharacteristic('partner', false);
Pullups.addCharacteristic('body', true);
Pullups.addCharacteristic('sweat', true);
Pullups.pageLink = 'pullups.html';
Pullups.photo = 'Assets/Pullups.jpg';
Pullups.factsList = [''];
exerciseArray.push(Pullups);

var Chair = new Exercise ('Chair Workouts');
Chair.addCharacteristic('indoors', true);
Chair.addCharacteristic('cardio', true);
Chair.addCharacteristic('time', false);
Chair.addCharacteristic('intense', true);
Chair.addCharacteristic('calories', true);
Chair.addCharacteristic('partner', false);
Chair.addCharacteristic('body', true);
Chair.addCharacteristic('sweat', true);
Chair.pageLink = 'chair.html';
Chair.photo = 'Assets/Chair.jpg';
Chair.factsList = [''];
exerciseArray.push(Chair);

var Bodyweight = new Exercise ('Bodyweight');
Bodyweight.addCharacteristic('indoors', true);
Bodyweight.addCharacteristic('cardio', false);
Bodyweight.addCharacteristic('time', true);
Bodyweight.addCharacteristic('intense', false);
Bodyweight.addCharacteristic('calories', false);
Bodyweight.addCharacteristic('partner', false);
Bodyweight.addCharacteristic('body', true);
Bodyweight.addCharacteristic('sweat', true);
Bodyweight.pageLink = 'bodyweight.html';
Bodyweight.photo = 'Assets/Bodyweight.jpg';
Bodyweight.factsList = [''];
exerciseArray.push(Bodyweight);

var Core = new Exercise ('Core Exercises');
Core.addCharacteristic('indoors', false);
Core.addCharacteristic('cardio', true);
Core.addCharacteristic('time', true);
Core.addCharacteristic('intense', true);
Core.addCharacteristic('calories', true);
Core.addCharacteristic('partner', true);
Core.addCharacteristic('body', true);
Core.addCharacteristic('sweat', true);
Core.pageLink = 'core.html';
Core.photo = 'Assets/core.jpg';
Core.factsList = [''];
exerciseArray.push(Core);



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

  var blurbContent = document.createElement('indoors');
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
//event listener submit click = document


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

// EVENT LISTENER FOR FORM PAGE
var getUserAnswers = document.getElementById('sweat-it-out-form');
getUserAnswers.addEventListener('submit', processUserAnswers);

// EVENT LISTENER FOR COMMENTS
var commentForm = document.getElementById('exercise-comment-form');
commentForm.addEventListener('submit', processComment);
