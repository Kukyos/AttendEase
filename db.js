const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "attendance.db"));

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    register_number TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    rfid_uid TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
  );
`);

// ── Prepared Statements ──────────────────────────────────────────────

const stmts = {
  // Students
  getAllStudents: db.prepare("SELECT * FROM students ORDER BY name ASC"),

  getStudentByRfid: db.prepare("SELECT * FROM students WHERE rfid_uid = ?"),

  getStudentById: db.prepare("SELECT * FROM students WHERE id = ?"),

  addStudent: db.prepare(`
    INSERT INTO students (name, register_number, email, rfid_uid)
    VALUES (@name, @register_number, @email, @rfid_uid)
  `),

  deleteStudent: db.prepare("DELETE FROM students WHERE id = ?"),

  // Attendance
  markAttendance: db.prepare(`
    INSERT INTO attendance (student_id) VALUES (?)
  `),

  getLastAttendance: db.prepare(`
    SELECT * FROM attendance
    WHERE student_id = ?
    ORDER BY timestamp DESC
    LIMIT 1
  `),

  getTodayAttendance: db.prepare(`
    SELECT a.id, a.timestamp, s.name, s.register_number, s.email
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    WHERE date(a.timestamp) = date('now')
    ORDER BY a.timestamp DESC
  `),

  getAttendanceByDate: db.prepare(`
    SELECT a.id, a.timestamp, s.name, s.register_number, s.email
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    WHERE date(a.timestamp) = date(?)
    ORDER BY a.timestamp DESC
  `),

  getAttendanceStats: db.prepare(`
    SELECT s.id, s.name, s.register_number,
      COUNT(a.id) as total_classes,
      MAX(a.timestamp) as last_seen
    FROM students s
    LEFT JOIN attendance a ON s.id = a.student_id
    GROUP BY s.id
    ORDER BY s.name ASC
  `),
};

// ── Exports ──────────────────────────────────────────────────────────

module.exports = { db, stmts };
