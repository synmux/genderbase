import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["emailField", "emailContainer", "markdownHelp", "anonymousWarning"];

  connect() {
    // Check initial state on connection
    this.toggleEmail();
  }

  toggleEmail() {
    const checkbox = this.element.querySelector("#anonymous_checkbox");
    if (checkbox.checked) {
      this.emailFieldTarget.value = "";
      this.emailFieldTarget.setAttribute("disabled", "disabled");
      this.emailFieldTarget.classList.add("bg-base-200", "opacity-50");
      this.anonymousWarningTarget.classList.remove("hidden");
    } else {
      this.emailFieldTarget.removeAttribute("disabled");
      this.emailFieldTarget.classList.remove("bg-base-200", "opacity-50");
      this.anonymousWarningTarget.classList.add("hidden");
    }
  }

  toggleMarkdownHelp(event) {
    event.preventDefault();
    this.markdownHelpTarget.classList.toggle("hidden");
  }
}
