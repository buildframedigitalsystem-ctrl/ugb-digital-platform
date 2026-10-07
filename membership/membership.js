/* =========================================================
   UGB MEMBERSHIP FORM
   Frontend Interaction Logic
========================================================= */

const membershipForm =
    document.getElementById("membershipForm");

const membershipStatusOptions =
    document.querySelectorAll(
        'input[name="membershipStatus"]'
    );

const existingUgbIdField =
    document.getElementById("existingUgbId");

const existingUgbIdContainer =
    existingUgbIdField
        ? existingUgbIdField.closest(".membership-id-field")
        : null;


/* =========================================================
   MEMBERSHIP STATUS LOGIC
========================================================= */

function updateMembershipStatus() {

    const selectedStatus =
        document.querySelector(
            'input[name="membershipStatus"]:checked'
        );

    /*
     * No membership status has been selected yet.
     */

    if (!selectedStatus || !existingUgbIdField) {
        return;
    }

    const status =
        selectedStatus.value;


    /* =====================================================
       EXISTING MEMBER — KNOWS UGB ID NUMBER
    ===================================================== */

    if (status === "existing-known-id") {

        if (existingUgbIdContainer) {
            existingUgbIdContainer.style.display = "";
        }

        existingUgbIdField.disabled = false;
        existingUgbIdField.required = true;

        existingUgbIdField.placeholder =
            "Enter your existing UGB ID Number";

        return;
    }


    /* =====================================================
       EXISTING MEMBER — DOES NOT KNOW UGB ID NUMBER
    ===================================================== */

    if (status === "existing-unknown-id") {

        if (existingUgbIdContainer) {
            existingUgbIdContainer.style.display = "";
        }

        existingUgbIdField.required = false;
        existingUgbIdField.disabled = true;
        existingUgbIdField.value = "";

        existingUgbIdField.placeholder =
            "UGB ID will be located during record verification";

        return;
    }


    /* =====================================================
       NEW MEMBER
    ===================================================== */

    if (status === "new-member") {

        existingUgbIdField.required = false;
        existingUgbIdField.disabled = true;
        existingUgbIdField.value = "";

        if (existingUgbIdContainer) {
            existingUgbIdContainer.style.display = "none";
        }

        return;
    }

}


/* =========================================================
   LISTEN FOR MEMBERSHIP STATUS CHANGES
========================================================= */

membershipStatusOptions.forEach(
    function (option) {

        option.addEventListener(
            "change",
            updateMembershipStatus
        );

    }
);


/* =========================================================
   INITIAL PAGE STATE
========================================================= */

updateMembershipStatus();


/* =========================================================
   MEMBER PHOTO PREVIEW
========================================================= */

const memberPhotoInput =
    document.getElementById("memberPhoto");

const memberPhotoPreview =
    document.getElementById("memberPhotoPreview");


if (memberPhotoInput && memberPhotoPreview) {

    memberPhotoInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            /*
             * Restore the empty preview if no file
             * is currently selected.
             */

            if (!file) {

                memberPhotoPreview.innerHTML = `
                    <div class="member-photo-placeholder">

                        <span
                            class="member-photo-placeholder-icon"
                        >
                            ♙
                        </span>

                        <small>
                            Your photo will appear here
                        </small>

                    </div>
                `;

                return;
            }


            /*
             * Only allow image files.
             */

            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select a valid image file."
                );

                this.value = "";

                return;
            }


            /*
             * Create temporary browser preview.
             * The image is NOT uploaded anywhere.
             */

            const imageURL =
                URL.createObjectURL(file);

            const image =
                document.createElement("img");

            image.src =
                imageURL;

            image.alt =
                "UGB Member Photo Preview";


            image.onload =
                function () {

                    URL.revokeObjectURL(
                        imageURL
                    );

                };


            memberPhotoPreview.innerHTML = "";

            memberPhotoPreview.appendChild(
                image
            );

        }
    );

}


/* =========================================================
   FRONTEND-ONLY FORM SUBMISSION
========================================================= */

/*
 * IMPORTANT:
 *
 * This Membership Form is NOT connected to the
 * Google Apps Script receiver, Google Drive,
 * Google Sheets, or the future UGB database yet.
 *
 * No membership information leaves the browser.
 */

if (membershipForm) {

    membershipForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const selectedStatus =
                document.querySelector(
                    'input[name="membershipStatus"]:checked'
                );


            /* =================================================
               MEMBERSHIP STATUS REQUIRED
            ================================================= */

            if (!selectedStatus) {

                alert(
                    "Please select your membership status."
                );

                return;
            }


            /* =================================================
               EXISTING MEMBER WHO KNOWS UGB ID
            ================================================= */

            if (
                selectedStatus.value ===
                "existing-known-id" &&
                existingUgbIdField &&
                !existingUgbIdField.value.trim()
            ) {

                alert(
                    "Please enter your existing UGB ID Number."
                );

                existingUgbIdField.focus();

                return;
            }


            /* =================================================
               STANDARD REQUIRED FIELD VALIDATION
            ================================================= */

            if (!membershipForm.checkValidity()) {

                membershipForm.reportValidity();

                return;
            }


            /* =================================================
               FRONTEND TEST SUCCESS
            ================================================= */

            alert(
                "UGB Membership Form frontend test successful.\n\n" +
                "No membership information has been submitted " +
                "or stored yet.\n\n" +
                "The official membership review and submission " +
                "workflow will be connected separately."
            );

        }
    );

}