//
var currentexercise;
var commentsArray = [];
var exerciseArray = [];


//Constuctor function
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


Exercise.prototype.addCharacteristic = function(characteristic, value) {
  // characteristic = time, this would be this.time = value;
  this[characteristic] = value;

};

// create var list of 'indoors', 'Resistance', ... etc to correspond to boolean answers
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
Pullups.pageLink = 'pullup.html';
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
