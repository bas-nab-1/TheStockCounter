// Function to switch from intro to main content

$("#start-btn").on("click", function() {
    $("#main").show("swing");
    $("#intro").hide("swing");
});


// Display the new-location div //

$("#new-location-btn").on("click", function() {
    $("#new-location").show("swing");
    $("#new-location-btn").hide();
    $("#duplicate").show();
});


// Create up to 6 clones of the new-location-input div //

$("#duplicate").on("click", function() {
    var currentCount = $("#new-location .new-location-input").length;
        if (currentCount < 6) {
            $(".new-location-input").first().clone().appendTo("#new-location");
        }

        if ($("#new-location .new-location-input").length >= 6) {
            $("#duplicate").remove();
        }
    });



// Enable the Bootstrap tooltips

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))