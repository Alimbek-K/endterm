
const bookingForm = document.getElementById("bookingForm");
const bookingSuccess = document.getElementById("bookingSuccess");
const totalPrice = document.getElementById("totalPrice");

const zonePrices = {
    standard: 3,
    pro: 5,
    vip: 8
};

const fields = [
    "name", "email", "phone", "zone",
    "date", "time", "hours", "rules"
];

function getField(id) {
    return document.getElementById(id);
}

function showError(id, message) {
    const field = getField(id);
    const error = getField(id + "Error");

    error.textContent = message;
    field.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");
}

function clearError(id) {
    const field = getField(id);
    const error = getField(id + "Error");

    error.textContent = "";
    field.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
}

function calculateTotal() {
    const zone = getField("zone").value;
    const hours = Number(getField("hours").value);

    const price = zonePrices[zone] || 0;
    const total = price * hours;

    totalPrice.textContent = "$" + total;

    return total;
}

function validateField(id) {
    const field = getField(id);
    const value = field.type === "checkbox"
        ? field.checked
        : field.value.trim();

    let error = "";

    if (id === "name") {
        if (value.length === 0) {
            error = "Please enter your full name.";
        } else if (value.length < 3) {
            error = "Name must contain at least 3 characters.";
        } else if (!/^[\p{L}\s'-]+$/u.test(value)) {
            error = "Name can contain only letters, spaces, apostrophes and hyphens.";
        }
    }

    if (id === "email") {
        if (!value) {
            error = "Please enter your email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Please enter a valid email address.";
        }
    }

    if (id === "phone") {
        const digits = value.replace(/\D/g, "");

        if (!value) {
            error = "Please enter your phone number.";
        } else if (!/^\+?[\d\s()-]+$/.test(value) ||
                   digits.length < 10 ||
                   digits.length > 15) {
            error = "Enter a valid phone number with 10 to 15 digits.";
        }
    }

    if (id === "zone" && !value) {
        error = "Please choose a gaming zone.";
    }

    if (id === "hours" && !value) {
        error = "Please choose the gaming duration.";
    }

    if (id === "date") {
        if (!value) {
            error = "Please select a date.";
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const selectedDate = new Date(value + "T00:00:00");

            if (selectedDate < today) {
                error = "You cannot book a date in the past.";
            }
        }
    }

    if (id === "time") {
        if (!value) {
            error = "Please select a time.";
        } else if (getField("date").value) {
            const selectedDateTime = new Date(
                getField("date").value + "T" + value
            );

            if (selectedDateTime <= new Date()) {
                error = "Please choose a future date and time.";
            }
        }
    }

    if (id === "rules" && !value) {
        error = "You must agree to the GameHub rules.";
    }

    if (error) {
        showError(id, error);
        return false;
    }

    clearError(id);
    return true;
}

fields.forEach(function(id) {
    const field = getField(id);
    const eventName = field.tagName === "SELECT" ||
                      field.type === "checkbox" ||
                      field.type === "date" ||
                      field.type === "time"
        ? "change"
        : "input";

    field.addEventListener(eventName, function() {
        if (bookingSuccess.hidden === false) {
            bookingSuccess.hidden = true;
        }

        validateField(id);

        if (id === "date") {
            if (getField("time").value) {
                validateField("time");
            }
        }

        if (id === "zone" || id === "hours") {
            calculateTotal();
        }
    });
});

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    bookingSuccess.hidden = true;

    let isValid = true;
    let firstInvalidField = null;

    fields.forEach(function(id) {
        if (!validateField(id)) {
            isValid = false;

            if (!firstInvalidField) {
                firstInvalidField = getField(id);
            }
        }
    });

    if (!isValid) {
        firstInvalidField.focus();
        return;
    }

    const name = getField("name").value.trim();
    const zone = getField("zone").selectedOptions[0].textContent;
    const date = getField("date").value;
    const time = getField("time").value;
    const hours = getField("hours").value;
    const total = calculateTotal();

    bookingSuccess.textContent =
        "Booking request received, " + name +
        "! Zone: " + zone +
        ". Date: " + date +
        ". Time: " + time +
        ". Duration: " + hours +
        " hour(s). Estimated total: $" + total +
        ". This is a demo booking; no real reservation was made.";

    bookingForm.reset();

    fields.forEach(function(id) {
        clearError(id);
    });

    calculateTotal();

    bookingSuccess.hidden = false;
$(bookingSuccess).stop(true, true).hide().fadeIn(400);
});

calculateTotal();
