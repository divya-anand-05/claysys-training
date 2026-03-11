# Quiz Application - Full Stack

A comprehensive full-stack quiz application built with **Angular** (Frontend) and **ASP.NET Core** (Backend) with JWT authentication, real-time scoring, and an admin dashboard.

##  Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Usage Guide](#usage-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Overview

**Quiz Application** is a full-featured learning platform built using **Angular (Frontend)** and **ASP.NET Core Web API (Backend)**.

### Key Highlights
- Users can take quizzes across multiple courses
- View quiz results after completion
- Compete with other users through the **Leaderboard**
- Admins can manage questions, view leaderboard data, and edit user results
- **Dark Mode support** for better user experience
- **JWT Authentication** secures all protected API endpoints

### Live Demo
https://claysys-training.onrender.com/

##  Features

###  User Features
-  User Registration & Login with **JWT Authentication**
-  Multiple Quiz Courses (HTML, CSS, JavaScript, React, Angular, Vue.js, C#, Java, Python, SQL, MySQL, MongoDB)
-  Real-time Quiz with **15-second timer** per question
-  Instant Feedback (Correct / Incorrect answers)
-  Automatic **Score Calculation & Result Display**
-  View **Personal Quiz History**
-  **Leaderboard** with Rankings
-  **Dark Mode / Light Mode Toggle**
-  **Mobile Responsive Design**

---

###  Admin Features
-  **Admin Dashboard** with Statistics
-  Manage Questions (**Create, Read, Update, Delete**)
-  View **Full Leaderboard**
-  **Edit User Scores**
-  **Delete Quiz Results**
-  **Filter Results by Course**
-  **Search Users by Name**
-  **Admin Role Verification**

---

###  UI/UX Features
-  **Modern Gradient Background Design**
-  Smooth **Animations & Transitions**
-  **Progress Bars** for Quiz Completion
-  **Responsive Tables** with Mobile Support
-  **Accessibility-Friendly Interface**

##  Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|--------|---------|
| Angular | 17+ | Framework |
| TypeScript | Latest | Language |
| RxJS | 7+ | Reactive Programming |
| Angular Material | Latest | UI Components |
| TailwindCSS | 3+ | Styling |
| FontAwesome | 6+ | Icons |

---

### Backend

| Technology | Version | Purpose |
|------------|--------|---------|
| ASP.NET Core | 8.0+ | Framework |
| C# | 12+ | Language |
| Entity Framework Core | 8.0+ | ORM |
| JWT Authentication | Standard | Authentication |
| Swagger/OpenAPI | 6+ | API Documentation |

---

### Database

| Technology | Version | Purpose |
|------------|--------|---------|
| SQL server | 2019+ | Database|
| PostgreSQL | 14+ | Database |
| Render PostgreSQL | Cloud | Database Hosting |

### Tools & Deployment

| Tool | Purpose |
|-----|--------|
| Render.com | Cloud Hosting |
| GitHub | Version Control |
| Git | Version Control System |


##  Installation & Setup

### Prerequisites

Make sure the following tools are installed on your system:

- **Node.js 18+** (for Angular frontend)
- **.NET SDK 8.0+** (for ASP.NET Core backend)
- **SQL Server 2019+** or **SQL Server Express**
- **Git** for version control
- **Angular CLI 17+**

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Quiz-App-ASP.git
cd Quiz-App-ASP
```

---

## Step 2: Backend Setup (ASP.NET Core)

### 2.1 Install Dependencies

Run the following command in the project root:

```bash
dotnet restore
```

---

### 2.2 Configure Database

Open **appsettings.json** and update the connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=QuizAppDb;Trusted_Connection=true;TrustServerCertificate=true;"
  },
  "Jwt": {
    "Key": "your-secret-key-min-32-characters-long",
    "Issuer": "QuizApp",
    "Audience": "QuizAppUsers"
  }
}
```

Replace **YOUR_SERVER** with your SQL Server instance.

---

### 2.3 Apply Database Migrations

Run the following command to create the database and tables:

using **Package Manager Console**:

```powershell
Update-Database
```

---

### 2.4 Verify Database Creation

Open **SQL Server Management Studio** and check for the database **QuizAppDb**.

It should contain the following tables:

- Users  
- Questions  
- Results  

---

## Step 3: Frontend Setup (Angular)

### 3.1 Navigate to Angular Project

```bash
cd Angular-Quiz-App
```

---

### 3.2 Install Dependencies

```bash
npm install
```

---

### 3.3 Configure Environment

Edit **src/environments/environment.ts**

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7210/api'
};
```

Edit **src/environments/environment.production.ts**

```typescript
export const environment = {
  production: true,
  apiUrl: '/api'
};
```

The `apiUrl` should point to your ASP.NET Core backend API.

##  Running the Application

### Option 1: Development Mode (Separate Servers)

Run backend and frontend separately during development.

#### Backend (Terminal 1)

```powershell
# In project root
dotnet run
```

The backend API will run at:

```
https://localhost:7210
```

---

#### Frontend (Terminal 2)

```bash
# In Angular project directory
ng serve
```

The Angular application will run at:

```
http://localhost:4200
```

---

### Option 2: Production Mode (Combined)

In production, the Angular build is served by the ASP.NET Core backend.

#### Step 1: Build Angular App

```bash
cd Angular-Quiz-App
ng build --configuration production
```

The build output will be generated inside the **dist/** folder.

---

#### Step 2: Copy Build to ASP.NET `wwwroot`

```powershell
Copy-Item -Recurse "path/to/dist/your-app-name/*" -Destination "path/to/wwwroot/" -Force
```

---

#### Step 3: Run Backend

```powershell
dotnet run
```

The application will run at:

```
https://localhost:7210
```

The Angular frontend will be automatically served by ASP.NET Core.


---

**API Documentation:**
https://claysys-training.onrender.com/swagger/index.html

---

##  Usage Guide

### For Users

#### Register Account
1. Click **"Register"**
2. Enter **Name, Email, and Password**
3. Submit the form to create your account

---

#### Login
1. Enter your **Email** and **Password**
2. Click **"Login"** to access the application

---

#### Take Quiz
1. Select a **course**
2. Answer **5 questions** (15 seconds per question)
3. View **instant feedback** after each answer
4. See your **final score and percentage**

---

#### View Results
- View your **personal quiz history**
- See **score breakdown**
- Option to **retry the quiz**

---

#### Leaderboard
- View **rankings by course**
- **Search by username**
- See your **personal rank**

---

#### Theme Toggle
- Click the **Sun / Moon icon**
- Switch between **Light Mode** and **Dark Mode**

---

###  For Admins

#### Login as Admin


---

#### Dashboard
- View **application statistics**
  - Total Questions
  - Registered Users
  - Quiz Scores
- Access **quick action buttons**

---

#### Manage Questions
- View **all questions**
- **Add new questions**
- **Edit existing questions**
- **Delete questions**
- **Filter questions by course**

---

#### Leaderboard Management
- View **all quiz results**
- **Filter results by course**
- **Search users by username**
- **Edit user scores**
- **Delete quiz results**

---

## Quick Links

-  **Live App:** [Open Quiz Application](https://claysys-training.onrender.com/)
-  **API Docs:** [Swagger Documentation](https://claysys-training.onrender.com/swagger/index.html)
-  **GitHub:** [View Repository](https://github.com/yourusername/Quiz-App-ASP)

