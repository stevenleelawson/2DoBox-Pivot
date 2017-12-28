$('.save-button').on('click', newIdea);
$('.idea-list').on('blur', 'h2', editTitle);
$('.idea-list').on('blur', '.card-body', editBody);
$('.search-input').on('keyup', searchList);

retrieveCard();

function newIdea(event) {
  event.preventDefault();
  var title = $('.title-input');
  var body = $('.body-input');
  var newCard = new MakeCard(title.val(), body.val());
  appendCard(newCard);
  pushToStorage(newCard.uniqueid, newCard)
  title.val('');
  body.val('');
};

function MakeCard(title, body) {
  this.title = title;
  this.body = body;
  this.quality = "swill";
  this.uniqueid = Date.now();
  // var objectToStore = {uniqueid: this.uniqueid, title: $title.val(), body: $body.val(), quality: this.quality};
  // var stringifiedObject = JSON.stringify(objectToStore);
  // localStorage.setItem(this.uniqueid, stringifiedObject);

};

function appendCard(ideaCard) {
  $('.idea-list').prepend(
    `<article class="card" id="${ideaCard.uniqueid}">
      <h2 class="card-title" contenteditable="true">${ideaCard.title}</h2>
      <button class="card-buttons delete-button"></button>
      <p class="card-body" contenteditable="true">${ideaCard.body}</p>
      <nav>
        <button class="card-buttons up-vote"></button>
        <button class="card-buttons down-vote"></button>
        <p class="quality">quality: ${ideaCard.quality}</p>
      </nav>
    </article>`)
};

function retrieveCard(){
  for(var i=0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  appendCard(parsedObject);
}};

function pushToStorage(id, object){
  var stringifiedObject = JSON.stringify(object);
  localStorage.setItem(id, stringifiedObject);
}

// $('.idea-list').on('click', '.up-vote', function() {
//   if ($(this).closest('nav').children('p').text() === 'quality: swill')
//     {$(this).siblings('.quality').text('quality: plausible');
//     var id = this.closest('article').getAttribute('id');
//     var retrievedObject = localStorage.getItem(id);
//     var parsedObject = JSON.parse(retrievedObject);
//     parsedObject.quality = 'plausible';
//     pushToStorage(id, parsedObject);
//  } else if ($(this).closest('nav').children('p').text() === 'quality: plausible')
//     {$(this).siblings('.quality').text('quality: genius')
//     var id = this.closest('article').getAttribute('id');
//     var retrievedObject = localStorage.getItem(id);
//     var parsedObject = JSON.parse(retrievedObject);;
//     parsedObject.quality = 'genius';
//     pushToStorage(id, parsedObject);
// }});
//
// $('.idea-list').on('click', '.down-vote', function (){
//   if ($(this).closest('nav').children('p').text() === 'quality: genius')
//     {$(this).siblings('.quality').text('quality: plausible');
//     var id = this.closest('article').getAttribute('id');
//     var retrievedObject = localStorage.getItem(id);
//     var parsedObject = JSON.parse(retrievedObject);;
//     parsedObject.quality = 'plausible';
//     pushToStorage(id, parsedObject);
//   } else if ($(this).closest('nav').children('p').text() === 'quality: plausible')
//     {$(this).siblings('.quality').text('quality: swill');
//     var id = this.closest('article').getAttribute('id');
//     var retrievedObject = localStorage.getItem(id);
//     var parsedObject = JSON.parse(retrievedObject);
//     parsedObject.quality = 'swill';
//     pushToStorage(id, parsedObject);
// }});

$('.idea-list').on('click', '.delete-button', deleteCard);
function deleteCard() {
  var id = this.closest('article').getAttribute('id');
  localStorage.removeItem(id);
  this.closest('article').remove();
};

function editTitle(card) {
  var id = this.closest('article').getAttribute('id');
  var newTitle = $(this).closest('.card-title').text();
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  parsedObject.title = newTitle;
  pushToStorage(id, parsedObject);
};

function editBody(card) {
  var id = this.closest('article').getAttribute('id');
  var newTitle = $(this).closest('.card-body').text();
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  parsedObject.body = newTitle;
  pushToStorage(id, parsedObject);
};

function searchList(e) {
  event.preventDefault();
  var titles = $('h2');
  var bodies = $('.card-body');
  var eachtitle = '';
  var eachbody = '';
  for (var i = 0; i < (titles.length || bodies.length); i++) {
    eachtitle = titles[i].innerText;
    eachbody = bodies[i].innerText;
    var searchInputTitle = eachtitle.includes($('.search-input').val());
    var searchInputBody = eachbody.includes($('.search-input').val());
  if (searchInputTitle === false && searchInputBody === false) {
    $($('h2')[i]).parent().hide();
  } else if (searchInputTitle === true || searchInputBody === true) {
    $($('h2')[i]).parent().show();
}}};
