// Smooth scroll for buttons with data-scroll-target
document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-scroll-target]");
  if (!target) return;

  const selector = target.getAttribute("data-scroll-target");
  const section = document.querySelector(selector);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Simple email signup handling (front-end only)
const form = document.getElementById("email-form");
const emailInput = document.getElementById("email-input");
const messageEl = document.getElementById("signup-message");
const submitButton = document.getElementById("email-submit-button");
const buttonText = document.getElementById("email-button-text");

// naive in-memory "list" just so double-submits are handled in-session
const savedEmails = new Set();

function setMessage(text, type) {
  messageEl.textContent = text || "";
  messageEl.classList.remove("success", "error");
  if (type) {
    messageEl.classList.add(type);
  }
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = (emailInput.value || "").trim();

    // basic email check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setMessage("Please enter a valid email address.", "error");
      emailInput.focus();
      return;
    }

    if (savedEmails.has(email.toLowerCase())) {
      setMessage(
        "You’re already on the list. We’ll keep you updated, in shaa Allah.",
        "success"
      );
      emailInput.value = "";
      return;
    }

    // Simulate async submission
    submitButton.disabled = true;
    buttonText.textContent = "Joining...";

    setTimeout(() => {
      savedEmails.add(email.toLowerCase());
      setMessage(
        "Thank you! You’re on the waitlist. We’ll be in touch closer to launch.",
        "success"
      );
      emailInput.value = "";
      submitButton.disabled = false;
      buttonText.textContent = "Join the waitlist";
    }, 700);
  });
}