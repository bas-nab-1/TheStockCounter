/* jshint esversion: 11, jquery: true */

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
        .find('[data-bs-toggle="tooltip"]').remove().end()
        .appendTo("#new-location").css("border-top", "3px solid #bbb");
    }

    if ($("#new-location .new-location-input").length >= 6) {
        $("#duplicate").hide();
    }
});



/* Calculates the difference between quantity and quantity required
and assign it to the difference input field */

document.getElementById("quantity-required").addEventListener("input", updateDifference);
document.getElementById("quantity").addEventListener("input", updateDifference);

function updateDifference() {
    const quantityInput = document.getElementById("quantity");
    const requiredInput = document.getElementById("quantity-required");
    const differenceInput = document.getElementById("difference");

    const qty = parseFloat(quantityInput.value);
    const req = parseFloat(requiredInput.value);

    if (quantityInput.value === "" || requiredInput.value === "" ) {
        differenceInput.value = "";
        return;
    }
    
    differenceInput.value = qty - req;
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
});


// Allows user to modify the title of the report

document.getElementById("edit-title").addEventListener("click", function() {
    const title = document.getElementById("title");
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
});

// Save button

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
    
    /* resets the input fields of the add-item div
    when save-btn is clicked */
    
    document.getElementById("item-description").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("quantity-required").value = "";
    document.getElementById("difference").value = "";

    /* resets the input fields of new-location-input 
     when save btn is clicked */
    document.querySelectorAll(".item-location").forEach(element => {
        element.value = "";
    });
    document.querySelectorAll(".quantity-location").forEach(element => {
        element.value = "";
    });

    // Removes previously created div when a new item is created
    document.querySelectorAll(".new-location-input").forEach((location, index) => {
        if (index > 0) {
            location.remove();
        }
    });

    $("#new-location").hide();
    $("#new-location-btn").show();
    $("#duplicate").hide();
    $("#report").show("swing");
});


// Functions used to transfer item values into the table row
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


/* Generates a PDF from the #report element 
and downloads it when the button is clicked. */

document.getElementById("download").addEventListener("click", generatePDF);

function generatePDF(e) {
    const pencil=document.getElementById("edit-title");
    pencil.classList.add("hide-pencil");
    const element = document.getElementById('print');
    const options = {
        margin:       0.5,
        filename:     'document.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    return html2pdf().set(options).from(element).save().then(
        function() {
            pencil.classList.remove("hide-pencil");
        },
    );
}

// Enables the Bootstrap tooltips

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));