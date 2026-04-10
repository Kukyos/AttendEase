require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { stmts } = require("./db");
const { sendAttendanceEmail } = require("./mailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Duplicate scan cooldown (5 minutes)
const COOLDOWN_MS = 5 * 60 * 1000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── API: Students ────────────────────────────────────────────────────

app.get("/api/students", (req, res) => {
  try {
    const students = stmts.getAllStudents.all();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/students", (req, res) => {
  const { name, register_number, email, rfid_uid } = req.body;

  if (!name || !register_number || !email || !rfid_uid) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const result = stmts.addStudent.run({ name, register_number, email, rfid_uid });
    const student = stmts.getStudentById.get(result.lastInsertRowid);
    console.log(`  [+] Student added: ${name} (${register_number})`);
    res.status(201).json(student);
  } catch (err) {
    if (err.message.includes("UNIQUE")) {
      return res.status(409).json({ error: "Register number or RFID UID already exists." });
    }
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/students/:id", (req, res) => {
  try {
    const result = stmts.deleteStudent.run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Student not found." });
    }
    console.log(`  [-] Student deleted: ID ${req.params.id}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── API: Attendance ──────────────────────────────────────────────────

app.post("/api/attendance", async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "RFID UID is required." });
  }

  try {
    const student = stmts.getStudentByRfid.get(uid);
    if (!student) {
      console.log(`  [?] Unknown RFID: ${uid}`);
      return res.status(404).json({ error: "No student found with this RFID." });
    }

    // Check cooldown
    const last = stmts.getLastAttendance.get(student.id);
    if (last) {
      const elapsed = Date.now() - new Date(last.timestamp + "Z").getTime();
      if (elapsed < COOLDOWN_MS) {
        const remaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
        console.log(`  [~] Cooldown active for ${student.name} (${remaining}s left)`);
        return res.status(429).json({
          error: "Duplicate scan — attendance already marked recently.",
          student: student.name,
          retry_after_seconds: remaining,
        });
      }
    }

    stmts.markAttendance.run(student.id);
    console.log(`  [ok] Attendance: ${student.name} (${student.register_number})`);

    // Send email (non-blocking)
    sendAttendanceEmail(student.name, student.email, student.register_number, new Date().toISOString());

    res.json({
      success: true,
      student: student.name,
      register_number: student.register_number,
      message: "Attendance marked successfully.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/attendance/today", (req, res) => {
  try {
    const records = stmts.getTodayAttendance.all();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/attendance", (req, res) => {
  try {
    const { date } = req.query;
    const records = date
      ? stmts.getAttendanceByDate.all(date)
      : stmts.getTodayAttendance.all();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/stats", (req, res) => {
  try {
    const stats = stmts.getAttendanceStats.all();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Serve Frontend ───────────────────────────────────────────────────

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Start ────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n  Attendance System running at http://localhost:${PORT}\n`);
});
