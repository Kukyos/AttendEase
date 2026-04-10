const fetch = require("node-fetch");

/**
 * Send an attendance confirmation email via FormSubmit.co AJAX endpoint.
 * No API key needed — just the recipient email.
 */
async function sendAttendanceEmail(studentName, studentEmail, registerNumber, timestamp) {
  const recipientEmail = process.env.NOTIFY_EMAIL || studentEmail;

  const time = new Date(timestamp).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `Attendance Marked - ${studentName} (${registerNumber})`,
        Name: studentName,
        "Register Number": registerNumber,
        Email: studentEmail,
        "Marked At": time,
        Status: "Present",
        _template: "table",
      }),
    });

    const data = await res.json();

    if (data.success === "true" || data.success === true) {
      console.log(`  [email] Sent to ${recipientEmail}`);
      return true;
    } else {
      console.log(`  [email] Failed:`, data.message || "Unknown error");
      return false;
    }
  } catch (err) {
    console.log(`  [email] Error: ${err.message}`);
    return false;
  }
}

module.exports = { sendAttendanceEmail };
