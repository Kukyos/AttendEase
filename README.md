# AttendEase

A minimal, local attendance tracking system built for embedded systems coursework. Students scan RFID cards via an ESP32-connected reader, and attendance is recorded in real-time on a self-hosted web dashboard. Each scan triggers an email notification via [FormSubmit](https://formsubmit.co).

## Features

- **Real-time attendance tracking** with live dashboard updates
- **Student management** — add, remove, and view registered students
- **Email notifications** on every scan via FormSubmit (no API key needed)
- **Duplicate scan protection** — ignores re-scans within a 5-minute window
- **Dark / Light mode** with persistent theme preference
- **Attendance stats** — per-student class count and last seen timestamp
- **Date filtering** — view attendance records for any date
- **ESP32 + MFRC522 RFID** integration via simple HTTP POST

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Database | SQLite (better-sqlite3) |
| Frontend | Vanilla HTML, CSS, JS |
| Email | FormSubmit.co |
| Hardware | ESP32 + MFRC522 RFID reader |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18+
- An ESP32 with an MFRC522 RFID module (for hardware integration)

### Installation

```bash
git clone https://github.com/Kukyos/AttendEase.git
cd AttendEase
npm install
```

### Configuration

Copy the environment template and edit as needed:

```bash
cp .env.example .env
```

The `.env` file supports:

```env
# (Optional) Send all attendance emails to one address
# If not set, emails go to each student's registered email
# NOTIFY_EMAIL=professor@university.edu

# Server port (default: 3000)
PORT=3000
```

### Run

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For development with auto-reload:

```bash
npm run dev
```

## API Reference

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `GET` | `/api/students` | — | List all students |
| `POST` | `/api/students` | `{ name, register_number, email, rfid_uid }` | Add a student |
| `DELETE` | `/api/students/:id` | — | Remove a student |
| `POST` | `/api/attendance` | `{ uid }` | Mark attendance (ESP32 hits this) |
| `GET` | `/api/attendance/today` | — | Today's attendance records |
| `GET` | `/api/attendance?date=YYYY-MM-DD` | — | Attendance by date |
| `GET` | `/api/stats` | — | Per-student attendance stats |

## ESP32 Setup

A debug sketch is included at `esp32_reference.ino` for testing your RFID hardware independently (no WiFi required). Once verified, update the sketch with your WiFi credentials and point it to the server:

```
POST http://<YOUR_PC_IP>:3000/api/attendance
Content-Type: application/json

{ "uid": "A3B2C1D0" }
```

### Wiring (SPI)

| MFRC522 | ESP32 |
|---------|-------|
| SDA | GPIO 5 |
| SCK | GPIO 18 |
| MOSI | GPIO 23 |
| MISO | GPIO 19 |
| RST | GPIO 22 |
| 3.3V | 3.3V |
| GND | GND |

## Project Structure

```
AttendEase/
  server.js          # Express server + API routes
  db.js              # SQLite setup + prepared statements
  mailer.js          # FormSubmit email integration
  package.json
  .env.example       # Environment variable template
  .gitignore
  esp32_reference.ino  # RFID debug sketch for ESP32
  public/
    index.html       # Dashboard UI
    style.css        # Dark/light theme styles
    app.js           # Frontend logic
```

## License

MIT
