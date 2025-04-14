import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["emailDetailsGroup", "emailField"];

  connect() {
    this.toggleAnonymous();
  }

  toggleAnonymous(event) {
    // If called from event, get checked from event.target; otherwise, from DOM
    const checked = event ? event.target.checked : this._findCheckbox().checked;
    if (checked) {
      this.emailFieldTarget.value = "";
      this.emailFieldTarget.disabled = true;
      this.emailFieldTarget.classList.add("bg-base-200");
      this.emailDetailsGroupTarget.classList.add("max-h-0", "opacity-0");
      this.emailDetailsGroupTarget.classList.remove("max-h-[300px]", "opacity-100");
    } else {
      this.emailFieldTarget.disabled = false;
      this.emailFieldTarget.classList.remove("bg-base-200");
      this.emailDetailsGroupTarget.classList.remove("max-h-0", "opacity-0");
      this.emailDetailsGroupTarget.classList.add("max-h-[300px]", "opacity-100");
    }
  }

  _findCheckbox() {
    // Find the checkbox within this.element
    return this.element.querySelector("#question_anonymous");
  }
}
