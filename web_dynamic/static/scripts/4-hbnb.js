$(function () {
  window.addEventListener('load', function (){
  // task 2 script
  const amenityIds = {};
  $('input[type=checkbox]').change(function (){
  if ($(this).prop('checked')) {
    amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityIds[$(this).attr('data-id')];
    }
    if (Object.keys(amenityIds).length === 0) {
        $('div.amenities h4').html('&nbsp');
      } else {
        $('div.amenities h4').text(Object.values(amenityIds).join(', '));
      }
  });
  });


  // Task 4 script
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (data) {
      for (let place of data) {
        $('.places').append('<article><div class="title"><h2>' + place['name'] + '</h2><div class="price_by_night">' + place['price_by_night'] + '</div></div><div class="information"><div class="max_guest">' + place['max_guest'] + 'Guests</div><div class"number_rooms">' + place['number_rooms'] + 'bedrooms</div><div class="number_bathrooms">' + place['number_bathrooms'] + 'bathrooms</div><div class="user"><div class="description">' + place['description'] + '</div></article>');
      }
    }
  });


  // Task 5 script
  $(':button').on('click', function () {
    let amen = { 'amenities': amenityIds }
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(amen),
      success: function (data) {
        $('.places article').remove();
        for (let place of data) {
         $('.places').append('<article><div class="title"><h2>' + place['name'] + '</h2><div class="price_by_night">' + place['price_by_night'] + '</div></div><div class="information"><div class="max_guest">' + place['max_guest'] + 'Guests</div><div class"number_rooms">' + place['number_rooms'] + 'bedrooms</div><div class="number_bathrooms">' + place['number_bathrooms'] + 'bathrooms</div><div class="user"><div class="description">' + place['description'] + '</div></article>');
        }
      }
    })
  });
});
