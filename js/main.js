$(document).ready(function() {
  $('.loading-screen').hide();
  $('.wrapper').show();

  const url = "https://randomuser.me/api/?results=12&nat=us";
  const callback = function(data) {
    let html = `<ul>`;
    data.results.forEach(function(employee){
      html += `<li class="small-card">`;
      html += `<img src="${employee.picture.large}" alt="Employee profile picture"/>`;
      html += `<span class="name">${employee.name.first} ${employee.name.last}</span>`;
      html += `<span class="email">${employee.email}</span>`;
      html += `<span class="city">${employee.location.city}</span>`;
      html += `</li>`;
    });
    html += `</ul>`;
    $('.employees').html(html);
    console.log(html);
  };

  $.getJSON(url, callback);
});















/*******

$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    const $submit = $('#submit');
    const $search = $('#search');
    $submit.attr("disabled", true).val("searching...");
    $search.prop("disabled", true);

    const url = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    const animal = $('#search').val();
    const options = {
      tags: animal,
      format: "json"
    };
    const displayPhotos = function(data) {
      let html = '';
      data.items.forEach(function(photo){
        html += '<li class="grid-25 tablet-grid-50">';
        html += `<a href="${photo.link}" class="image">`;
        html += `<img src="${photo.media.m}"></a></li>`;
      });
      $('#photos').html(html);
      $submit.attr("disabled", false).val("Search");
      $search.prop("disabled", false);
    }
    $.getJSON(url, options, displayPhotos);

  });
});

*******/
