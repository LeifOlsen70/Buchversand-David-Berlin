Buchversand-App – Version 1.12 (Push vorbereitet, Einrichtung erforderlich)

Die automatischen Mitteilungen funktionieren erst nach den folgenden Einrichtungsschritten. Die vorhandene Buchversand-App bleibt ansonsten benutzbar. Vor dem App-Update die neuen Firestore-Regeln veröffentlichen, sonst können Mitarbeiter keine neuen Aufträge absenden.

1. Firebase-Konsole öffnen: https://console.firebase.google.com/project/buchversand-david-berlin/settings/cloudmessaging
   Unter Webkonfiguration / Web-Push-Zertifikate ein Schlüsselpaar generieren. Benötigt wird NUR der öffentliche Schlüssel. Keine privaten Schlüssel oder Dienstkontodateien auf GitHub hochladen oder weitergeben.

2. Für den automatischen Versand sind Cloud Functions notwendig. Firebase verlangt dafür den Blaze-Tarif mit verknüpftem Abrechnungskonto. Das kann Kosten verursachen; vor einer Umstellung bewusst entscheiden. Es gibt keine Zusage, dass diese Lösung dauerhaft kostenlos bleibt. Ein Budgetalarm begrenzt Kosten nicht automatisch. Dieses Paket stellt keinen Tarif um und veröffentlicht nichts selbst.

3. In der Firebase-Konsole unter Firestore Database > Regeln den Inhalt von firestore.rules einsetzen und veröffentlichen. Die vorhandenen Auftrags-/Bestandsregeln bleiben mit zwei zusätzlichen Bereichen für Admin-Push-Einstellungen/Geräte erhalten. Neue Aufträge tragen das zusätzliche Feld notifyAdmin. Firestore-Regeln nicht nur auf GitHub ablegen!

4. Die Dateien im Hauptverzeichnis dieses ZIP ins bestehende GitHub-Pages-Repository hochladen und ersetzen. Neu sind push.js und firebase-messaging-sw.js. Den Unterordner Firebase_Server_Einrichtung NICHT für die Webseite hochladen; er ist für die serverseitige Einrichtung bestimmt. Bestehende Firebase-Konfiguration bleibt erhalten.

5. Serverfunktion auf einem Computer einrichten: Siehe Firebase_Server_Einrichtung/ANLEITUNG.txt. Ohne diesen Schritt kommen keine automatischen Push-Mitteilungen an. Der Push-Test benötigt ebenfalls die veröffentlichte Funktion.

6. Auf dem iPhone die aktualisierte App über das Home-Bildschirm-Symbol öffnen, als leifolsen@gmx.de anmelden und Mehr > Auftrags-Mitteilungen öffnen. Unter Einrichtung den öffentlichen Web-Push-Schlüssel speichern. Danach Mitteilungen aktivieren und die iPhone-Abfrage erlauben. Dann Testmitteilung senden. Bei verweigerter Berechtigung in den iPhone-Einstellungen die Mitteilungen für diese Web-App erlauben.

7. Praxistest: App in den Hintergrund legen oder schließen, mit einem zweiten angemeldeten Gerät einen neuen Auftrag anlegen. Eine Meldung „Neuer Versandauftrag“ mit der Buchanzahl soll erscheinen. Antippen öffnet die offenen Aufträge; bei abgemeldeter App ist zuerst die Anmeldung nötig. Fokusmodus und die iPhone-Mitteilungseinstellungen können die Anzeige unterdrücken oder verzögern.

Mitteilungen erhalten ausschließlich die Geräte des Administratorkontos, auf denen sie aktiviert wurden. Empfängeradressen werden nicht auf dem Sperrbildschirm angezeigt. Beim Abmelden wird die Push-Anmeldung auf diesem Gerät entfernt. Wiedereinloggen allein aktiviert ausgeschaltete Mitteilungen nicht erneut.

Sicherungen enthalten weiterhin Aufträge und Bewegungen, keine Push-Geräte oder Schlüssel. Beim Laden werden Mitteilungen für importierte Aufträge unterdrückt. Gleichzeitige Zustellwiederholungen werden durch Versandbelege und identische Meldungs-Tags abgefangen; Push ist kein garantiertes Echtzeit-Zustellsystem.

Lokal geprüft: JavaScript-Syntax und simulierte Abläufe für Admin-Empfänger, neue Aufträge, Wiederholungen, Sicherungsimporte, Testberechtigung, Tokenbereinigung, Anmeldung nach Meldungsklick sowie Formular-/Listenverhalten. Firebase-Deployment, Firestore-Regeln im Emulator und echter iPhone-Empfang konnten hier nicht geprüft werden. Vollständige Browserprüfung war mangels installiertem Browser nicht möglich.
