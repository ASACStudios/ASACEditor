const fileInput = document.getElementById("fileInput");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const textArea = document.getElementById("textArea");
const fileNameEl = document.getElementById("fileName");
const statusEl = document.getElementById("status");
const charCountEl = document.getElementById("charCount");
const dropZone = document.getElementById("dropZone");
const toast = document.getElementById("toast");

let currentFileName = null;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove("show"), 1600);
}

function setStatus(msg) {
  statusEl.textContent = msg;
}

function setFileName(name) {
  fileNameEl.textContent = name || "Keine Datei geladen";
}

function updateControls() {
  const hasText = textArea.value.length > 0;
  const canSave = hasText;
  saveBtn.disabled = !canSave;
  clearBtn.disabled = !hasText;
  copyBtn.disabled = !hasText;

  charCountEl.textContent = `${textArea.value.length} Zeichen`;
}

function isTxtFile(file) {
  const nameOk = (file.name || "").toLowerCase().endsWith(".txt");
  const typeOk = !file.type || file.type === "text/plain";
  return nameOk || typeOk;
}

function readTxtFile(file) {
  if (!isTxtFile(file)) {
    showToast("only editing files");
    setStatus("only supported: .txt");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    textArea.value = reader.result ?? "";
    currentFileName = file.name || "text.txt";
    setFileName(currentFileName);
    setStatus("loaded file");
    updateControls();
    showToast("loaded file");
    textArea.focus();
  };
  reader.onerror = () => {
    showToast("Fehler beim Lesen");
    setStatus("Fehler");
  };

  reader.readAsText(file, "utf-8");
}

function downloadTextFile(text, filename) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

function safeFileName(original) {
  const base = (original && original.trim()) ? original.trim() : "text.txt";
  if (!base.toLowerCase().endsWith(".txt")) return base + ".txt";
  return base;
}

fileInput.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  readTxtFile(file);
  fileInput.value = ""; 
});

["dragenter","dragover"].forEach(evt =>
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add("dropActive");
    setStatus("Datei ablegen…");
  })
);

["dragleave","drop"].forEach(evt =>
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove("dropActive");
  })
);

dropZone.addEventListener("drop", (e) => {
  const file = e.dataTransfer?.files?.[0];
  if (!file) return;
  readTxtFile(file);
});

textArea.addEventListener("input", () => {
  updateControls();
  if (currentFileName) setStatus("unsaved things");
});

saveBtn.addEventListener("click", () => {
  const name = safeFileName(currentFileName || "text.txt");
  downloadTextFile(textArea.value, name);
  setStatus("saved (Download)");
  showToast("saved");
});

clearBtn.addEventListener("click", () => {
  textArea.value = "";
  currentFileName = currentFileName; 
  setStatus("Geleert");
  updateControls();
  showToast("Geleert");
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(textArea.value);
    showToast("Kopiert");
  } catch {
    showToast("Kopieren nicht möglich");
  }
});

window.addEventListener("keydown", (e) => {
  const isSave = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s";
  if (!isSave) return;
  e.preventDefault();
  if (!saveBtn.disabled) saveBtn.click();
});

updateControls();
