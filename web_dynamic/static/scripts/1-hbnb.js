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
});
