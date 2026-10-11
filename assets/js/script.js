// Function to switch from intro to main content

$("#start-btn").on("click", function() {
    $("#main").show("swing");
    $("#intro").hide("swing");
});


// Displays the new-location div //

$("#new-location-btn").on("click", function() {
    $("#new-location").show("swing");
    $("#new-location-btn").hide();
    $("#duplicate").show();
});


// Creates up to 6 clones of the new-location-input div //

$("#duplicate").on("click", function() {
    var currentCount = $("#new-location .new-location-input").length;
    if (currentCount < 6) {
        $(".new-location-input").first().clone().find("input").val("").end()
            .appendTo("#new-location").css("border-top", "3px solid #bbb");
    }

    if ($("#new-location .new-location-input").length >= 6) {
        $("#duplicate").remove();
    }
});



/* Calculates the difference between quantity and quantity required
and assign it to the difference input field */

document.getElementById("quantity-required").addEventListener("input", updateDifference);

function updateDifference() {
    const qty = parseFloat(document.getElementById("quantity").value);
    const req = parseFloat(document.getElementById("quantity-required").value);
    const difference = qty - req;
    const differenceInput = document.getElementById("difference");

    differenceInput.value = difference;
}

// Adds the quantities entered for each location to the overall quantity

document.addEventListener("input", function(e) {
    if(!e.target.matches(".quantity-location")) return;
    let total = 0;
    let hasQuantity = false;
    
    for(let input of document.querySelectorAll(".quantity-location")) {
        if (input.value !=="") {
            total += Number(input.value);
            hasQuantity = true;
        }
    }
    document.getElementById("quantity").value = hasQuantity ? total : "";
    updateDifference();
})

// Enables the Bootstrap tooltips

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))