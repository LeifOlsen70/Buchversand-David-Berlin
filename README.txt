Buchversand-App 1.3 – Testversion

1. Alle Dateien in das BESTEHENDE GitHub-Pages-Repository hochladen.
2. FIRESTORE-REGELN: Den Inhalt von firestore.rules separat in Firebase Console > Firestore Database > Regeln einfügen und veröffentlichen. Die Datei auf GitHub allein aktiviert keine Regeln!
3. Administrator: Firebase-Konto leifolsen@gmx.de mit persönlichem Passwort. Dieses Konto hat Adminrechte anhand der E-Mail (nur in diesem Firebase-Projekt).
4. Versandzugang: gemeinsames Passwort des bereits angelegten Firebase-Kontos leif@gtigmbh.de. Kein E-Mail-Eingabefeld erforderlich.
5. Zusätzliche Benutzer: Admin kann im Bereich Mehr neue Firebase-Accounts mit E-Mail und Passwort sowie Rolle erstellen. Benutzer erhalten bei dieser Variante also eine E-Mail + Passwort, nicht nur eine PIN. Die Benutzerkonten werden mit Firebase Auth verwaltet.
6. Sperren entfernt Firestore-Zugriffsrechte, nicht das Firebase-Auth-Konto. Der Admin kann das Passwort eines fremden Kontos nicht direkt ändern; dafür Firebase Console nutzen.
7. Bestandsdaten werden beim Start und beim Neuladen geladen; nach eigenen Änderungen ebenfalls. Keine Echtzeit-Synchronisierung. Bei gleichzeitigem Arbeiten kann die Anzeige bis zum nächsten Refresh veraltet sein.
8. Der E-Mail-Versand ist NICHT eingerichtet. Aufträge werden nur in Firestore gespeichert.
9. Vor echten Empfängeradressen die Regeln und Zugänge testen; GitHub-Pages-Dateien sind öffentlich.
10. Firebase-Projekt bleibt bestehen, Spark-Tarif wird nicht automatisch umgestellt.

Version 1.4: Lagerjournal nach Jahren, Swipe-Navigation, Mitarbeitername statt E-Mail. Die Benutzer verwenden technisch weiterhin Firebase Authentication mit automatisch erzeugter interner Login-Adresse. Vor Freigabe Firestore-Regeln und Login testen.
