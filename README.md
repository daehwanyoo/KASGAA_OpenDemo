# KASGAA Platform

<p align="center">
  <img src="app/assets/logo2.png" alt="KASGAA Logo">
</p>

Welcome to the KASGAA! This repository houses a complete solution for managing KASGAA's web and app ecosystem, along with a robust backend API to support the system. Below, you’ll find an overview of the platform, demos, and technical details for each component.

---

## 🌐 Web Platform

<p align="center">
  <img src="demo/KASGAA_WEB_DEMO.gif" alt="Web Demo">
</p>

#### **Interfaces**
1. **Sign In/Sign Up Pages**  
   - **Sign In:**
     - Input fields for email and password.
     - "Remember this device" checkbox aligned to the right of the form.
     - Error and success messages displayed dynamically based on login attempts.
   - **Sign Up:**
     - Input fields for first name, last name, email, password, and password confirmation.
     - "Subscribe to updates and emails" checkbox aligned to the right of the form.
     - Real-time validation for password match.
     - Error and success messages for feedback during registration.

2. **Welcome Section**  
   - Located on the right side of the page.  
   - Displays "Welcome Back" (Sign In) or "Welcome To" (Sign Up).  
   - Includes a logo and a short motivational message or updates.  
   - Optimized for responsive design.

3. **Dashboard**  
   - Centralized navigation menu for key features.  
   - Real-time updates for personalized notifications and events.  
   - Sections for account summary and user activity logs.

4. **Dynamic Notifications**  
   - Highlighted banners for critical updates.  
   - Dismissible pop-ups for announcements.

### Technologies Used
- **Frontend**: React, React Router DOM
- **Styling**: CSS with custom themes
- **Deployment**: GitHub Pages

---

## 📱 Mobile App
<p align="center">
  <img src="demo/KASGAA_APP_DEMO.gif" alt="App Demo">
</p>

#### **Interfaces**
1. **Profile Management**  
   - **Profile Section:**  
     - Displays a profile picture with an "Edit Profile" button below.  
     - Input fields for name, email, birthdate, and phone, pre-filled with user data.  
   - **Language Settings:**  
     - Toggle between English and Korean with immediate visual feedback.  
     - Default language highlighted in blue, with unselected options in black.  
   - **Notification Preferences:**  
     - Switch toggle with "ON/OFF" labels for clarity.  
     - Integrated with backend to save preferences persistently.  

2. **Interactive Dashboard**  
   - Quick access buttons for navigating to various features like Calendar, Digital ID, and Profile.  
   - Icon-based navigation bar at the bottom for seamless transitions.  

3. **Digital ID**  
   - Displays the user’s digital ID card.  
   - Profile picture and name are dynamically fetched from the backend.  
   - Designed for quick verification in a visually appealing format.  

4. **Push Notifications**  
   - Enabled for real-time updates on app events and changes.  
   - Customizable through the profile settings.  

### Technologies Used
- **Frontend**: React Native
- **Navigation**: React Navigation
- **Styling**: React Native StyleSheet
- **State Management**: React Hooks

---

## 🔧 Backend API

The backend API powers the KASGAA platform, handling user authentication, data management, and communication between the app and web platforms.

### Features
- **User Authentication**: Secure login and signup functionality with password hashing (bcrypt).
- **Profile Management**: Endpoints for fetching and updating user data.
- **Event Management**: Supports CRUD operations for events.

### Technologies Used
- **Framework**: Flask
- **Database**: MySQL
- **Security**: Bcrypt for password encryption
- **Deployment**: Local and scalable cloud hosting support

---

## **🔄 Contributors**
- **Daehwan Yoo**: Developer - Coding and development.
- **Jin Yoo**: Designer - Design and user experience.
 
---


## 🚀 Installation and Deployment

### Web Platform
1. Clone the repository and navigate to the `KASGAA_Web` directory:
   ```bash
   git clone https://github.com/<username>/KASGAA_Web.git
   cd KASGAA_Web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

### Mobile App
1. Navigate to the `KASGAA_App` directory and install dependencies:
   ```bash
   cd KASGAA_App
   npm install
   ```
2. Run the app:
   ```bash
   npm start
   ```

### Backend
1. Navigate to the backend directory and set up a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the server:
   ```bash
   python app.py
   ```

---

### Backend
Terminal example:
```bash
 * Running on http://127.0.0.1:5000
```

