<<<<<<< HEAD
$(document).ready(function() {
    let amenityIds = {};
    
    function updateAmenities() {
        let checkedAmenities = Object.values(amenityIds);
        $('.amenities h4').text(checkedAmenities.join(', '));
    }

    $('.amenities input[type="checkbox"]').change(function() {
        let amenityId = $(this).data('id');
        let amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            amenityIds[amenityId] = amenityName;
        } else {
            delete amenityIds[amenityId];
        }

        updateAmenities();
    });
=======
$(document).ready(function () {
  // Add a space before function parentheses
  $('.amenities input[type="checkbox"]').change(function () {
    var amenities = [];
    // Add space before function parentheses
    $('.amenities input[type="checkbox"]').each(function () {
      // '$' is defined globally in jQuery, no need to declare
      // Add space before function parentheses
      if ($(this).is(':checked')) {
        // Use const or let instead of var
        const amenityId = $(this).data('id');
        amenities.push(amenityId);
      }
    });
    // '$' is defined globally in jQuery, no need to declare
    // Add space before function parentheses
    $('div.amenities h4').text(amenities.join(', '));
  });
>>>>>>> pre_deploy
});
