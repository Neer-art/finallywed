
/* =========================================
   LAXMI & DEVENDER
   ROYAL WEDDING INVITATION
========================================= */


/* =========================================
   1. WEDDING DETAILS
========================================= */

const wedding = {
    bride: "Laxmi",
    groom: "Devender",
    date: "13 December 2026",
    venue: "Community Centre, Kanheli Road, Rohtak, Haryana"
};


/* =========================================
   2. OPENING COVER PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const coverPage = document.getElementById("coverPage");
    const openButton = document.getElementById("openInvitation");

    const brideElement = document.getElementById("coverBride");
    const groomElement = document.getElementById("coverGroom");

    // Update opening page names

    if (brideElement) {
        brideElement.textContent = wedding.bride;
    }

    if (groomElement) {
        groomElement.textContent = wedding.groom;
    }

    // Open complete invitation

    if (openButton && coverPage) {

        openButton.addEventListener("click", function () {

            // Prevent repeated clicks
            openButton.disabled = true;

            // Remove locked class to reveal website
            document.body.classList.remove("invitation-locked");

            // Hide opening cover
            coverPage.style.display = "none";

            // Return to top of website
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        });

    }


    /* =========================================
       3. LIVE WEDDING COUNTDOWN
    ========================================= */

    // Main wedding celebration: 13 December 2026, 7 PM IST

    const weddingDate = new Date(
        "2026-12-13T19:00:00+05:30"
    );

    const pad = number =>
        String(number).padStart(2, "0");

    function updateCountdown() {

        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");

        const message = document.getElementById("timer-message");

        if (
            !daysElement ||
            !hoursElement ||
            !minutesElement ||
            !secondsElement
        ) {
            return;
        }

        let remaining =
            weddingDate.getTime() - Date.now();

        if (remaining <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            if (message) {
                message.textContent =
                    "The celebration day is here. Let the festivities begin!";
            }

            return;
        }

        const days = Math.floor(
            remaining / 86400000
        );

        remaining %= 86400000;

        const hours = Math.floor(
            remaining / 3600000
        );

        remaining %= 3600000;

        const minutes = Math.floor(
            remaining / 60000
        );

        const seconds = Math.floor(
            (remaining % 60000) / 1000
        );

        daysElement.textContent = days;

        hoursElement.textContent = pad(hours);

        minutesElement.textContent = pad(minutes);

        secondsElement.textContent = pad(seconds);

        if (message) {

            message.textContent =
                `${days} days until ${wedding.bride} & ${wedding.groom}'s royal celebration.`;

        }

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* =========================================
       4. RESPONSIVE MOBILE NAVIGATION
    ========================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", function () {

            const opened =
                nav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(opened)
            );

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", function () {

                nav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================================
       5. GALLERY LIGHTBOX
    ========================================= */

    const lightbox =
        document.getElementById("lightbox");

    if (lightbox) {

        const lightboxImage =
            lightbox.querySelector("img");

        const closeButton =
            lightbox.querySelector("button");

        document.querySelectorAll(".gallery-item")
            .forEach(item => {

                item.addEventListener("click", function () {

                    if (!lightboxImage) return;

                    lightboxImage.src =
                        item.dataset.src;

                    lightbox.classList.add("open");

                    lightbox.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                });

            });


        function closeLightbox() {

            lightbox.classList.remove("open");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            if (lightboxImage) {
                lightboxImage.src = "";
            }

        }


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeLightbox
            );

        }

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeLightbox();
            }

        });

    }


    /* =========================================
       6. DOWNLOAD WEDDING CALENDAR
    ========================================= */

    const calendarButton =
        document.getElementById("calendarBtn");

    if (calendarButton) {

        calendarButton.addEventListener("click", function () {

            const lines = [

                "BEGIN:VCALENDAR",

                "VERSION:2.0",

                "PRODID:-//Laxmi and Devender//Wedding//EN",

                "CALSCALE:GREGORIAN",

                "BEGIN:VEVENT",

                "UID:laxmi-devender-20261213@example.com",

                "DTSTAMP:20261118T000000Z",

                "DTSTART:20261213T133000Z",

                "DTEND:20261213T153000Z",

                "SUMMARY:Wedding of Laxmi and Devender",

                "LOCATION:Community Centre, Kanheli Road, Rohtak, Haryana",

                "DESCRIPTION:Reception of Barat at 7 PM followed by dinner at 8 PM. Please see the invitation for the full event schedule.",

                "END:VEVENT",

                "END:VCALENDAR"

            ];

            const file = new Blob(
                [lines.join("\r\n")],
                {
                    type: "text/calendar;charset=utf-8"
                }
            );

            const url =
                URL.createObjectURL(file);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "Laxmi-Devender-Wedding.ics";

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(url);

        });

    }


    /* =========================================
       7. SHARE WEDDING INVITATION
    ========================================= */

    async function shareInvitation() {

        const data = {

            title:
                "Laxmi & Devender — Royal Wedding Invitation",

            text:
                "Join us for Laxmi & Devender's wedding on Sunday, 13 December 2026 at Community Centre, Kanheli Road, Rohtak, Haryana."

        };

        try {

            if (navigator.share) {

                await navigator.share(data);

            }

            else if (navigator.clipboard) {

                await navigator.clipboard.writeText(
                    data.title + "\n" + data.text
                );

                alert(
                    "Invitation details copied. You can now share them with family and friends."
                );

            }

            else {

                alert(data.text);

            }

        }

        catch (error) {

            // User cancelled the share window.
            console.log("Sharing cancelled or unavailable.");

        }

    }


    const shareButton =
        document.getElementById("shareBtn");

    const shareTop =
        document.getElementById("shareTop");

    if (shareButton) {

        shareButton.addEventListener(
            "click",
            shareInvitation
        );

    }

    if (shareTop) {

        shareTop.addEventListener(
            "click",
            shareInvitation
        );

    }


    /* =========================================
       8. SMOOTH NAVIGATION
    ========================================= */

    document.querySelectorAll('.nav a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", function (event) {

                const targetId =
                    link.getAttribute("href");

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });


    console.log(
        "Laxmi & Devender wedding invitation loaded successfully!"
    );

});
