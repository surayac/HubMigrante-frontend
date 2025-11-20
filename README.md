# HUBMigrante – Frontend

**HubMigrante** is a fully interactive web platform that transforms the complexity of immigration planning into a simple, guided experience.
Built with **React 19, Vite 7, and Tailwind CSS 4**, it helps users understand which visa best fits their situation through a dynamic simulation system — eliminating uncertainty and reducing the overwhelming amount of manual research.

Powered by a secure **Spring Boot + PostgreSQL** backend with **JWT authentication**, HubMigrante delivers a fast, trustworthy, and smooth journey for anyone preparing to relocate.

<img width="350" height="200" alt="Captura de pantalla 2025-11-20 191512" src="https://github.com/user-attachments/assets/9832df06-98df-4546-bb74-2431598fb2f8" />
<img width="350" height="200" alt="Captura de pantalla 2025-11-20 191536" src="https://github.com/user-attachments/assets/0f9a712e-4f45-485d-9484-8472c4bdb691" />

---


## ⚙️ Technologies & Tools

| Category | Technologies |
|------------|-------------|
| **Framework** | React 19 + Vite 7 |
| **Styling** | Tailwind CSS 4 + PostCSS + Autoprefixer |
| **Routing** | React Router DOM 7 |
| **Authentication** | JWT + Axios Interceptors |
| **API Communication** |  Axios + JWT Auth |
| **Components & Icons** | Lucide React |
| **Notifications** | React Hot Toast |
| **Testing** | Vitest + Testing Library (React / Jest-DOM / jsdom) |
| **Design** | Figma |
| **Version Control** | Git + GitHub |
| **Project Management** | Trello |

### 🧩 Desglose técnico

**Frontend Core:** SPA built with **React 19 and Vite 7**

**Styling:** Build with Tailwind CSS 4 con PostCSS with a fully responsive layout and modular components.  

**Routing:** React Router DOM 7 with public and protected routes.

**Simulation System:** Simulation form with validation; visa recommendation logic handled by backend and simulations saved per user and listed in Profile.   

**UI & UX:** Lucide React / React Icons / React Hot Toast.  

**Testing:** Vitest + Testing Library.  

---

## 🧭 Project Architecture

The frontend communicates with the backend through centralized services:
```bash
src/services/ApiUser.jsx
src/services/UserService.jsx
src/services/SimulationService.jsx
```

## 🧩 Folder Structure

```bash
HUBMIGRANTE-FRONTEND
├── public/
│   └── index.html
├── src/
│   ├── application/
│   │   ├── AppRouter.jsx
│   │   └── PrivateRoute.jsx
│   ├── assets/
│   ├── components/
│   │   ├── ProfileHeader.jsx
│   │   ├── SimulationList.jsx
│   │   ├── SimulationForm.jsx
│   │   ├── EditProfileForm.jsx
│   │   ├── ResultModal.jsx
│   │   ├── toasts/
│   │   │   ├── MyToast.jsx
│   │   │   └── ConfirmToast.jsx
│   │   ├── sections/
│   │   │   └── Hero.jsx
│   │   └── buttons/
│   │       └── DeleteAccountButton.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   └── CreateSimulation.jsx
│   ├── services/
│   │   ├── ApiUser.jsx
│   │   ├── UserService.jsx
│   │   └── SimulationService.jsx
│   ├── tests/
│   │   ├── Login.test.jsx
│   │   ├── SimulationForm.test.jsx
│   │   └── setup.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── vite.config.js
├── package.json
└── README.md

```
---

## 🚀 Running the Project

### 🧱 Requirementss
- Node.js ≥ 18  
- npm instalado  
- HubMigrante Backend running at: http://localhost:8080

### ▶️ Start the Development Server
```bash
# 1. Clone repo
git clone https://github.com/YourUser/HubMigrante-Frontend.git

# 2. Enter directory
cd HubMigrante-Frontend

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev

```

## 👩‍💻 Contact me

**Suraya Mattar** | [LinkedIn](https://www.linkedin.com/in/suraya-mattar/) | [GitHub](https://github.com/surayac) |

