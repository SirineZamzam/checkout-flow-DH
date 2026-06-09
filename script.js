const continueBtn =
    document.getElementById(
        "continueBtn"
    );

const payBtn =
    document.getElementById(
        "payBtn"
    );

const infoSection =
    document.getElementById(
        "infoSection"
    );

const paymentSection =
    document.getElementById(
        "paymentSection"
    );

const stepInfo =
    document.getElementById(
        "stepInfo"
    );

const stepPayment =
    document.getElementById(
        "stepPayment"
    );

const stepComplete =
    document.getElementById(
        "stepComplete"
    );

const loader =
    document.getElementById(
        "loader"
    );

const resultSection =
    document.getElementById(
        "resultSection"
    );

const checkoutWrapper =
    document.getElementById(
        "checkoutWrapper"
    );

/* ERROR HELPERS */

function showError(
    input,
    message
) {

    input.style.borderColor =
        "#dc3545";

    const errorElement =
        input.parentElement.querySelector(
            ".error-text"
        );

    if (errorElement) {

        errorElement.textContent =
            message;
    }
}

function clearError(
    input
) {

    input.style.borderColor =
        "";

    const errorElement =
        input.parentElement.querySelector(
            ".error-text"
        );

    if (errorElement) {

        errorElement.textContent =
            "";
    }
}

/* STEP 1 VALIDATION */

function validateInformation() {

    let valid = true;

    const name =
        document.getElementById(
            "name"
        );

    const email =
        document.getElementById(
            "email"
        );

    const phone =
        document.getElementById(
            "phone"
        );

    const street =
        document.getElementById(
            "street"
        );

    const city =
        document.getElementById(
            "city"
        );

    const zip =
        document.getElementById(
            "zip"
        );

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        name.value.trim().length < 3
    ) {

        showError(
            name,
            "Enter your full name"
        );

        valid = false;

    } else {

        clearError(name);
    }

    if (
        !emailRegex.test(
            email.value
        )
    ) {

        showError(
            email,
            "Enter a valid email"
        );

        valid = false;

    } else {

        clearError(email);
    }

    if (
        phone.value.trim().length < 8
    ) {

        showError(
            phone,
            "Enter a valid phone"
        );

        valid = false;

    } else {

        clearError(phone);
    }

    if (
        street.value.trim() === ""
    ) {

        showError(
            street,
            "Street is required"
        );

        valid = false;

    } else {

        clearError(street);
    }

    if (
        city.value.trim() === ""
    ) {

        showError(
            city,
            "City is required"
        );

        valid = false;

    } else {

        clearError(city);
    }

    if (
        zip.value.trim() === ""
    ) {

        showError(
            zip,
            "Zip code required"
        );

        valid = false;

    } else {

        clearError(zip);
    }

    return valid;
}

/* CONTINUE BUTTON */

continueBtn.addEventListener(
    "click",
    () => {

        if (
            !validateInformation()
        ) {
            return;
        }

        infoSection.classList.add(
            "d-none"
        );

        paymentSection.classList.remove(
            "d-none"
        );

        stepPayment.classList.add(
            "active"
        );
    }
);

/* CARD PREVIEW */

const cardNumber =
    document.getElementById(
        "cardNumber"
    );

const cardName =
    document.getElementById(
        "cardName"
    );

const expiry =
    document.getElementById(
        "expiry"
    );

const cvv =
    document.getElementById(
        "cvv"
    );

cardNumber.addEventListener(
    "input",
    function () {

        let value =
            this.value.replace(
                /\D/g,
                ""
            );

        value =
            value.match(/.{1,4}/g)
                ?.join(" ")
            || "";

        this.value = value;

        document.getElementById(
            "previewNumber"
        ).textContent =
            value ||
            "•••• •••• •••• ••••";
    }
);

cardName.addEventListener(
    "input",
    function () {

        document.getElementById(
            "previewName"
        ).textContent =
            this.value.toUpperCase()
            || "YOUR NAME";
    }
);

expiry.addEventListener(
    "input",
    function () {

        document.getElementById(
            "previewExpiry"
        ).textContent =
            this.value
            || "MM/YY";
    }
);
/* CVV PREVIEW */

cvv.addEventListener(
    "input",
    function () {

        if (
            document.getElementById(
                "previewCvv"
            )
        ) {

            document.getElementById(
                "previewCvv"
            ).textContent =
                this.value || "***";
        }
    }
);

/* PAYMENT VALIDATION */

function validatePayment() {

    let valid = true;

    const cardNumber =
        document.getElementById(
            "cardNumber"
        );

    const cardName =
        document.getElementById(
            "cardName"
        );

    const expiry =
        document.getElementById(
            "expiry"
        );

    const cvv =
        document.getElementById(
            "cvv"
        );

    if (
        cardName.value.trim() === ""
    ) {

        cardName.style.borderColor =
            "#dc3545";

        valid = false;

    } else {

        cardName.style.borderColor =
            "";
    }

    if (
        cardNumber.value
            .replace(/\s/g, "")
            .length !== 16
    ) {

        cardNumber.style.borderColor =
            "#dc3545";

        valid = false;

    } else {

        cardNumber.style.borderColor =
            "";
    }

    const expiryRegex =
        /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (
        !expiryRegex.test(
            expiry.value
        )
    ) {

        expiry.style.borderColor =
            "#dc3545";

        valid = false;

    } else {

        expiry.style.borderColor =
            "";
    }

    if (
        !/^\d{3}$/.test(
            cvv.value
        )
    ) {

        cvv.style.borderColor =
            "#dc3545";

        valid = false;

    } else {

        cvv.style.borderColor =
            "";
    }

    return valid;
}

/* PAYMENT SUBMIT */

payBtn.addEventListener(
    "click",
    () => {

        if (
            !validatePayment()
        ) {
            return;
        }

        loader.style.display =
            "flex";

        setTimeout(() => {

            loader.style.display =
                "none";

            checkoutWrapper.classList.add(
                "d-none"
            );

            stepComplete.classList.add(
                "active"
            );

            const success = true;

            if (success) {

                resultSection.innerHTML = `

                <div class="success-card">

                    <div class="success-icon">
                        ✓
                    </div>

                    <h2 class="mt-4">
                        Payment Successful
                    </h2>

                    <p class="text-muted mt-3">
                        Your payment has been processed successfully.
                    </p>

                    <div class="mt-4">

                        <strong>
                            Order #ORD-20381
                        </strong>

                    </div>

                    <button
                        class="primary-btn mt-4"
                        onclick="location.reload()">

                        Back To Checkout

                    </button>

                </div>

                `;

            } else {

                resultSection.innerHTML = `

                <div class="success-card">

                    <div class="failure-icon">
                        ✕
                    </div>

                    <h2 class="mt-4">
                        Payment Failed
                    </h2>

                    <p class="text-muted mt-3">
                        Something went wrong.
                        Please try again.
                    </p>

                    <button
                        class="primary-btn mt-4"
                        onclick="location.reload()">

                        Try Again

                    </button>

                </div>

                `;
            }

        }, 2000);
    }
);

/* CARD INPUT FORMATTING */

expiry.addEventListener(
    "input",
    function () {

        let value =
            this.value.replace(
                /\D/g,
                ""
            );

        if (
            value.length >= 3
        ) {

            value =
                value.substring(0, 2)
                + "/"
                + value.substring(
                    2,
                    4
                );
        }

        this.value = value;

        document.getElementById(
            "previewExpiry"
        ).textContent =
            value || "MM/YY";
    }
);

/* PAYMENT METHOD ACTIVE */

const methods =
    document.querySelectorAll(
        ".method"
    );

methods.forEach(
    (method) => {

        method.addEventListener(
            "click",
            () => {

                methods.forEach(
                    (btn) =>
                        btn.classList.remove(
                            "active-method"
                        )
                );

                method.classList.add(
                    "active-method"
                );
            }
        );
    }
);