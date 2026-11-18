const BEADS_PER_MALA = 108;
const STORAGE_KEY = "naamJapState";

// Add or edit mantras here
const mantras = [
  { id: "sitaram", name: "सीताराम", text: "सीताराम" },
  { id: "hanuman", name: "हनुमान", text: "ॐ हं हनुमते नमः" },
  { id: "ram", name: "श्री राम", text: "श्री राम जय राम जय जय राम" },
  { id: "shiv", name: "शिव", text: "ॐ नमः शिवाय" },
  { id: "ganesh", name: "गणेश", text: "ॐ गं गणपतये नमः" },
  {
    id: "mahamrityunjay",
    name: "महामृत्युंजय",
    text: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्",
  },
  {
    id: "krishna",
    name: "श्री कृष्ण",
    text: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे",
  },
  { id: "gayatri", name: "गायत्री", text: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं" },
];

let state = load();
const $ = (id) => document.getElementById(id);

function load() {
  const fresh = { selectedId: mantras[0].id, counts: {}, vibrate: true };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...fresh, ...saved } : fresh;
  } catch {
    return fresh;
  }
}
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}
const count = () => state.counts[state.selectedId] || 0;

function render() {
  const total = count();
  const mantra = mantras.find((m) => m.id === state.selectedId);
  $("mantraText").textContent = mantra.text;
  $("total").textContent = total;
  $("malas").textContent = Math.floor(total / BEADS_PER_MALA);
  const bead = total % BEADS_PER_MALA;
  $("bead").textContent = bead;
  $("ringFg").style.strokeDashoffset = 289.03 * (1 - bead / BEADS_PER_MALA);
  $("vibBtn").textContent = "Vibrate: " + (state.vibrate ? "On" : "Off");
  $("vibBtn").setAttribute("aria-pressed", state.vibrate);
}

function buzz(pattern) {
  if (state.vibrate && navigator.vibrate) navigator.vibrate(pattern);
}

function tap() {
  state.counts[state.selectedId] = count() + 1;
  buzz(count() % BEADS_PER_MALA === 0 ? [200, 80, 200, 80, 400] : 15);
  save();
  render();
}

$("tapBtn").addEventListener("click", tap);
$("undoBtn").addEventListener("click", () => {
  if (count() > 0) {
    state.counts[state.selectedId] = count() - 1;
    save();
    render();
  }
});
$("resetBtn").addEventListener("click", () => {
  if (confirm("Reset count for this mantra?")) {
    state.counts[state.selectedId] = 0;
    save();
    render();
  }
});
$("vibBtn").addEventListener("click", () => {
  state.vibrate = !state.vibrate;
  save();
  render();
});
$("mantraSelect").addEventListener("change", (e) => {
  state.selectedId = e.target.value;
  save();
  render();
});

mantras.forEach((m) => $("mantraSelect").add(new Option(m.name, m.id)));
$("mantraSelect").value = state.selectedId;

// Keep screen awake while chanting
async function keepAwake() {
  try {
    if ("wakeLock" in navigator) await navigator.wakeLock.request("screen");
  } catch {}
}
keepAwake();
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) keepAwake();
});

render();

if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("sw.js"));