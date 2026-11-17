// Live countdown: main wedding celebration / Barat reception, 13 Dec 2026 at 7 PM IST.
const weddingDate = new Date("2026-12-13T19:00:00+05:30");
const pad = n => String(n).padStart(2, "0");
function updateCountdown() {
  let remaining = weddingDate.getTime() - Date.now();
  const message = document.getElementById("timer-message");
  if (remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => document.getElementById(id).textContent = "00");
    message.textContent = "The celebration day is here. Let the festivities begin!";
    return;
  }
  const days = Math.floor(remaining / 86400000); remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
  message.textContent = `${days} days until Lakshmi & Devender's royal celebration.`;
}
updateCountdown();
setInterval(updateCountdown, 1000);


// Explore invitation: move from the welcome cover to the next section below it.
const exploreButton = document.getElementById("exploreBtn");
const countdownSection = document.getElementById("countdown");
if (exploreButton && countdownSection) {
  exploreButton.addEventListener("click", () => {
    countdownSection.classList.remove("invitation-arrival");
    // Restart the entrance animation on every tap.
    void countdownSection.offsetWidth;
    countdownSection.classList.add("invitation-arrival");
    countdownSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Responsive navigation.
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Gallery lightbox.
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
document.querySelectorAll(".gallery-item").forEach(item => item.addEventListener("click", () => {
  lightboxImage.src = item.dataset.src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}));
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}
lightbox.querySelector("button").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });

// Download calendar event for the main wedding evening, 7 PM–9 PM IST.
document.getElementById("calendarBtn").addEventListener("click", () => {
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Lakshmi and Devender//Wedding//EN",
    "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    "UID:lakshmi-devender-20261213@example.com", "DTSTAMP:20261117T000000Z",
    "DTSTART:20261213T133000Z", "DTEND:20261213T153000Z",
    "SUMMARY:Wedding of Lakshmi and Devender",
    "LOCATION:Community Centre, Kanheli Road, Rohtak, Haryana",
    "DESCRIPTION:Reception of Barat at 7 PM followed by dinner at 8 PM. Please see the invitation for the full event schedule.",
    "END:VEVENT", "END:VCALENDAR"
  ];
  const file = new Blob([lines.join("\\r\\n")], {type: "text/calendar;charset=utf-8"});
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url; a.download = "Lakshmi-Devender-Wedding.ics"; a.click();
  URL.revokeObjectURL(url);
});

// General invitation sharing only. No WhatsApp RSVP or attendance confirmation.
async function shareInvitation() {
  const data = {
    title: "Lakshmi & Devender — Royal Wedding Invitation",
    text: "Join us for Lakshmi & Devender's wedding on Sunday, 13 December 2026 at Community Centre, Kanheli Road, Rohtak, Haryana."
  };
  try {
    if (navigator.share) await navigator.share(data);
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(data.title + "\\n" + data.text);
      alert("Invitation details copied. You can now share them with family and friends.");
    } else alert(data.text);
  } catch (error) { /* Share sheet dismissed. */ }
}
document.getElementById("shareBtn").addEventListener("click", shareInvitation);
document.getElementById("shareTop").addEventListener("click", shareInvitation);
