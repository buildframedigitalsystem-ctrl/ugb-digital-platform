"use strict";

/* =========================================================
   UGB ORGANIZATION / UMBRELLA GROUP INFORMATION FORM
   FORM 03
   Frontend behavior only
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const organizationForm =
        document.getElementById("organizationForm");

    const identityInput =
        document.getElementById("organizationIdentity");

    const identityPreview =
        document.getElementById("organizationIdentityPreview");

    const submitButton =
        document.getElementById("organizationSubmitButton");


    /* =====================================================
       OFFICIAL GROUP IDENTITY PREVIEW
    ====================================================== */

    let currentPreviewUrl = null;

    if (identityInput && identityPreview) {

        identityInput.addEventListener("change", () => {

            const file = identityInput.files?.[0];

            if (!file) {
                resetIdentityPreview();
                return;
            }


            /* ---------------------------------------------
               ALLOWED IMAGE TYPES
            --------------------------------------------- */

            const allowedTypes = [
                "image/png",
                "image/jpeg",
                "image/webp"
            ];

            if (!allowedTypes.includes(file.type)) {

                alert(
                    "Please select a PNG, JPG/JPEG, or WEBP image."
                );

                identityInput.value = "";

                resetIdentityPreview();

                return;
            }


            /* ---------------------------------------------
               PREVIEW IMAGE
            --------------------------------------------- */

            if (currentPreviewUrl) {
                URL.revokeObjectURL(currentPreviewUrl);
            }

            currentPreviewUrl =
                URL.createObjectURL(file);


            const previewImage =
                document.createElement("img");

            previewImage.src =
                currentPreviewUrl;

            previewImage.alt =
                "Organization official group identity preview";


            identityPreview.innerHTML = "";

            identityPreview.appendChild(
                previewImage
            );

        });

    }


    /* =====================================================
       RESET IDENTITY PREVIEW
    ====================================================== */

    function resetIdentityPreview() {

        if (!identityPreview) {
            return;
        }

        if (currentPreviewUrl) {

            URL.revokeObjectURL(
                currentPreviewUrl
            );

            currentPreviewUrl = null;
        }


        identityPreview.innerHTML = `
            <div class="preview-placeholder">

                <span
                    class="preview-image-icon"
                    aria-hidden="true">
                    ◇
                </span>

                <small>
                    Group identity will appear here
                </small>

            </div>
        `;

    }


    /* =====================================================
       FORM SUBMISSION
       FRONTEND DEMO ONLY FOR NOW
    ====================================================== */

    if (organizationForm) {

        organizationForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                /* -----------------------------------------
                   USE NORMAL HTML VALIDATION
                ----------------------------------------- */

                if (!organizationForm.checkValidity()) {

                    organizationForm.reportValidity();

                    return;
                }


                /* -----------------------------------------
                   PREVENT ACCIDENTAL DOUBLE CLICK
                ----------------------------------------- */

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.setAttribute(
                        "aria-busy",
                        "true"
                    );

                    submitButton.innerHTML = `
                        <span>
                            CHECKING FORM...
                        </span>
                    `;

                }


                /* -----------------------------------------
                   FRONTEND-ONLY NOTICE
                ----------------------------------------- */

                window.setTimeout(() => {

                    alert(
                        "Organization information is complete and ready for submission.\n\n" +
                        "This form is currently in frontend preparation mode. " +
                        "No organization record has been stored or transmitted yet."
                    );


                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.removeAttribute(
                            "aria-busy"
                        );

                        submitButton.innerHTML = `
                            <span>
                                SUBMIT ORGANIZATION
                            </span>

                            <span
                                class="submit-plane"
                                aria-hidden="true">
                                ➤
                            </span>
                        `;

                    }

                }, 350);

            }
        );

    }


    /* =====================================================
       CLEAN UP TEMPORARY IMAGE URL
    ====================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            if (currentPreviewUrl) {

                URL.revokeObjectURL(
                    currentPreviewUrl
                );

            }

        }
    );

});