document.addEventListener("DOMContentLoaded", () => {
  const homeScreen = document.getElementById("homeScreen");
  const formContainer = document.getElementById("formContainer");
  const form = document.getElementById("surveyForm");
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const progress = document.querySelector(".progress");
  const startBtn = document.getElementById("startBtn");

  let currentStep = 0;

  // Hide form initially
  formContainer.style.display = "none";
  steps.forEach(s => s.style.display = "none");
  if (progress) progress.style.width = "0%";

  function showStep(n) {
    steps.forEach((step, i) => step.style.display = i === n ? "block" : "none");

    if (progress) {
      const pct = steps.length > 1 ? (n / (steps.length - 1)) * 100 : 100;
      progress.style.width = `${pct}%`;
    }

    if (steps[n].id === "final-step") buildReview();
  }

  function validateStep(n) {
    const step = steps[n];
    let valid = true;

    const inputs = step.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
      const isOptional = input.id === "website" || input.id === "social" || input.id === "adspend" || input.id === "notes";
      let errorEl = input.parentElement.querySelector(".error");

      if (!errorEl) {
        errorEl = document.createElement("p");
        errorEl.className = "error";
        errorEl.style.color = "red";
        errorEl.style.marginTop = "0.3rem";
        input.parentElement.appendChild(errorEl);
      }

      let msg = "";
      const val = (input.value || "").trim();

      if (!isOptional && input.required && val === "") msg = "This field is required!";

      if (!msg && val) {
        if (input.type === "tel" && !/^[0-9]{10}$/.test(val)) msg = "Enter a valid 10-digit number!";
        if (input.type === "url" && !/^https?:\/\/\S+$/.test(val)) msg = "Enter a valid URL!";
      }

      errorEl.textContent = msg;
      if (msg) valid = false;
    });

    return valid;
  }

  function getLabel(input) {
    const container = input.closest(".form-step");
    const h2 = container.querySelectorAll("h2")[1] || container.querySelector("h2");
    return h2 ? h2.textContent.replace(":", "").trim() : input.id;
  }

  function buildReview() {
    const reviewBox = document.getElementById("review");

    reviewBox.innerHTML = `
      <h3>Your Answers</h3>
      ${Array.from(form.querySelectorAll("input, select, textarea"))
        .filter(input => input.id) 
        .map(input => {
          return `<p><strong>${getLabel(input)}:</strong> ${input.value || "-"}</p>`;
        })
        .join("")}
    `;
  }

  // Start button
  startBtn.addEventListener("click", () => {
    homeScreen.style.display = "none";
    formContainer.style.display = "block";
    currentStep = 0;
    showStep(currentStep);
  });

  // Navigation
  formContainer.addEventListener("click", e => {
    const el = e.target;
    if (el.classList.contains("next-btn")) {
      if (validateStep(currentStep) && currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    }
    if (el.classList.contains("prev-btn") && currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});


// Global callback for JSONP
function myCallback(response) {
  const form = document.getElementById("surveyForm");
  const submitBtn = form.querySelector(".submit-btn");
  submitBtn.disabled = false;
  submitBtn.textContent = "Submit";

  if (response.result === "success") {
    form.innerHTML = `
      <div class="thank-you" style="text-align:center; padding:2rem;">
        <h2>🎉 Thank you!</h2>
        <p>Your response has been recorded.</p>
      </div>
    `;
  } else {
    const errorBox = document.createElement("p");
    errorBox.className = "error-global";
    errorBox.style.textAlign = "center";
    errorBox.style.color = "red";
    errorBox.textContent = response.message || "Submission failed. Please try again.";
    form.appendChild(errorBox);
  }
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyiqCzTcCyDpPjDnX-4z0UAV5j6zFyOppOs99je2qOKDCd-RvMvISMD0PvDv43_0OYY/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("surveyForm");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const submitBtn = form.querySelector(".submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const data = {};
    form.querySelectorAll("input, select, textarea").forEach(input => {
      if (input.id) data[input.id] = input.value;
    });

    const params = new URLSearchParams({ ...data, callback: "myCallback" });
    const script = document.createElement("script");
    script.src = `${SCRIPT_URL}?${params.toString()}`;
    document.body.appendChild(script);

    script.onload = () => document.body.removeChild(script);
  });
});