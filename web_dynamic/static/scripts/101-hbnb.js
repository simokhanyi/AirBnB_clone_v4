$(document).ready(function () {
    // Variable to store checked states and cities
    var selectedStates = {};
    var selectedCities = {};

    // Function to update the h4 tag with checked states and cities
    function updateLocations() {
        var selectedStatesList = Object.values(selectedStates).map(function(state) {
            return state.name;
        });
        var selectedCitiesList = Object.values(selectedCities).map(function(city) {
            return city.name;
        });
        var locations = selectedStatesList.concat(selectedCitiesList).join(", ");
        $(".locations h4").text(locations);
    }

    // Function to check API status
    function checkApiStatus() {
        $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
            if (data.status === "OK") {
                // Add the class available to the div#api_status
                $("#api_status").addClass("available");
            } else {
                // Remove the class available from the div#api_status
                $("#api_status").removeClass("available");
            }
        });
    }

    // Call the function on page load
    checkApiStatus();

    // Call the function every 5 seconds
    setInterval(checkApiStatus, 5000);

    // Function to fetch places and display them
    function fetchPlaces() {
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            contentType: "application/json",
            data: JSON.stringify({}), // Send an empty dictionary
            success: function(response) {
                // Clear existing places
                $(".places").empty();

                // Loop through places and create article tags
                response.forEach(function(place) {
                    var article = "<article>" +
                                      "<div class='title_box'>" +
                                          "<h2>" + place.name + "</h2>" +
                                          "<div class='price_by_night'>$" + place.price_by_night + "</div>" +
                                      "</div>" +
                                      "<div class='information'>" +
                                          "<div class='max_guest'>" + place.max_guest + " Guest" + (place.max_guest !== 1 ? "s" : "") + "</div>" +
                                          "<div class='number_rooms'>" + place.number_rooms + " Bedroom" + (place.number_rooms !== 1 ? "s" : "") + "</div>" +
                                          "<div class='number_bathrooms'>" + place.number_bathrooms + " Bathroom" + (place.number_bathrooms !== 1 ? "s" : "") + "</div>" +
                                      "</div>" +
                                      "<div class='description'>" + place.description + "</div>" +
                                  "</article>";
                    $(".places").append(article);
                });
            },
            error: function(xhr, status, error) {
                console.error("Error fetching places:", error);
            }
        });
    }

    // Call fetchPlaces function on page load
    fetchPlaces();

    // Event listener for checkbox changes
    $(".state-checkbox").change(function() {
        var stateId = $(this).data("id");
        var stateName = $(this).data("name");
        if (this.checked) {
            selectedStates[stateId] = { id: stateId, name: stateName };
        } else {
            delete selectedStates[stateId];
        }
        updateLocations();
    });

    $(".city-checkbox").change(function() {
        var cityId = $(this).data("id");
        var cityName = $(this).data("name");
        if (this.checked) {
            selectedCities[cityId] = { id: cityId, name: cityName };
        } else {
            delete selectedCities[cityId];
        }
        updateLocations();
    });

    // Event listener for the search button
    $("#search-button").click(function() {
        // Get list of checked amenities
        var amenities = [];
        $(".amenity-checkbox:checked").each(function() {
            amenities.push($(this).data("id"));
        });

        // Make a POST request with the list of amenities
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            contentType: "application/json",
            data: JSON.stringify({ amenities: amenities }),
            success: function(response) {
                // Clear existing places
                $(".places").empty();

                // Loop through places and create article tags
                response.forEach(function(place) {
                    var article = "<article>" +
                                      "<div class='title_box'>" +
                                          "<h2>" + place.name + "</h2>" +
                                          "<div class='price_by_night'>$" + place.price_by_night + "</div>" +
                                      "</div>" +
                                      "<div class='information'>" +
                                          "<div class='max_guest'>" + place.max_guest + " Guest" + (place.max_guest !== 1 ? "s" : "") + "</div>" +
                                          "<div class='number_rooms'>" + place.number_rooms + " Bedroom" + (place.number_rooms !== 1 ? "s" : "") + "</div>" +
                                          "<div class='number_bathrooms'>" + place.number_bathrooms + " Bathroom" + (place.number_bathrooms !== 1 ? "s" : "") + "</div>" +
                                      "</div>" +
                                      "<div class='description'>" + place.description + "</div>" +
                                  "</article>";
                    $(".places").append(article);
                });
            },
            error: function(xhr, status, error) {
                console.error("Error fetching places:", error);
            }
        });
    });

    // Event listener for Reviews span toggle
    $("h3:contains('Reviews')").append('<span id="toggle-reviews">show</span>');
    $("#toggle-reviews").click(function() {
        var toggleText = $(this).text();
        if (toggleText === "show") {
            // Fetch and display reviews
            // Dummy implementation for demonstration
            $(".places").append("<div class='review'>This is a review</div>");
            $(this).text("hide");
        } else {
            // Hide reviews
            $(".review").remove();
            $(this).text("show");
        }
    });
});
