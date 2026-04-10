// ── Config ────────────────────────────────────────────────────────────
const API = "";
const REFRESH_INTERVAL = 10_000;

// ── DOM ──────────────────────────────────────────────────────────────
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const panels = {
  attendance: $("#panel-attendance"),
  students: $("#panel-students"),
  stats: $("#panel-stats"),
};

const clock = $("#clock");
const toast = $("#toast");
const tabIndicator = $("#tab-indicator");

// ── Theme Toggle ─────────────────────────────────────────────────────
const themeToggle = $("#theme-toggle");
const root = document.documentElement;

function getTheme() {
  return localStorage.getItem("theme") || "dark";
}

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

// Init theme
setTheme(getTheme());

let faultyRef = null;

function initBackground() {
  if (window.initFaultyTerminal) {
    const isDark = getTheme() === "dark";
    faultyRef = window.initFaultyTerminal(document.getElementById("ambient-bg"), {
      tint: isDark ? "#ffffff" : "#000000",
      brightness: isDark ? 0.3 : 0.05,
      curvature: 0.1,
      glitchAmount: 1,
      mouseReact: true,
      scale: 1.5,
    });
  }
}

// Call on startup
document.addEventListener("DOMContentLoaded", initBackground);

themeToggle.addEventListener("click", () => {
  const next = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  
  if (faultyRef) {
    const isDark = next === "dark";
    faultyRef.setTint(isDark ? "#ffffff" : "#000000");
    faultyRef.setBrightness(isDark ? 0.3 : 0.05);
  }
});

// ── Dev Panel ────────────────────────────────────────────────────────
const devToggle = $("#dev-toggle");
const devPanel = $("#dev-panel");
const devClose = $("#dev-close");

if (devToggle) {
  devToggle.addEventListener("click", () => devPanel.classList.toggle("hidden"));
  devClose.addEventListener("click", () => devPanel.classList.add("hidden"));

  $("#dev-brightness")?.addEventListener("input", (e) => {
    faultyRef?.setBrightness(parseFloat(e.target.value));
  });
  $("#dev-curvature")?.addEventListener("input", (e) => {
    faultyRef?.setCurvature(parseFloat(e.target.value));
  });
  $("#dev-glitch")?.addEventListener("input", (e) => {
    faultyRef?.setGlitchAmount(parseFloat(e.target.value));
  });
  $("#dev-sim-scan")?.addEventListener("click", () => {
    fetch(`${API}/api/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: "A3B2C1D0" })
    }).then(r => r.json()).then(data => {
      showToast(data.error ? data.error : "Test scan recorded", data.error ? "error" : "success");
      if ($(".tab.active").dataset.tab === "attendance") loadAttendance();
      if ($(".tab.active").dataset.tab === "stats") loadStats();
    }).catch(() => showToast("Test scan failed", "error"));
  });
}

// ── Tab Indicator ────────────────────────────────────────────────────
function moveIndicator(tab) {
  const tabs = Array.from($$(".tab"));
  const index = tabs.indexOf(tab);
  if (index < 0) return;

  // Calculate based on actual widths for robustness
  const tabsContainer = $("#tabs");
  const containerRect = tabsContainer.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();

  const offsetLeft = tabRect.left - containerRect.left;

  tabIndicator.style.width = `${tabRect.width}px`;
  tabIndicator.style.transform = `translateX(${offsetLeft - 5}px)`;
}

// Init indicator position
requestAnimationFrame(() => moveIndicator($(".tab.active")));
window.addEventListener("resize", () => moveIndicator($(".tab.active")));

// ── Tab Switching ────────────────────────────────────────────────────
$$(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    $$(".tab").forEach((t) => t.classList.remove("active"));
    Object.values(panels).forEach((p) => p.classList.remove("active"));

    tab.classList.add("active");
    panels[tab.dataset.tab].classList.add("active");
    moveIndicator(tab);

    if (tab.dataset.tab === "attendance") loadAttendance();
    if (tab.dataset.tab === "students") loadStudents();
    if (tab.dataset.tab === "stats") loadStats();
  });
});

// ── Clock ────────────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
setInterval(updateClock, 1000);
updateClock();

// ── Toast ────────────────────────────────────────────────────────────
function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className = "toast show " + type;
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.className = "toast";
  }, 3200);
}

// ── Attendance ───────────────────────────────────────────────────────
const attendanceBody = $("#attendance-body");
const attendanceEmpty = $("#attendance-empty");
const attendanceTable = $("#attendance-table");
const datePicker = $("#attendance-date");

datePicker.value = new Date().toISOString().split("T")[0];
datePicker.addEventListener("change", loadAttendance);

async function loadAttendance() {
  try {
    const date = datePicker.value;
    const url = date
      ? `${API}/api/attendance?date=${date}`
      : `${API}/api/attendance/today`;
    const res = await fetch(url);
    const records = await res.json();

    if (records.length === 0) {
      attendanceTable.style.display = "none";
      attendanceEmpty.classList.add("visible");
      return;
    }

    attendanceTable.style.display = "";
    attendanceEmpty.classList.remove("visible");

    attendanceBody.innerHTML = records
      .map(
        (r) => `
        <tr>
          <td>${esc(r.name)}</td>
          <td>${esc(r.register_number)}</td>
          <td>${formatTime(r.timestamp)}</td>
          <td><span class="status-badge"><span class="status-dot"></span>Present</span></td>
        </tr>`
      )
      .join("");
  } catch {
    showToast("Failed to load attendance", "error");
  }
}

// ── Students ─────────────────────────────────────────────────────────
const studentsBody = $("#students-body");
const studentsEmpty = $("#students-empty");
const studentsTable = $("#students-table");
const addForm = $("#add-student-form");
const formError = $("#form-error");

$("#btn-add-student").addEventListener("click", () => {
  addForm.classList.toggle("hidden");
  if (!addForm.classList.contains("hidden")) {
    setTimeout(() => $("#input-name").focus(), 100);
  }
});

$("#btn-cancel-add").addEventListener("click", () => {
  addForm.classList.add("hidden");
  clearForm();
});

$("#btn-save-student").addEventListener("click", saveStudent);

// Allow Enter key to submit form
["input-name", "input-reg", "input-email", "input-rfid"].forEach((id) => {
  $(`#${id}`).addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveStudent();
  });
});

async function loadStudents() {
  try {
    const res = await fetch(`${API}/api/students`);
    const students = await res.json();

    if (students.length === 0) {
      studentsTable.style.display = "none";
      studentsEmpty.classList.add("visible");
      return;
    }

    studentsTable.style.display = "";
    studentsEmpty.classList.remove("visible");

    studentsBody.innerHTML = students
      .map(
        (s) => `
        <tr>
          <td>${esc(s.name)}</td>
          <td>${esc(s.register_number)}</td>
          <td>${esc(s.email)}</td>
          <td><span class="rfid-code">${esc(s.rfid_uid)}</span></td>
          <td>
            <button class="btn-danger" onclick="deleteStudent(${s.id})" title="Remove">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </td>
        </tr>`
      )
      .join("");
  } catch {
    showToast("Failed to load students", "error");
  }
}

async function saveStudent() {
  const name = $("#input-name").value.trim();
  const register_number = $("#input-reg").value.trim();
  const email = $("#input-email").value.trim();
  const rfid_uid = $("#input-rfid").value.trim();

  if (!name || !register_number || !email || !rfid_uid) {
    showFormError("All fields are required.");
    return;
  }

  try {
    const res = await fetch(`${API}/api/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, register_number, email, rfid_uid }),
    });

    const data = await res.json();
    if (!res.ok) {
      showFormError(data.error || "Failed to add student.");
      return;
    }

    addForm.classList.add("hidden");
    clearForm();
    showToast(`${data.name} added successfully`);
    loadStudents();
  } catch {
    showFormError("Network error. Try again.");
  }
}

async function deleteStudent(id) {
  if (!confirm("Remove this student? Their attendance records will also be deleted.")) return;

  try {
    const res = await fetch(`${API}/api/students/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Student removed");
      loadStudents();
    } else {
      showToast("Failed to remove", "error");
    }
  } catch {
    showToast("Network error", "error");
  }
}

window.deleteStudent = deleteStudent;

function clearForm() {
  $("#input-name").value = "";
  $("#input-reg").value = "";
  $("#input-email").value = "";
  $("#input-rfid").value = "";
  formError.classList.add("hidden");
}

function showFormError(msg) {
  formError.textContent = msg;
  formError.classList.remove("hidden");
}

// ── Stats ────────────────────────────────────────────────────────────
const statsBody = $("#stats-body");
const statsEmpty = $("#stats-empty");
const statsTable = $("#stats-table");

async function loadStats() {
  try {
    const res = await fetch(`${API}/api/stats`);
    const stats = await res.json();

    if (stats.length === 0) {
      statsTable.style.display = "none";
      statsEmpty.classList.add("visible");
      return;
    }

    statsTable.style.display = "";
    statsEmpty.classList.remove("visible");

    statsBody.innerHTML = stats
      .map(
        (s) => `
        <tr>
          <td>${esc(s.name)}</td>
          <td>${esc(s.register_number)}</td>
          <td><span class="stat-count">${s.total_classes}</span></td>
          <td>${s.last_seen ? formatTime(s.last_seen) : '<span style="color:var(--text-muted)">Never</span>'}</td>
        </tr>`
      )
      .join("");
  } catch {
    showToast("Failed to load stats", "error");
  }
}

// ── Helpers ──────────────────────────────────────────────────────────
function esc(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function formatTime(timestamp) {
  const d = new Date(
    timestamp + (timestamp.includes("Z") || timestamp.includes("+") ? "" : "Z")
  );
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "numeric",
    month: "short",
  });
}

// ── Auto-refresh ─────────────────────────────────────────────────────
setInterval(() => {
  const active = $(".tab.active")?.dataset.tab;
  if (active === "attendance") loadAttendance();
}, REFRESH_INTERVAL);

// ── Initial Load ─────────────────────────────────────────────────────
loadAttendance();
loadStudents();
