// Stimulus application
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";

// Initialize Stimulus application
const application = Application.start();

// Register all controllers in the controllers directory
const context = require.context("./controllers", true, /\.js$/);
application.load(definitionsFromContext(context));

// Initialize theme from local storage
document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme") || "light";
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
