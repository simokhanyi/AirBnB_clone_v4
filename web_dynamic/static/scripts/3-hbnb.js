$(document).ready(function () {
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
});
