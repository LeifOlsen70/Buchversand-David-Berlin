BUCHVERSAND APP v1 – EINRICHTUNG

1. ZIP entpacken und alle Dateien (inkl. cover.png, Icons, manifest) ins GitHub-Repository hochladen. GitHub Pages unter Settings > Pages aktivieren.
2. Firebase-Projekt erstellen. Authentication > Sign-in method > E-Mail/Passwort aktivieren. Firestore-Datenbank erstellen.
3. Web-App im Firebase-Projekt registrieren; Werte in firebase-config.js eintragen. In Authentication > Settings > Authorized domains die GitHub-Pages-Domain ergänzen.
4. firestore.rules in Firestore > Rules einfügen und veröffentlichen.
5. Mitarbeiter unter Authentication > Users anlegen. Unter Firestore Collection users, Dokument-ID = UID des Mitarbeiters, Feld role = admin oder staff (String) setzen. Nur direkt in der Firebase Console freigeben. Admin-Berechtigung im Frontend ist für Bestand-Korrektur vorgesehen.
6. Nach Login unter Bestand den Anfangsbestand als Zugang erfassen.
7. Für automatische E-Mails ist eine zusätzliche vertrauenswürdige Serverfunktion mit E-Mail-Dienst nötig. In v1 werden Aufträge online in Firestore gespeichert, aber noch KEINE E-Mails versendet. Keinesfalls SMTP-Passwörter im Browsercode speichern.
8. Öffentliche Formulare sind ohne Anmeldung nutzbar. Vor öffentlicher Freigabe sollten App Check / CAPTCHA, Rate Limiting und Datenschutzhinweise eingerichtet werden, damit Dritte keine Spam-Aufträge erzeugen können.
9. Sensible Empfängeradressen nur mit berechtigten Mitarbeitern teilen; Aufbewahrung und Löschung gemäß Datenschutz festlegen.

WICHTIG: Ohne Firebase-Konfiguration ist die App nur eine Layout-Demo. Die App benötigt eine Internetverbindung. Bestandsänderungen sind als Bewegungen dokumentiert, der Bestand ergibt sich aus deren Summe. Das Versand-Buchen erfolgt atomar per Firestore-Transaktion. Der Zugang zum Bestand und zu Adressen ist durch Firestore Rules geschützt.
