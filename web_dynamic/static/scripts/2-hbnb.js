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
});
