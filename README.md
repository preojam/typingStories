# ✍️ TypingStories

**TypingStories** ist eine Webapplikation, die es ermöglicht, Geschichten zu lesen, zu schreiben, zu bewerten und abzutippen. 
Sie wurde im Rahmen der Module **M294 (Frontend)** und **M295 (Backend)** entwickelt.

---

## 🚀 Projektübersicht

Ziel dieser Anwendung ist es, einen interaktiven Schreib- und Lesebereich bereitzustellen. Benutzer können:

- Geschichten nach Genres durchsuchen
- Eigene Stories erstellen, bearbeiten und löschen (CRUD)
- Kapitel lesen oder in Typing-Modus abtippen
- Schreibstatistiken (WPM, Accuracy) einsehen
- Geschichten bewerten (Plot, Characters, Style)

---

## 🧰 Technologien

### 🔹 Frontend (React)
- React.js (mit Vite)
- React Router
- HTML/CSS
- Testing Library + Jest

### 🔹 Backend (Spring Boot)
- Java 21
- Spring Web, Spring Data JPA
- MySQL
- Swagger / OpenAPI
- JUnit / Mockito

---

## 🔧 Installation

### Voraussetzungen
- Node.js (≥ 16), npm
- Java JDK 21
- Maven
- MySQL oder Docker
- Git

### Backend starten
```bash
cd TypingStories-backend
./mvnw spring-boot:run
Frontend starten
bash
Code kopieren
cd TypingStories-frontend
npm install
npm run dev
🧪 Tests
Backend

cd TypingStories-backend
./mvnw test
Frontend

cd TypingStories-frontend
npm test
✔️ Alle Unit-Tests befinden sich unter src/components/__test__/ und für das Backend in src/test/java/....

📷 Screenshots & Storyboard
👉 siehe Projektdokumentation (Projektdokumentation.pdf)

📂 Projektstruktur
LB-typingstories
│
├── Projektdokumentation.pdf
├── Front-End/
│   ├── src/
│   ├── public/
│   └── package.json
├── Backend/
│   ├── src/
│   └── pom.xml
└── Ressourcen/
    └── setup.sql (optional)
👥 Mitwirkende / Hilfe
Lehrpersonen (WISS)

Arvin, Thomas, Chris (Mitschüler)

Online-Ressourcen: React Docs, Spring Guides, Stack Overflow, YouTube

📄 Lizenz
MIT License – siehe LICENSE
