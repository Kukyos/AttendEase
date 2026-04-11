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
        Referer: "https://attendease.local",
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

    if (!data.success || data.success === "false") {
      console.warn(`\n  [email] FormSubmit Error: ${data.message || "Unknown error"}`);
      if (data.message && data.message.includes("Activation")) {
        console.log(`  -> ACTION REQUIRED: You must open ${recipientEmail} and click the Activation Link sent by FormSubmit before emails will work!`);
      }
      return false;
    } else {
      console.log(`  [email] Notification successfully sent to ${recipientEmail}`);
      return true;
    }
  } catch (err) {
    console.error(`  [email] Network error details: ${err.message}`);
    return false;
  }
}

module.exports = { sendAttendanceEmail };
