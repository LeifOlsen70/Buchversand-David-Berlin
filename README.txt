Buchversand-App – Version 1.11

Alle Dateien dieses ZIP in das bestehende GitHub-Repository hochladen und vorhandene Dateien ersetzen. Die Ordnerstruktur beibehalten.

Änderungen:
- E-Mail-Feld und Hinweise zum E-Mail-Versand entfernt.
- Nach erfolgreichem Speichern erscheint eine Popup-Bestätigung. Mitarbeiter und Administratoren sehen nach dem Schließen direkt die offenen Aufträge.
- Daten werden bei Button-Aktionen, Seitenwechseln, Wisch-Navigation und beim Zurückkehren in die App frisch vom Server abgefragt. Formularwerte bleiben bei Hintergrundabfragen erhalten.
- Neue Liste: Buttons für „Zuerst speichern“, „Ohne Speichern“ und „Abbrechen“, danach abschließende Sicherheitsabfrage vor dem Löschen.
- Versionsanzeige und Dateiversionen auf 1.11 aktualisiert.

Bestehende Firebase-Konfiguration und Regeln bleiben erhalten. Bereits veröffentlichte Regeln müssen für dieses Update nicht geändert werden. Benutzer mit der Rolle „Nur Versandaufträge“ haben weiterhin keinen Zugriff auf die Liste aller Aufträge und landen nach der Bestätigung auf der Startseite. Im Datensatz bleibt replyEmail als leere Zeichenfolge zur Kompatibilität mit den bestehenden Regeln erhalten.

Vor dem Erstellen einer leeren Liste die Sicherungsdatei tatsächlich auf dem Gerät speichern. Konten bleiben erhalten.
