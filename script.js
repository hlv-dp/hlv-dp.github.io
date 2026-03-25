const toggleButton = document.getElementById("theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);

  if (toggleButton) {
    toggleButton.setAttribute("aria-pressed", String(isDark));
  }
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return systemTheme.matches ? "dark" : "light";
}

applyTheme(getInitialTheme());

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

systemTheme.addEventListener("change", (event) => {
  const savedTheme = localStorage.getItem("theme");

  if (!savedTheme) {
    applyTheme(event.matches ? "dark" : "light");
  }
});
