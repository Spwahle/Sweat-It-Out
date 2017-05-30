
var currentWorkout;
var commentsArray = [];
var workoutArray = [];
var workoutIntense = [];
var workoutTime = [];
var workoutsection = [];
var workoutCardio = [];
var workoutCalories = [];

// function Neighborhood (name) {
//   this.name = name;
//   this.characteristics = [];
//   this.map = '';
//   this.blurb = '';
//   this.score = 0;
//   this.pageLink = '';
//   this.factsList = [];
//   this.photo = '';
// }

function Exercise (name) {
  this.name = name;
  this.intensity = [];
  this.section = [];
  this.time = [];
  this.cardio = [];
  this.calories = [];
  this.equipment = [];
}

// Neighborhood.prototype.addCharacteristic = function(characteristic, value) {
//   var char = {
//     characteristic: characteristic,
//     value: value
//   };
//   this.characteristics.push(char);
// };

Exercise.prototype.addCharacteristic = function(characteristic, value) {
  var char = {
    characteristic: characteristic,
    value: value
  };
  this.characteristics.push(char);
};

var resistantBand

//	Front Squat •	Cross body reach •	Upright row •	Triceps extensions •	Overhead press •	Bent over rows •	Lateral raise •	Lying chest press •	Russian twist •	Tricep kickbacks •	Bicep curls
var resist = new Neighborhood ('resist');
resist.addCharacteristic('section', true);
resist.addCharacteristic('cardio', false);
resist.addCharacteristic('time', false);
resist.addCharacteristic('intense', false);
resist.addCharacteristic('calories', true);
resist.map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42981.60533212787!2d-122.42219963318377!3d47.67761592236304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549015d57a5da881%3A0xd07680ac0ad3f49c!2sresist%2C+Seattle%2C+WA!5e0!3m2!1sen!2sus!4v1459889721120';
resist.blurb = '';
resist.pageLink = 'resist';
resist.photo = 'Assets/resist.jpg';
resist.factsList = [''];
neighborhoodArray.push(resist);



function createUserArray(characteristic, value){
  var userChar = {
    characteristic: characteristic,
    value: value
  };
  userInputArray.push(userChar);
}

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
      for (var i = 0; i < workoutArray.length; i++){
        if (workoutArray[i].pageLink === pair[1]){
          displayWorkout(workoutArray[i]);
          return;
        }
      }
    }
  }
}

var workoutCheck = document.getElementById('workout-name');
if (workoutCheck) {
  getQueryVariable('id');
}

//DISPLAY PAGE CONTENT FOR workout.HTML
function displayWorkout(workout){

  fetchCommentsFromLocal();

  var title = document.createElement('h1');
  title.textContent = workout.name;
  document.getElementById('workout-name').appendChild(title);

  var mapImage = document.createElement('iframe');
  mapImage.src = workout.map;
  document.getElementById('google-map').appendChild(mapImage);

  var blurbContent = document.createElement('section');
  blurbContent.textContent = workout.blurb;
  document.getElementById('info-box').appendChild(blurbContent);

  currentWorkout = workout.pageLink;

  var workoutPhoto = document.createElement('img');
  workoutPhoto.setAttribute('src', workout.photo);
  document.getElementById('info-box').appendChild(workoutPhoto);

  var factsContent = document.createElement('ul');
  document.getElementById('info-box').appendChild(factsContent);

  for (var i = 0; i < commentsArray.length; i++) {
    var userComment = document.createElement('p');
    var inputName = document.createElement('p');
    if (commentsArray[i].workout === currentWorkout) {
      userComment.textContent = commentsArray[i].comment;
      inputName.textContent = commentsArray[i].username;
      document.getElementById('comments').appendChild(inputName);
      document.getElementById('comments').appendChild(userComment);
    }
  }

  for (var i = 0; i < workout.factsList.length; i++){
    var facts = document.createElement('li');
    facts.textContent = workout.factsList[i];
    factsContent.appendChild(facts);
  }
}

function displayWorkouts() {
  var places = document.getElementById('places-list');
  var resultsHeader = document.createElement('h2');
  resultsHeader.textContent = 'List of Workouts';
  places.appendChild(resultsHeader);
  var formResultsOL = document.createElement('ul');
  places.appendChild(formResultsOL);
  for (i = 0; i < workoutArray.length; i++) {
    var formResultsLI = document.createElement('li');
    formResultsOL.appendChild(formResultsLI);
    var aTag = document.createElement('a');
    aTag.setAttribute('href', 'neighborhood.html?id=' + workoutArray[i].pageLink);
    aTag.innerHTML = workoutArray[i].name;
    formResultsLI.appendChild(aTag);
  };
}

//display page content for places.html - navigation backup page
var workoutCheck = document.getElementById('workout-list');
if (workoutCheck) {
  displayWorkout();
}

//EVENT LISTENER FOR COMMENTS
var commentForm = document.getElementById('neighborhood-comment-form');
commentForm.addEventListener('submit', processComment);

function processComment(event){
  event.preventDefault();
  var userComment = document.createElement('p');
  userComment.setAttribute('class', currentWorkout);
  userComment.textContent = 'Comment: ' + event.target.comment.value;
  console.log(userComment);
  var inputName = document.createElement('p');
  inputName.setAttribute('class', currentWorkout);
  inputName.textContent = 'Name: ' + event.target.nameofuser.value;
  console.log(inputName);
  document.getElementById('comments').appendChild(inputName);
  document.getElementById('comments').appendChild(userComment);
  var commentObject = {
    Workout: currentWorkout,
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
var getUserAnswers = document.getElementById('sweat-it-out-form');
getUserAnswers.addEventListener('submit', processUserAnswers);

//EVENT LISTENER FOR COMMENTS
var commentForm = document.getElementById('workout-comment-form');
commentForm.addEventListener('submit', processComment);
