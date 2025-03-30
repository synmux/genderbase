// Tabs controller
import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["trigger", "content"];

  connect() {
    // Set default tab on load
    if (this.triggerTargets.length > 0) {
      const defaultTab =
        this.triggerTargets.find(
          (el) => el.getAttribute("data-default") === "true",
        ) || this.triggerTargets[0];
      this.select({ currentTarget: defaultTab });
    }
  }

  select(event) {
    const selectedTab = event.currentTarget.getAttribute("data-tab");

    // Update trigger states
    this.triggerTargets.forEach((trigger) => {
      const isActive = trigger.getAttribute("data-tab") === selectedTab;
      trigger.setAttribute("aria-selected", isActive.toString());
      trigger.setAttribute("data-active", isActive.toString());
    });

    // Update content visibility
    this.contentTargets.forEach((content) => {
      const isVisible = content.getAttribute("data-tab") === selectedTab;
      if (isVisible) {
        content.classList.remove("hidden");
      } else {
        content.classList.add("hidden");
      }
    });
  }
}
