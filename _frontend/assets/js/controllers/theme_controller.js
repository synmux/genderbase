// Theme controller
import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["toggle"];

  connect() {
    const theme = localStorage.getItem("theme") || "light";
    this.updateTheme(theme);
  }

  toggle() {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.updateTheme(newTheme);
  }

  updateTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }
}
