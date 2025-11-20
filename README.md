## 🌐 HubMigrante – Frontend

A modern, responsive Single Page Application built with React 19 + Vite 7 + Tailwind CSS 4, designed to help users simulate visa options, manage personal profiles, and interact with the platform smoothly.

The application communicates with the HubMigrante Backend (Spring Boot + PostgreSQL) using JWT-based authentication.

## ⚙️ Technologies & Tools
React 19 + Vite 7
Styling	Tailwind CSS 4
Routing	React Router DOM 7
Authentication	JWT + Axios Interceptors
API Communication with	Axios (centralized services)
Components & Icons with	Lucide React
Notifications with	React Hot Toast (custom toasts)
React Context (AuthContext)
Testing	Vitest + React Testing Library + jsdom
Version Control	Git + GitHub
Design	Figma
Project Management	Trello

## ✨ Main Features
🔓 Public

Landing page introducing HubMigrante
Register & Login
Guidance to start simulation

🔐 Authentication

Login using JWT
Secure logout
Protected routes

👤 User Profile

Show user information
Edit profile fields
Delete account

🧮 Visa Simulations

Full simulation form
Backend calculates recommended visa:

Study
Work
Digital Nomad
Non-Lucrative

Simulation history stored per user
Delete simulations individually

## 🧭 Project Architecture

The frontend communicates with the backend through centralized services:

src/services/ApiUser.jsx
src/services/UserService.jsx
src/services/SimulationService.jsx

## 🧩 Folder Structure
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
│   │   └── toasts/
│   │        ├── MyToast.jsx
│   │        ├── ConfirmToast.jsx
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
│   │   ├── Login.integration.test.jsx
│   │   ├── SimulationForm.test.jsx
│   │   └── setup.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── vite.config.js
├── package.json
└── README.md

## 🚀 Running the Project
🧱 Requirements

Node.js ≥ 18

npm

HubMigrante Backend running at:
http://localhost:8080

## ▶️ Start the Development Server
# 1. Clone repo
git clone https://github.com/YourUser/HubMigrante-Frontend.git

# 2. Enter directory
cd HubMigrante-Frontend

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev

## Developed by

 **Suraya Mattar** [LinkedIn](https://www.linkedin.com/in/suraya-mattar/) | [GitHub](https://github.com/surayac) |
