const drawer = document.getElementById("drawer");
const menuButton = document.getElementById("menu-button");
const body = document.body;

function setDrawer(open) {
  if (!drawer || !menuButton) return;
  drawer.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
  body.classList.toggle("no-scroll", open);
  if (open) {
    drawer.querySelector("a")?.focus();
  } else {
    menuButton.focus();
  }
}

menuButton?.addEventListener("click", () => setDrawer(drawer.hidden));
document.getElementById("drawer-close")?.addEventListener("click", () => setDrawer(false));
drawer?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setDrawer(false));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && drawer && !drawer.hidden) setDrawer(false);
});

document.getElementById("info-button")?.addEventListener("click", () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

const composer = document.getElementById("composer");
const message = document.getElementById("message");
composer?.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = message?.value.trim() ?? "";
  const base = "https://github.com/Tarikdxd/Tarikdxd/issues/new";
  const url = text
    ? `${base}?title=${encodeURIComponent("Site mesajı")}&body=${encodeURIComponent(text)}`
    : "https://github.com/Tarikdxd";
  window.open(url, "_blank", "noopener");
});

const sections = ["about", "projects", "contributions", "stack", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const railItems = [...document.querySelectorAll(".rail-item[data-section]")];

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        railItems.forEach((item) => {
          item.classList.toggle("active", item.dataset.section === entry.target.id);
        });
      }
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
  );
  sections.forEach((section) => observer.observe(section));
}

const splash = document.getElementById("splash");
if (splash) {
  splash.addEventListener(
    "animationend",
    (event) => {
      if (event.target === splash) splash.remove();
    },
    { once: true },
  );
  setTimeout(() => splash.remove(), 2600);
}
