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
});
