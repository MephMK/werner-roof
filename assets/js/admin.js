document.addEventListener("DOMContentLoaded", () => {
  const loadButton = document.getElementById("admin-load");
  const exportButton = document.getElementById("admin-export");
  const form = document.getElementById("admin-form");
  const status = document.getElementById("admin-status");

  if (!loadButton || !exportButton || !form || !status) return;

  let currentData = null;

  const sources = [
    "assets/data/site-content.json",
    "assets/data/ecosystem.json",
    "assets/data/faq.json",
    "assets/data/testimonials.json"
  ];

  loadButton.addEventListener("click", async () => {
    status.textContent = "Inhalte werden geladen...";
    form.innerHTML = "";

    try {
      const results = await Promise.all(
        sources.map(async (path) => {
          const response = await fetch(path);
          if (!response.ok) {
            throw new Error(`Datei konnte nicht geladen werden: ${path}`);
          }
          return { path, data: await response.json() };
        })
      );

      currentData = Object.fromEntries(results.map((entry) => [entry.path, entry.data]));
      renderEditor(form, currentData);
      status.textContent = "Inhalte erfolgreich geladen.";
    } catch (error) {
      currentData = null;
      status.textContent = "JSON konnte nicht geladen werden. Beim lokalen Öffnen per file:// kann der Browser Zugriffe blockieren.";
      console.error(error);
    }
  });

  exportButton.addEventListener("click", () => {
    if (!currentData) {
      status.textContent = "Bitte zuerst Inhalte laden.";
      return;
    }

    syncFormData(form, currentData);
    const blob = new Blob([JSON.stringify(currentData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dr-joerg-werner-content-export.json";
    link.click();
    URL.revokeObjectURL(url);
    status.textContent = "JSON-Export erstellt.";
  });
});

function renderEditor(form, dataMap) {
  const fields = [
    { label: "Hero Headline", path: ["assets/data/site-content.json", "homepage", "heroHeadline"] },
    { label: "Hero Subheadline", path: ["assets/data/site-content.json", "homepage", "heroSubheadline"] },
    { label: "About-Intro", path: ["assets/data/site-content.json", "about", "intro"] },
    { label: "Legal Services Preview", path: ["assets/data/site-content.json", "homepage", "legalPreview"] },
    { label: "Consulting Services Preview", path: ["assets/data/site-content.json", "homepage", "consultingPreview"] },
    { label: "Advisory Ecosystem Texte", path: ["assets/data/ecosystem.json", "summary"] },
    { label: "International Texte", path: ["assets/data/site-content.json", "international", "intro"] },
    { label: "CTA-Texte", path: ["assets/data/site-content.json", "homepage", "ctaPrimary"] },
    { label: "Testimonials", path: ["assets/data/testimonials.json", "testimonials", 0, "text"] },
    { label: "FAQ", path: ["assets/data/faq.json", "faqs", 0, "antwort"] }
  ];

  const fieldset = document.createElement("fieldset");
  fieldset.className = "admin-fieldset";
  fieldset.innerHTML = "<legend>Bearbeitbare Inhalte</legend>";

  fields.forEach((field, index) => {
    const wrapper = document.createElement("div");
    const inputId = `admin-field-${index}`;
    const value = getValue(dataMap, field.path) ?? "";
    wrapper.innerHTML = `
      <label for="${inputId}">${field.label}</label>
      <textarea id="${inputId}" data-path="${field.path.join("|")}" rows="4">${escapeHtml(String(value))}</textarea>
    `;
    fieldset.appendChild(wrapper);
  });

  form.appendChild(fieldset);
}

function syncFormData(form, dataMap) {
  form.querySelectorAll("[data-path]").forEach((field) => {
    const parts = field.dataset.path.split("|").map((part) => (String(Number(part)) === part ? Number(part) : part));
    setValue(dataMap, parts, field.value);
  });
}

function getValue(root, path) {
  return path.reduce((acc, key) => (acc && key in acc ? acc[key] : undefined), root);
}

function setValue(root, path, value) {
  const lastKey = path[path.length - 1];
  const target = path.slice(0, -1).reduce((acc, key) => acc[key], root);
  target[lastKey] = value;
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
