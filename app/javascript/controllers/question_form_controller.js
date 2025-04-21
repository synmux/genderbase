import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["emailField", "emailContainer", "markdownHelp", "anonymousWarning"];

  connect() {
    // Check initial state on connection
    this.toggleEmail();

    // Initialize transition classes
    this.anonymousWarningTarget.classList.add(
      "transition-all",
      "duration-300",
      "ease-in-out",
      "max-h-0",
      "overflow-hidden",
      "opacity-0",
    );
    if (this.anonymousWarningTarget.classList.contains("hidden")) {
      this.anonymousWarningTarget.classList.remove("hidden");
      this.anonymousWarningTarget.classList.add("max-h-0", "opacity-0", "scale-95");
    }
  }

  toggleEmail() {
    const checkbox = this.element.querySelector("#anonymous_checkbox");

    // Email field animation
    if (checkbox.checked) {
      // Animate to disabled state
      this.emailFieldTarget.value = "";
      this.emailFieldTarget.setAttribute("disabled", "disabled");
      this.emailFieldTarget.classList.add("transition-all", "duration-300");
      this.emailFieldTarget.classList.add("bg-base-200", "opacity-50");

      // Animate warning appearance
      this.anonymousWarningTarget.classList.remove("max-h-0", "opacity-0", "scale-95");
      this.anonymousWarningTarget.classList.add("max-h-96", "opacity-100", "scale-100");
    } else {
      // Animate to enabled state
      this.emailFieldTarget.removeAttribute("disabled");
      this.emailFieldTarget.classList.add("transition-all", "duration-300");
      this.emailFieldTarget.classList.remove("bg-base-200", "opacity-50");

      // Animate warning disappearance
      this.anonymousWarningTarget.classList.remove("max-h-96", "opacity-100", "scale-100");
      this.anonymousWarningTarget.classList.add("max-h-0", "opacity-0", "scale-95");
    }
  }

  toggleMarkdownHelp(event) {
    event.preventDefault();

    if (this.markdownHelpTarget.classList.contains("hidden")) {
      // Prepare for animation
      this.markdownHelpTarget.classList.remove("hidden");
      this.markdownHelpTarget.classList.add(
        "transition-all",
        "duration-300",
        "ease-in-out",
        "max-h-0",
        "opacity-0",
        "overflow-hidden",
      );

      // Force reflow to ensure transition starts
      void this.markdownHelpTarget.offsetHeight;

      // Begin animation
      this.markdownHelpTarget.classList.remove("max-h-0", "opacity-0");
      this.markdownHelpTarget.classList.add("max-h-96", "opacity-100");
    } else {
      // Animate out
      this.markdownHelpTarget.classList.remove("max-h-96", "opacity-100");
      this.markdownHelpTarget.classList.add("max-h-0", "opacity-0");

      // Wait for animation to complete before hiding
      setTimeout(() => {
        this.markdownHelpTarget.classList.add("hidden");
      }, 300);
    }
  }
}
