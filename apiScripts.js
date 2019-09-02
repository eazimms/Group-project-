// Functions
// Get song kick location
// Get song kick shows (location)

// Get yelp requests (lat and long from kick show)

function getSongkickLocation(query) {
  // Switch statement based on query information passed to function
  var queryURL = 'https://api.songkick.com/api/3.0/search/locations.json?apikey=NBBXfIsma0WxaO7n&query=' + query;

  var queryURL =
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (response) {
      return response.resultsPage.location;
    });
}

function getSongkickShows(location, min_date, max_date, page) {
  if (min_date != '') {
    var startDate = '&min_date=' + min_date;
  }
  if (max_date != '') {
    var endDate = '&max_date=' + max_date;
  }
  var queryURL = 'https://api.songkick.com/api/3.0/metro_areas/12283/calendar.json?apikey=NBBXfIsma0WxaO7n' + startDate + endDate + '&page=' + page + '&per_page=25';

  var responseArray = [];
  var queryURL =
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (response) {

      for (var i = 0; i < response.results.event.length; i++) {
        var individualEvent = response.results.event[i];
        var individualResponse = {};

        // Primary Key
        individualResponse.id = individualEvent.id;

        // Event popularity
        individualResponse.popularity = individualEvent.popularity;
        // Event Name
        individualResponse.displayName = individualEvent.displayName;
        // Event Date
        individualResponse.startDate = individualEvent.start.date;
        // Event Time
        individualResponse.startTime = individualEvent.start.time;
        // Location
        individualResponse.latitude = individualEvent.venue.lat;
        individualResponse.longitude = individualEvent.venue.lng;
        responseArray.push(individualEvent);
      }
      return responseArray;
    }
    )
}


function getYelpInformation(latitude, longitude) {
  var queryURL = 'https://api.yelp.com/v3/businesses/search?latitude=' + latitude + '&longitude=' + longitude;
  var queryURL =
    $.ajax({
      url: queryURL,
      method: 'GET',
      headers: { 'authorization': 'bearer fPHJlT9V-VdXW7R2Tb4fViB-fynuvorWm-hy9usb8DfqWyk_EiDtV1-oANH7lwaAKjyisudQak2FRMDGp_tWbIRQER3iE1w-iTmIBAgb7bRA10RU5Ou4S8jh1PdlXXYx' }
    }).then(function (response) {
      // Code for individual businesses
      var responseArray = [];

      for (var i = 0; i < response.businesses.length; i++) {
        var individualRestaurant = response.businesses[0];
        var individualResponse = {};

        individualResponse.id = individualRestaurant.id;
        individualResponse.name = individualResponse.name;
        individualResponse.image_url = individualResponse.image_url;

        var categories = [];

        for (var i = 0; i < individualRestaurant.categories.length; i++) {
          categories.push(individualRestaurant.categories[i].title)
        }

        individualResponse.categories = categories;
        individualResponse.rating = individualRestaurant.rating;

        responseArray.push(individualResponse);
      }
      return responseArray;

    }
    )
}

function getEventDetails(idNumber) {
  var queryURL = 'https://api.songkick.com/api/3.0/events/' + idNumber + '.json?apikey=NBBXfIsma0WxaO7n';

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    var individualEvent = response.resultsPage.event;
    var individualResponse = {};

    // Primary Key
    individualResponse.id = individualEvent.id;

    // Event popularity
    individualResponse.popularity = individualEvent.popularity;
    // Event Name
    individualResponse.displayName = individualEvent.displayName;
    // Event Date
    individualResponse.startDate = individualEvent.start.date;
    // Event Time
    individualResponse.startTime = individualEvent.start.time;
    // Location
    individualResponse.latitude = individualEvent.venue.lat;
    individualResponse.longitude = individualEvent.venue.lng;

    return individualEvent;
  }

  )
}

function getRestaurantDetails(idNumber){

  var queryURL = 'https://api.yelp.com/v3/businesses/' + idNumber;

  $.ajax({
    url: queryURL,
    method: 'GET',
    headers: { 'authorization': 'bearer fPHJlT9V-VdXW7R2Tb4fViB-fynuvorWm-hy9usb8DfqWyk_EiDtV1-oANH7lwaAKjyisudQak2FRMDGp_tWbIRQER3iE1w-iTmIBAgb7bRA10RU5Ou4S8jh1PdlXXYx' }
  }).then(function (response) {
    var individualResponse = {};

        individualResponse.id = response.id;
        individualResponse.name = response.name;
        individualResponse.image_url = response.image_url;

        var categories = [];

        for (var i = 0; i < response.categories.length; i++) {
          categories.push(response.categories[i].title)
        }

        individualResponse.categories = categories;
        individualResponse.rating = response.rating;

        return individualResponse;
  }
  )
}