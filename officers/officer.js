"use strict";

/* =========================================================
   UGB OFFICER / POSITION ASSIGNMENT FORM
   FORM #4
   Frontend behavior only

   IMPORTANT:
   - Does NOT create a member record.
   - Does NOT verify a UGB ID against a database yet.
   - Does NOT upload or store documents yet.
   - Does NOT create an official officer assignment yet.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const officerForm =
        document.getElementById("officerAssignmentForm");

    const submitButton =
        document.getElementById("officerSubmitButton");

    const appointmentDocument =
        document.getElementById("appointmentDocument");

    const appointmentFileStatus =
        document.getElementById("appointmentFileStatus");

    const effectiveDate =
        document.getElementById("effectiveDate");

    const termEndDate =
        document.getElementById("termEndDate");


    /* =====================================================
       SUPPORTING APPOINTMENT DOCUMENT
    ====================================================== */

    if (
        appointmentDocument &&
        appointmentFileStatus
    ) {

        appointmentDocument.addEventListener(
            "change",
            () => {

                const file =
                    appointmentDocument.files?.[0];


                /* -----------------------------------------
                   NO FILE
                ----------------------------------------- */

                if (!file) {

                    resetAppointmentFileStatus();

                    return;
                }


                /* -----------------------------------------
                   ALLOWED FILE TYPES
                ----------------------------------------- */

                const allowedTypes = [
                    "application/pdf",
                    "image/jpeg",
                    "image/png",
                    "image/webp"
                ];


                if (!allowedTypes.includes(file.type)) {

                    alert(
                        "Please select a PDF, JPG/JPEG, PNG, or WEBP file."
                    );

                    appointmentDocument.value = "";

                    resetAppointmentFileStatus();

                    return;
                }


                /* -----------------------------------------
      DISPLAY SELECTED FILE / IMAGE PREVIEW
   ----------------------------------------- */

                const fileSize =
                    formatFileSize(file.size);

                const isImage =
                    file.type.startsWith("image/");


                if (isImage) {

                    const imageUrl =
                        URL.createObjectURL(file);

                    appointmentFileStatus.innerHTML = `
        <img
            src="${imageUrl}"
            alt="Supporting appointment record preview"
            class="appointment-image-preview">

        <strong>
            Image Selected
        </strong>

        <small>
            ${escapeHtml(file.name)}
        </small>

        <small>
            ${fileSize}
        </small>
    `;

                } else {

                    appointmentFileStatus.innerHTML = `
        <span
            class="appointment-file-icon"
            aria-hidden="true">
            PDF
        </span>

        <strong>
            PDF Selected
        </strong>

        <small>
            ${escapeHtml(file.name)}
        </small>

        <small>
            ${fileSize}
        </small>
    `;

                }
            }
        );

    }


    /* =====================================================
       RESET DOCUMENT DISPLAY
    ====================================================== */

    function resetAppointmentFileStatus() {

        if (!appointmentFileStatus) {
            return;
        }

        appointmentFileStatus.innerHTML = `
            <span
                class="appointment-file-icon"
                aria-hidden="true">
                ▤
            </span>

            <small>
                No supporting record selected
            </small>
        `;

    }


    /* =====================================================
       FILE SIZE FORMATTER
    ====================================================== */

    function formatFileSize(bytes) {

        if (!Number.isFinite(bytes) || bytes <= 0) {
            return "0 KB";
        }

        const kilobytes =
            bytes / 1024;

        if (kilobytes < 1024) {

            return `${kilobytes.toFixed(1)} KB`;

        }

        const megabytes =
            kilobytes / 1024;

        return `${megabytes.toFixed(2)} MB`;

    }


    /* =====================================================
       TERM DATE CHECK
    ====================================================== */

    function validateAssignmentDates() {

        if (
            !effectiveDate ||
            !termEndDate
        ) {
            return true;
        }


        /* No end date is allowed */

        if (!termEndDate.value) {

            termEndDate.setCustomValidity("");

            return true;

        }


        if (!effectiveDate.value) {

            termEndDate.setCustomValidity("");

            return true;

        }


        const start =
            new Date(
                `${effectiveDate.value}T00:00:00`
            );

        const end =
            new Date(
                `${termEndDate.value}T00:00:00`
            );


        if (end < start) {

            termEndDate.setCustomValidity(
                "The term end date cannot be earlier than the effective date."
            );

            return false;

        }


        termEndDate.setCustomValidity("");

        return true;

    }


    /* =====================================================
       RECHECK DATES WHEN USER CHANGES THEM
    ====================================================== */

    if (effectiveDate) {

        effectiveDate.addEventListener(
            "change",
            () => {

                validateAssignmentDates();

            }
        );

    }


    if (termEndDate) {

        termEndDate.addEventListener(
            "change",
            () => {

                validateAssignmentDates();

            }
        );

    }


    /* =====================================================
       FORM SUBMISSION
       FRONTEND-ONLY FOR NOW
    ====================================================== */

    if (officerForm) {

        officerForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                /* -----------------------------------------
                   DATE VALIDATION
                ----------------------------------------- */

                validateAssignmentDates();


                /* -----------------------------------------
                   HTML VALIDATION
                ----------------------------------------- */

                if (!officerForm.checkValidity()) {

                    officerForm.reportValidity();

                    return;
                }


                /* -----------------------------------------
                   TEMPORARILY LOCK BUTTON
                ----------------------------------------- */

                setSubmittingState(true);


                /* -----------------------------------------
                   FRONTEND-ONLY NOTICE
                ----------------------------------------- */

                window.setTimeout(
                    () => {

                        alert(
                            "Officer / Position Assignment information is complete and ready for submission.\n\n" +
                            "This form is currently in frontend preparation mode. " +
                            "No officer assignment, member record, or supporting document has been stored or transmitted yet."
                        );


                        setSubmittingState(false);

                    },
                    350
                );

            }
        );

    }


    /* =====================================================
       SUBMIT BUTTON STATE
    ====================================================== */

    function setSubmittingState(isSubmitting) {

        if (!submitButton) {
            return;
        }


        if (isSubmitting) {

            submitButton.disabled = true;

            submitButton.setAttribute(
                "aria-busy",
                "true"
            );

            submitButton.innerHTML = `
                <span>
                    CHECKING ASSIGNMENT...
                </span>
            `;

            return;

        }


        submitButton.disabled = false;

        submitButton.removeAttribute(
            "aria-busy"
        );

        submitButton.innerHTML = `
            <span>
                SUBMIT ASSIGNMENT
            </span>

            <span
                class="submit-plane"
                aria-hidden="true">
                ➤
            </span>
        `;

    }


    /* =====================================================
       SAFE TEXT FOR FILE NAME DISPLAY
    ====================================================== */

    function escapeHtml(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

});