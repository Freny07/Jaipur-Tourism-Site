# 🏰 Jaipur Tourism Website

<div align="center">

![Jaipur Banner](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Hawa_Mahal_Jaipur.jpg/1200px-Hawa_Mahal_Jaipur.jpg)

**A full-featured tourism web application for the Pink City of India — Jaipur, Rajasthan.**  
Explore iconic attractions, local cuisine, bustling markets, and curated travel packages, all in one platform.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

</div>

---

## 📌 Project Overview

The **Jaipur Tourism Website** is a full-stack tourism platform built as part of the **Web Development Applications (WDA)** course. The project contains two frontend implementations alongside a Java-based backend:

| Layer | Directory | Stack |
|---|---|---|
| Static Frontend | `jaipur-html/` | HTML5 + CSS3 + Vanilla JS + Bootstrap |
| React Frontend | `jaipur-react/` | React.js + Component-based architecture |
| Backend | Java source | Java (Spring Boot / Servlet) |

The platform serves as a one-stop guide for tourists visiting Jaipur — covering religious landmarks, heritage sites, restaurants, cafés, shopping markets, and pre-built day packages.

---

## 🗂️ Repository Structure

```
Jaipur-Tourism-Site/
│
├── jaipur-html/              # Static HTML/CSS/JS implementation
│   ├── index.html            # Landing page with hero carousel
│   ├── attractions.html      # Tourist spots & heritage sites
│   ├── shopping.html         # Local markets & shopping hubs
│   ├── cuisine.html          # Restaurants, cafés & Rajasthani food
│   ├── packages.html         # Tourism day packages
│   ├── css/
│   │   └── style.css         # Global styles, theme, animations
│   └── js/
│       └── main.js           # DOM manipulation & interactivity
│
├── jaipur-react/             # React.js implementation
│   ├── public/
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── App.js            # Root component & routing logic
│       └── index.js          # ReactDOM entry point
│
├── .vscode/                  # Editor configuration
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack & Implementation Details

### 🎨 Frontend — Core Technologies

| Technology | Usage |
|---|---|
| **HTML5** | Semantic page structure, accessibility markup, SEO meta tags |
| **CSS3** | Flexbox/Grid layouts, CSS animations, custom properties, media queries |
| **JavaScript (ES6+)** | DOM manipulation, event handling, dynamic content rendering |
| **React.js** | Component-based UI for Login/Profile system, state management via Hooks |
| **Bootstrap v5** | Responsive grid, hero carousel, navbar toggler, utility classes |

### ☕ Backend — Java

The backend is implemented in **Java**, responsible for server-side logic, data handling, and serving dynamic content to the frontend.

| Technology | Usage |
|---|---|
| **Java** | Core backend language (13.3% of the codebase) |
| **Spring Boot / Java Servlets** | RESTful API endpoints or MVC controller layer |
| **Shell / Batch / PowerShell scripts** | Cross-platform server startup, build, and deployment automation |

#### Backend Responsibilities
- **User Authentication** — Server-side handling of login/signup requests from the React frontend
- **Package & Attraction Data** — Serving structured tourism data (packages, places, restaurants) via API or server-rendered responses
- **Form Handling** — Processing contact/enquiry forms submitted by users
- **Session Management** — Maintaining user login state across requests

#### Run Scripts
The presence of `.sh` (Shell), `.bat` (Batch), and `.ps1` (PowerShell) scripts means the server can be started cross-platform:

```bash
# Linux / macOS
./start.sh

# Windows (Command Prompt)
start.bat

# Windows (PowerShell)
./start.ps1
```

### ⚙️ Design & UI

- **Mandala-inspired theme** — Custom Rajasthani cultural motif integrated into backgrounds and color palette
- **Color Scheme** — Warm saffron, royal pink, and heritage gold tones reflecting Jaipur's cultural identity
- **Responsive Design** — Mobile-first approach using Bootstrap's 12-column grid and CSS media breakpoints
- **Hamburger Navigation** — JavaScript-driven mobile nav toggle for sub-768px viewports

### ⚛️ React Implementation (`jaipur-react/`)

- **Functional components** with React Hooks (`useState`, `useEffect`) for login state and profile management
- Component breakdown:
  - `<Navbar />` — Sticky navigation with active route highlighting
  - `<HeroCarousel />` — Auto-sliding image carousel
  - `<CardGrid />` — Reusable card layout for attractions, food, and shopping
  - `<LoginModal />` — Form-based authentication UI with state management
  - `<PackageCard />` — Displays tourism day package with pricing & itinerary
- **Props-driven architecture** — Components receive data as props for easy content management

---

## ✨ Features

- **Hero Carousel** — Auto-rotating banner showcasing Jaipur's iconic visuals (Hawa Mahal, Amer Fort, City Palace)
- **Attractions Page** — Cards for religious, heritage, and peak tourist sites with descriptions
- **Cuisine Guide** — Curated list of restaurants and cafés serving authentic Rajasthani cuisine
- **Shopping Directory** — Coverage of Jaipur's famous bazaars (Johari Bazaar, Bapu Bazaar, MI Road)
- **Tourism Packages** — Pre-built day trip packages with highlights and estimated durations
- **React Login/Profile System** — User authentication UI with backend-connected state management
- **Interactive Map Integration** — Embedded map for location-based navigation
- **Fully Responsive** — Adapts seamlessly from mobile (320px) to 4K displays
- **Cross-platform Server Scripts** — Shell, Batch, and PowerShell scripts for one-command startup

---

## 🚀 Getting Started

### Prerequisites

- **Java JDK** `v11+` — for running the backend
- **Maven or Gradle** — for building the Java project *(whichever the project uses)*
- **Node.js** `v16+` and `npm` — for the React frontend
- **Git**
- A modern web browser

### Clone the Repository

```bash
git clone https://github.com/Freny07/Jaipur-Tourism-Site.git
cd Jaipur-Tourism-Site
```

### Start the Backend (Java)

```bash
# If using Maven (Spring Boot)
./mvnw spring-boot:run

# If using a startup script
./start.sh        # Linux/macOS
start.bat         # Windows CMD
./start.ps1       # Windows PowerShell

# The backend typically runs on http://localhost:8080
```

### Run the Static HTML Version

No build step required:

```bash
# Option 1: Open directly in browser
open jaipur-html/index.html

# Option 2: VS Code Live Server — right-click index.html → "Open with Live Server"

# Option 3: Python HTTP server
cd jaipur-html
python -m http.server 5500
# Visit http://localhost:5500
```

### Run the React Version

```bash
cd jaipur-react

# Install dependencies
npm install

# Start development server
npm start

# App runs on http://localhost:3000
```

---

## 📄 Pages & Routes

| Page | Static File | Description |
|---|---|---|
| Home | `index.html` | Landing page with hero carousel and overview |
| Attractions | `attractions.html` | Heritage sites, forts, temples, and palaces |
| Cuisine | `cuisine.html` | Rajasthani restaurants, cafés, and street food |
| Shopping | `shopping.html` | Markets, bazaars, and handicraft stores |
| Packages | `packages.html` | Pre-built tourism day packages |
| Login/Profile | React + Java backend | User authentication and profile management |

---

## 🎨 Design System

```css
/* Core Color Palette */
--primary:    #C0392B;   /* Rajasthani Red / Saffron  */
--secondary:  #E67E22;   /* Heritage Gold             */
--accent:     #F8C8D0;   /* Soft Pink (Pink City)     */
--background: #FDF6EC;   /* Warm Cream                */
--text-dark:  #2C3E50;   /* Deep Charcoal             */
```

**Typography** — Decorative serif for headings; clean sans-serif for body text.  
**Motifs** — Mandala SVG patterns used as background overlays and section dividers.

---

## 📊 Codebase Language Breakdown

| Language | Share | Role |
|---|---|---|
| JavaScript | 35.8% | React components & vanilla DOM scripting |
| HTML | 25.8% | Page structure and semantic markup |
| CSS | 19.1% | Styling, theming, animations |
| Java | 13.3% | Backend server-side logic |
| Shell | 3.2% | Linux/macOS startup scripts |
| Batchfile | 1.9% | Windows CMD startup scripts |
| PowerShell | 0.9% | Windows PowerShell startup scripts |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "feat: add your feature description"

# Push to the branch
git push origin feature/your-feature-name

# Open a Pull Request
```

---

<div align="center">
  <sub>Inspired by the rich heritage of Jaipur — The Pink City of India 🌸</sub>
</div>