// Function to switch from intro to main content

$("#start-btn").on("click", function() {
    $("#main").show("swing");
    $("#intro").hide("swing");
});

$("#new-location-btn").on("click", function() {
    $("#new-location").show("swing");
});



// Enable the Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))