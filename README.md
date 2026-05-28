# Dr. Jörg Werner | GitHub-Pages-Website

Dieses Repository enthält eine vollständig statische, GitHub-Pages-kompatible Website für die persönliche Dachmarke „Dr. Jörg Werner“.

## Eigenschaften

- Reines HTML, CSS und Vanilla JavaScript
- Kein Node.js
- Kein npm
- Kein Build-Prozess
- Kein Server erforderlich
- Relative Pfade für GitHub Pages
- Deutsche Inhalte
- Statischer Admin-Prototyp mit JSON-Export

## Projektstruktur

Die Website besteht aus statischen HTML-Seiten, gemeinsamen Assets in `assets/` sowie JSON-Dateien für FAQ, Testimonials und Content-Prototypen.

## GitHub Pages einrichten

1. Neues Repository auf GitHub erstellen.
2. Alle Dateien dieses Projekts in das Repository hochladen.
3. Das Repository auf GitHub öffnen.
4. `Settings` aufrufen.
5. Im Bereich `Pages` GitHub Pages aktivieren.
6. Als Branch `main` auswählen.
7. Als Ordner `/(root)` auswählen.
8. Speichern und den von GitHub angezeigten GitHub-Pages-Link öffnen.

## Wichtige Hinweise

- Es ist kein Build nötig. Die Website kann direkt aus den Dateien ausgeliefert werden.
- Alle Pfade sind relativ angelegt, damit die Seiten auch in Unterverzeichnissen von GitHub Pages funktionieren.
- Externe Links zu den späteren separaten Domains für `Legal Services` und `Consulting Services` sind aktuell bewusst als `#` hinterlegt.
- Diese Platzhalterlinks befinden sich vor allem in:
  - `index.html`
  - `legal-services.html`
  - `consulting-services.html`
- Dort können später die echten Ziel-Domains eingetragen werden.

## Lokale Nutzung

Die Website lässt sich direkt durch Öffnen von `index.html` im Browser ansehen.

Hinweis zum Admin-Prototyp:

- `admin.html` lädt JSON-Dateien per `fetch`.
- In manchen Browsern kann das direkte Öffnen per `file://` das Laden lokaler JSON-Dateien blockieren.
- Auf GitHub Pages funktioniert das Laden über HTTP regulär.
- Falls lokal Ladefehler erscheinen, ist das im README erwartbar und kein Fehler der Seitenstruktur.

## Rechtlicher Hinweis

Mehrere Inhalte, insbesondere `Impressum`, `Datenschutz`, `Disclaimer`, Profil-Platzhalter und Testimonials, sind bewusst als Platzhalter angelegt und müssen vor Veröffentlichung rechtlich sowie inhaltlich geprüft und ergänzt werden.
