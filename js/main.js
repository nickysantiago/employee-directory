/*
  When page finishes loading, create and send AJAX request,
  format the response, append it to the page, and hide the
  div with the gallery and big cards.
*/
$(document).ready(function() {
  const url = "https://randomuser.me/api/?results=12&nat=us";
  const callback = function(data) {
    $('main').prepend(createSearchInput());
    $('.employees').html(createListOfSmallCards(data.results));
    $('.gallery').html(createListOfBigCards(data.results) + createGalleryButtons());
    $('.gallery .big-cards .big-card').each(function() {
      $(this).hide();
    });
    $('.gallery').hide();
  };
  $.getJSON(url, callback);
});

/*
  Function that creates div with a search input inside.
*/
const createSearchInput = function() {
  let html = '<div class="employee-search">';
  html += `<input type="text" placeholder="Search employees"/>`;
  html += `</div>`;
  return html;
};

/*
  Function that creates small employee cards with less info
  to be displayed when the page loads.
*/
const createListOfSmallCards = function(dataArray) {
  let html = `<ul class="small-cards" >`;
  dataArray.forEach(function(employee){
    html += `<li class="small-card">`;
    html += `<img src="${employee.picture.large}" alt="Employee profile picture"/>`;
    html += `<div class="brief-info">`;
    html += `<p class="name">${employee.name.first} ${employee.name.last}</p>`;
    html += `<p class="email">${employee.email}</p>`;
    html += `<p class="city">${employee.location.city}</p>`;
    html += `<p class="username" style="display: none">${employee.login.username}</p>`;
    html += `</div>`;
    html += `</li>`;
  });
  html += `</ul>`;
  return html;
};

/*
  Function that creates big employee cards with more info
  to be displayed when user clicks on a small card.
*/
const createListOfBigCards = function(dataArray) {
  let html = `<ul class="big-cards">`; //style="display: none"
  dataArray.forEach(function(employee){
    html += `<li class="big-card">`;
    html += `<button class="button close-button">x</button>`;
    html += `<img src="${employee.picture.large}" alt="Employee profile picture"/>`;
    html += `<div class="brief-info">`;
    html += `<p class="name">${employee.name.first} ${employee.name.last}</p>`;
    html += `<p class="email">${employee.email}</p>`;
    html += `<p class="city">${employee.location.city}</p>`;
    html += `</div>`;
    html += `<div class="extended-info">`;
    html += `<p class="phone">${employee.phone}</p>`;
    html += `<p class="address">${employee.location.street}, ${employee.location.state} ${employee.location.postcode}</p>`;
    // employee.dob.substr is NOT a function, breaks the code :( 
    // html += `<p class="birthday">Birthday:
    //         ${employee.dob.substr(5,2)}/${employee.dob.substr(8,2)}/${employee.dob.substr(0,4)}</p>`;
    html += `</div>`;
    html += `</li>`;
  });
  html += `</ul>`;
  return html;
};

/*
  Function that creates back and forward buttons to navigate
  the list of big cards.
*/
const createGalleryButtons = function() {
  let html = `<div class="nav-buttons">`;
  html +=  `<button class="button nav-button"><</button>`;
  html += `<button class="button nav-button">></button>`;
  html += `</div>`;
  return html;
};

/*
  Event listener for small card elements.
  When the user clicks on a small card, show the gallery with
  the corresponding big card they clicked on.
*/
$('.employees').on('click', '.small-card', function(event) {
  if( $(event.currentTarget).attr('class').includes("small-card") ) {
    $('.gallery').show();
    // Loop through each big card
    $('.big-card').each(function() {
      const nameOnBigCard = $(this).children('.brief-info').children('.name').text();
      const nameOnSmallCard = $(event.currentTarget).children('.brief-info').children('.name').text();
      // If the name of the big card equals the name of the small card that was clicked on
      if( nameOnBigCard === nameOnSmallCard ) {
        $(this).show();
        return;
      }
    });
  }
});

/*
  Event listener for gallery element.
*/
$('.gallery').on('click', function(event) {
  // Hides gallery when user clicks the 'x' on the card
  if( $(event.target).attr('class').includes("close-button") ) {
    $('.gallery').fadeOut();
    $(event.target).parent().fadeOut();
  } else if( $(event.target).attr('class').includes("nav-button") ) {
    const $currentCard = $('.big-card[style=""]');
    const $leftCard = $($currentCard).prev();
    const $rightCard = $($currentCard).next();
    // Moves left if left button was pressed and there is a card to the left
    if( $(event.target).text() === '<' && $leftCard.length > 0) {
      $($currentCard).hide();
      $($leftCard).show();
      // Moves right if right button was pressed and there is a card to the right
    } else if ( $(event.target).text() === '>' && $rightCard.length > 0 ) {
      $($currentCard).hide();
      $($rightCard).show();
    }
  }
});

/*
  Event listener for search input.
  Function will look at matching names and usernames every time
  the user writes on the input search bar.
*/
$('main').on('keyup', 'input', function(event) {
  // Show all employees once search bar is empty
  if( $(this).val() === "" ) {
    $('.small-card').each(function(event) {
      $(this).show();
    });
  }
  // If user enters a valid character or presses backspace and there is at least one character
  else if((event.which >= 33 && event.which <= 222) || event.which === 8
  && $(event.target).val().length > 0) {
    // Get input text and make it lower case
    const inputText = $(event.target).val().toLowerCase();
    // Loop through the array of small cards
    $('.small-card').each(function() {
      const $employeeName = $(this).children('.brief-info').children('.name').text();
      const $employeeUserName = $(this).children('.brief-info').children('.username').text();
      // Hide those whose name and username don't match
      if(!$employeeName.includes(inputText) && !$employeeUserName.includes(inputText)) {
        $(this).fadeOut(200);
        // Show those whose name and username match
      } else {
        $(this).fadeIn(200);
      }
    });
  }
});
