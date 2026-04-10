/*
 * ESP32 + MFRC522 RFID — AttendEase Integration
 * 
 * Scans RFID cards and POSTs the UID to the AttendEase server.
 * Prints all activity to Serial Monitor for debugging.
 *
 * Wiring (SPI):
 *   MFRC522  ->  ESP32
 *   SDA      ->  GPIO 5
 *   SCK      ->  GPIO 18
 *   MOSI     ->  GPIO 23
 *   MISO     ->  GPIO 19
 *   RST      ->  GPIO 22
 *   3.3V     ->  3.3V
 *   GND      ->  GND
 *
 * Libraries needed (install via Arduino Library Manager):
 *   - MFRC522 by GithubCommunity
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>

// ── Configuration — UPDATE THESE ─────────────────────────────────────
#define WIFI_SSID     "YOUR_WIFI_SSID"
#define WIFI_PASS     "YOUR_WIFI_PASSWORD"
#define SERVER_URL    "http://YOUR_PC_IP:3000/api/attendance"

#define SS_PIN   5
#define RST_PIN  22

// Cooldown between scans (milliseconds)
#define SCAN_COOLDOWN 3000

MFRC522 rfid(SS_PIN, RST_PIN);
unsigned long lastScanTime = 0;
String lastUID = "";

void setup() {
  Serial.begin(115200);
  while (!Serial);

  SPI.begin();
  rfid.PCD_Init();

  Serial.println();
  Serial.println("================================");
  Serial.println("  AttendEase — RFID Scanner");
  Serial.println("================================");

  // Verify RFID reader
  byte version = rfid.PCD_ReadRegister(rfid.VersionReg);
  Serial.print("  Reader firmware: 0x");
  Serial.println(version, HEX);

  if (version == 0x00 || version == 0xFF) {
    Serial.println("  [ERROR] RFID reader not detected. Check wiring.");
    while (true) { delay(1000); }
  }

  Serial.println("  Reader OK.");
  Serial.println();

  // Connect to WiFi
  Serial.print("  Connecting to ");
  Serial.print(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASS);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    attempts++;
    if (attempts > 40) {
      Serial.println();
      Serial.println("  [ERROR] WiFi connection timed out.");
      Serial.println("  Running in offline mode (serial output only).");
      Serial.println();
      break;
    }
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.print("  Connected. IP: ");
    Serial.println(WiFi.localIP());
    Serial.print("  Server: ");
    Serial.println(SERVER_URL);
  }

  Serial.println();
  Serial.println("  Ready. Tap a card...");
  Serial.println();
}

void loop() {
  // Reconnect WiFi if dropped
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    delay(5000);
  }

  // Wait for a new card
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    delay(50);
    return;
  }

  // Build UID string (no spaces, uppercase hex)
  String uid = "";
  String uidDisplay = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (rfid.uid.uidByte[i] < 0x10) {
      uid += "0";
      uidDisplay += "0";
    }
    uid += String(rfid.uid.uidByte[i], HEX);
    uidDisplay += String(rfid.uid.uidByte[i], HEX);
    if (i < rfid.uid.size - 1) uidDisplay += " ";
  }
  uid.toUpperCase();
  uidDisplay.toUpperCase();

  // Cooldown — skip if same card scanned too recently
  unsigned long now = millis();
  if (uid == lastUID && (now - lastScanTime) < SCAN_COOLDOWN) {
    delay(200);
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
    return;
  }

  lastUID = uid;
  lastScanTime = now;

  // Print to serial
  Serial.println("--- Card Detected ---");
  Serial.print("  UID:  ");
  Serial.println(uidDisplay);
  Serial.print("  Type: ");
  Serial.println(rfid.PICC_GetTypeName(rfid.PICC_GetType(rfid.uid.sak)));

  // Send to server
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(SERVER_URL);
    http.addHeader("Content-Type", "application/json");
    http.setTimeout(5000);

    String body = "{\"uid\":\"" + uid + "\"}";
    Serial.print("  Sending to server... ");

    int code = http.POST(body);

    if (code > 0) {
      String response = http.getString();
      Serial.print("[");
      Serial.print(code);
      Serial.println("]");

      if (code == 200) {
        Serial.println("  Attendance marked.");
      } else if (code == 404) {
        Serial.println("  Unknown card — not registered.");
      } else if (code == 429) {
        Serial.println("  Already scanned recently.");
      } else {
        Serial.print("  Server: ");
        Serial.println(response);
      }
    } else {
      Serial.print("  [ERROR] HTTP failed: ");
      Serial.println(http.errorToString(code));
    }

    http.end();
  } else {
    Serial.println("  [OFFLINE] WiFi not connected — skipping POST.");
  }

  Serial.println();

  // Halt card
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  delay(1000);
}
