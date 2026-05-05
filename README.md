# 🔐 OAuth Multi-Provider Application

A full-stack web application implementing a unified, multi-provider authentication system. This project allows users to log in seamlessly using **Google**, **GitHub**, or **LinkedIn** using the secure OAuth 2.0 protocol.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [1. Configure Credentials](#1-configure-oauth2-credentials)
  - [2. Install Dependencies](#2-install-frontend-dependencies)
- [Running the Application](#-running-the-application)
- [Usage Flow](#-usage-flow)

---

## 📖 Overview

The application features a Spring Boot backend acting as the secure OAuth2 client, securely exchanging authorization codes for access tokens. It connects with a React/Vite frontend designed for a modern, fast, and responsive user experience. Upon successful login from any provider, the user is unified into a single dashboard view.

---

## 🛠 Tech Stack

### Frontend
* **Core:** React 18
* **Build Tool:** Vite
* **Routing:** React Router DOM
* **HTTP Client:** Axios

### Backend
* **Framework:** Java / Spring Boot 3
* **Security:** Spring Security & Spring Security OAuth2 Client
* **Build Tool:** Maven

---

## 📁 Project Structure

```text
OAuth-Multi-Provider/
├── backend/                             # Spring Boot Application
│   ├── pom.xml                          # Maven dependencies
│   └── src/
│       └── main/
│           ├── java/.../                # Java source code & Controllers
│           └── resources/
│               └── application.properties # Backend configurations & Keys
│
├── frontend/                            # React + Vite Application
│   ├── index.html                       
│   ├── package.json                     # Node dependencies
│   ├── vite.config.js                   # Vite configuration
│   └── src/                             # React source code
│       ├── components/                  # Reusable UI components
│       ├── App.jsx                      # Main application layout
│       └── main.jsx                     # React DOM entry point
│
├── run-app.bat                          # One-click startup script for Windows
└── README.md                            
```

---

## Features

* **Multi-Provider Login:** Login options for Google, GitHub, and LinkedIn.
* **Unified Dashboard:** Consolidated view post-login, regardless of the provider used.
* **Secure Token Handling:** Handled securely on the backend; the frontend never exposes client secrets.
* **One-Click Startup:** Bundled `run-app.bat` script to fire up both backend and frontend servers simultaneously for developers.

---

## Prerequisites

Ensure you have the following installed before running the application:

* **Java:** JDK 17+
* **Node.js:** v18+ (comes with `npm`)
* **Maven:** Installed and configured in your system `PATH`.

---

## Getting Started

### 1. Configure OAuth2 Credentials

You need to obtain Client IDs and Client Secrets from the respective developer portals. 

Open `backend/src/main/resources/application.properties` and replace the placeholder values (`YOUR_GOOGLE_CLIENT_ID`, etc.) with your actual credentials.

<details>
<summary><b>Show instructions for obtaining Provider Keys</b></summary>

* **Google**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/).
  2. Create a project and set up the OAuth Consent Screen.
  3. Go to Credentials -> Create Credentials -> OAuth client ID (Web application).
  4. Add Authorized redirect URI: `http://localhost:8080/login/oauth2/code/google`.

* **GitHub**:
  1. Go to [GitHub Developer Settings](https://github.com/settings/developers).
  2. Create a New OAuth App.
  3. Homepage URL: `http://localhost:3000`
  4. Authorization callback URL: `http://localhost:8080/login/oauth2/code/github`.
  
* **LinkedIn**:
  1. Go to the [LinkedIn Developer Portal](https://developer.linkedin.com/).
  2. Create an App. Go to Products and request access to "Sign In with LinkedIn using OpenID Connect".
  3. Under the "Auth" tab, edit Authorized redirect URLs and add: `http://localhost:8080/login/oauth2/code/linkedin`.
</details>

### 2. Install Frontend Dependencies

Navigate to the `frontend` directory and install the necessary Node modules:

```bash
cd frontend
npm install
```

---

## Running the Application

### Option A: The Easy Way (Windows)

Simply double-click the `run-app.bat` file in the root folder. 
This script opens two separate terminal windows, automatically starting both the Spring Boot backend and the Vite frontend for you.

### Option B: Manual Startup

**1. Start the Backend:**
```bash
cd backend
mvn spring-boot:run
```
*(The backend server will run on `http://localhost:8080`)*

**2. Start the Frontend:**
Open a new terminal window:
```bash
cd frontend
npm run dev
```
*(The frontend server will run on `http://localhost:3000`)*

---

## Usage Flow

1. Open your browser and go to `http://localhost:3000`.
2. Click your preferred OAuth provider (Google, GitHub, or LinkedIn).
3. You will be redirected to the provider's secure login/consent screen.
4. Upon authorizing the app, you will be redirected back to the app's unified dashboard.
