/*
 * ESP32 + MFRC522 RFID — Debug / Test Sketch
 * 
 * Scans RFID cards and prints the UID to Serial Monitor.
 * No WiFi, no HTTP — just raw hardware testing.
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

#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN   5
#define RST_PIN  22

MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(115200);
  while (!Serial);

  SPI.begin();
  rfid.PCD_Init();

  Serial.println();
  Serial.println("================================");
  Serial.println("  RFID Scanner — Debug Mode");
  Serial.println("================================");
  Serial.print("Firmware version: 0x");
  Serial.println(rfid.PCD_ReadRegister(rfid.VersionReg), HEX);
  Serial.println("Ready. Tap a card...");
  Serial.println();
}

void loop() {
  // Wait for a new card
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    delay(50);
    return;
  }

  // Build UID string
  String uid = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (rfid.uid.uidByte[i] < 0x10) uid += "0";
    uid += String(rfid.uid.uidByte[i], HEX);
    if (i < rfid.uid.size - 1) uid += " ";
  }
  uid.toUpperCase();

  // Print card info
  Serial.println("--- Card Detected ---");
  Serial.print("  UID:  ");
  Serial.println(uid);
  Serial.print("  Size: ");
  Serial.print(rfid.uid.size);
  Serial.println(" bytes");
  Serial.print("  Type: ");
  Serial.println(rfid.PICC_GetTypeName(rfid.PICC_GetType(rfid.uid.sak)));
  Serial.println();

  // Halt card
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();

  delay(1000);
}
