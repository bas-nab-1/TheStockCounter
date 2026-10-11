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
        $("#duplicate").hide();
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


// Allows user to modify the title of the report

document.getElementById("edit-title").addEventListener("click", function() {
    const title = document.getElementById("title")
    const titleInput = document.createElement("input");
    titleInput.id = "title-input";
    titleInput.type = "text";
    titleInput.value = title.textContent;
    
    titleInput.addEventListener("keydown", function(e) {
        if (e.key !== "Enter") return;

        const updatedTitle = document.createElement("h2");
        updatedTitle.id = "title";
        updatedTitle.textContent = titleInput.value;
        titleInput.replaceWith(updatedTitle);
    });
    title.replaceWith(titleInput);
})

// Transfer the values of the inputs to the table when Save button is clicked

document.getElementById("save-btn").addEventListener("click", function() {
        const itemDescription = document.getElementById("item-description");
    const itemQuantity = document.getElementById("quantity");
    // checks that the required input are not empty an informs the user
    if(!itemDescription.reportValidity()) {
        return;
    }

    if(!itemQuantity.reportValidity()) {
        return;
    }
    
    // create a new row to the table and call for functions to transfer values
    const row = document.createElement("tr");
    transferItemDescription(row);
    transferQuantity(row);
    transferQuantityRequired(row);
    transferDifference(row);
    document.getElementById("transfer").appendChild(row);
    
    // resets the input fields of the add-item div
    //when save-btn is clicked
    
    document.getElementById("item-description").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("quantity-required").value = "";
    document.getElementById("difference").value = "";

    // resets the input fields of new-location-input 
    // when save btn is clicked
    document.querySelectorAll(".item-location").forEach(element => {
        element.value = "";
    });
    document.querySelectorAll(".quantity-location").forEach(element => {
        element.value = "";
    });

    $("#new-location").hide();
    $("#new-location-btn").show();
    $("#duplicate").hide();
});

function transferItemDescription(row) {
    row.insertCell().textContent = document.getElementById("item-description").value;
}

function transferQuantity(row) {
    row.insertCell().textContent = document.getElementById("quantity").value;
}

function transferQuantityRequired(row) {
    row.insertCell().textContent = document.getElementById("quantity-required").value;
}

function transferDifference(row) {
    row.insertCell().textContent = document.getElementById("difference").value;
}



// Enables the Bootstrap tooltips

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))