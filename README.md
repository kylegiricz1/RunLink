# 🏃 RunLink

> A community-based running platform that helps runners discover, create, and join group runs using location-based features.

RunLink connects runners by making it easy to find nearby group runs, organize training sessions, and build a running community. Users can create upcoming runs, explore available events on an interactive map, and join other runners based on location and interest.

Built with the MERN stack, including a custom Express backend, MongoDB database, secure authentication, and Google Maps API integration.

---

# 📱 Overview

Finding people to run with can be difficult, especially when training schedules and locations do not align.

RunLink solves this problem by creating a platform where runners can:

- Create group runs
- Discover nearby running events
- Join other runners' workouts
- View run locations through Google Maps
- Build connections within the running community

---

# ✨ Features

## 🗺 Interactive Run Discovery

- View available runs using Google Maps API
- Find group runs based on location
- Explore upcoming running events in your area

## 🏃 Create & Join Runs

Users can:
- Create custom group runs
- Set location, time, and details
- Browse available runs
- Join other runners' sessions

## 🔐 Secure Authentication

Implemented a complete authentication system including:

- User registration
- User login
- Password hashing with bcrypt
- Protected API routes
- User session management

## 🔌 REST API Backend

Built a custom Express API to handle:

- User authentication
- Run creation
- Run discovery
- Joining/leaving runs
- Database communication

---

# 🏗 Architecture

```
                 React Frontend
                       |
                       |
                 Express REST API
                       |
          ---------------------------
          |                         |
       MongoDB                 Google Maps API
          |
      User + Run Data
```

---

# 🛠 Tech Stack

## Frontend
- React.js
- JavaScript
- HTML/CSS

## Backend
- Node.js
- Express.js
- REST APIs
- bcrypt authentication

## Database
- MongoDB
- Mongoose

## APIs & Services
- Google Maps API

## Development Tools
- Git/GitHub
- Postman
- VS Code

---

# 🔐 Authentication Flow

RunLink uses secure authentication practices:

1. User creates an account
2. Password is encrypted using bcrypt
3. User credentials are stored securely
4. Login requests validate credentials through the Express API
5. Protected routes verify authenticated users

---

# 🚀 Getting Started

## Prerequisites

- Node.js
- MongoDB
- Google Maps API Key

---


# Backend Setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_secret"
GOOGLE_MAPS_API_KEY="your_api_key"
```

Start backend:

```bash
npm start
```

---

# Frontend Setup

```bash
cd client

npm install

npm start
```

---

# 📸 Screenshots

_Add screenshots here_

Recommended screenshots:

- Run discovery map
- Create run page
- Run details page
- User profile/dashboard

---

# 🔮 Future Improvements

- Real-time messaging between runners
- Run reminders and notifications
- Training groups and communities
- Route creation and elevation tracking
- User ratings and runner profiles
- Mobile application version

---

# 👨‍💻 Author

**Kyle Giricz**

Computer Science & Mathematics Student  
Saint Louis University

GitHub: https://github.com/kylegiricz1  
LinkedIn: https://linkedin.com/in/kylegiricz

---

## License

This project is currently for educational and portfolio purposes.
