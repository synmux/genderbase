// Form controller
import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["submit", "form", "successMessage"];

  connect() {
    // Initialize form handling
    this.element.addEventListener("submit", this.submit.bind(this));
  }

  disconnect() {
    this.element.removeEventListener("submit", this.submit.bind(this));
  }

  submit(event) {
    event.preventDefault();

    // Validate form fields
    if (!this.validateForm()) {
      return;
    }

    // Get form data
    const form = this.element;
    const formData = new FormData(form);

    // Show loading state
    const submitButton = this.hasSubmitTarget
      ? this.submitTarget
      : form.querySelector('[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    // In a real app, we would send this to the server
    // For demonstration, we'll fake a server response
    setTimeout(() => {
      this.showSuccessMessage(form);
    }, 1000);
  }

  validateForm() {
    // Basic validation
    const form = this.element;
    const requiredFields = form.querySelectorAll("[required]");

    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        this.showError(field, "This field is required");
      } else {
        this.clearError(field);
      }
    });

    return isValid;
  }

  showError(field, message) {
    // Remove any existing error message
    this.clearError(field);

    // Add error class to field
    field.classList.add("border-red-500");

    // Create error message
    const errorMessage = document.createElement("p");
    errorMessage.className = "text-red-500 text-xs mt-1";
    errorMessage.textContent = message;
    errorMessage.dataset.errorMessage = true;

    // Insert error message after field
    field.parentNode.appendChild(errorMessage);
  }

  clearError(field) {
    // Remove error class
    field.classList.remove("border-red-500");

    // Remove error message
    const container = field.parentNode;
    const errorMessage = container.querySelector("[data-error-message]");

    if (errorMessage) {
      container.removeChild(errorMessage);
    }
  }

  showSuccessMessage(form) {
    // Replace form with success message
    form.innerHTML = `
      <div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h3 class="text-lg font-semibold">Thank you for your question!</h3>
        <p class="mt-2 text-sm text-muted-foreground">
          Our volunteers will review your question and provide a thoughtful response.
          Questions are typically answered within 1-3 days.
        </p>
        <div class="mt-4">
          <a href="/" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Return to Home
          </a>
        </div>
      </div>
    `;
  }
}
