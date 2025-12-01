# Employee Management App (React + Node.js + MongoDB + Docker)

This project is built as part of COMP3123 – Assignment 2.  
It is a full-stack Employee Management application developed using:

- React (Frontend)
- Node.js + Express (Backend API)
- MongoDB Atlas (Database)
- Docker Compose (Container Orchestration)
- JWT Authentication
- Multer Image Upload
- Axios + Protected Routes

---

## Features Implemented

### Authentication
- User Signup
- User Login
- JWT-based authentication
- Protected frontend routes
- Logout functionality

### Employee Management
- Add Employee (with profile picture upload)
- Edit Employee (with image upload + preview)
- View Employee Details (first name, last name, email, picture)
- Delete Employee
- List Employee Table with:
  - Profile picture thumbnail
  - First name
  - Last name
  - Email
  - Actions (Edit / Delete / View)

### File Upload
- Profile picture upload using Multer
- Static image hosting from backend (`/uploads`)
- Image preview on Create/Edit pages

### MongoDB Integration
- Connected to MongoDB Atlas
- Employee + User collections created automatically

### Docker Support
- **frontend** (React)
- **backend** (Node.js + Express)
- Optional: **mongo-express**
- Database handled through **Atlas**
- Cross-container networking enabled

---

## Project Structure

```
/frontend        → React UI (Axios, JWT, Protected Routes)
/backend         → Node.js API (Express, Multer, JWT, Mongoose)
docker-compose.yml
```

---

## How to Run (Docker)

### Build and start all containers
```sh
docker compose up --build
```

### Access the application
| Service     | URL                          |
|-------------|------------------------------|
| Frontend    | http://localhost:3000        |
| Backend API | http://localhost:3002/api/v1 |

### Stop containers
```sh
docker compose down
```

---

## Backend Environment Variables

```
SERVER_PORT=3002
DB_CONNECTION_STRING=<YOUR_MONGODB_ATLAS_URL>
JWT_SECRET=MY_SECRET_KEY
```

These are injected via `docker-compose.yml`.

---

## API Endpoints

### Authentication
| Method | Endpoint              | Description         |
|--------|------------------------|----------------------|
| POST   | `/user/signup`        | Register a new user |
| POST   | `/user/login`         | Login and get token |

### Employees
| Method | Endpoint                       | Description             |
|--------|---------------------------------|--------------------------|
| GET    | `/emp/employees`                | List all employees      |
| POST   | `/emp/employees`                | Create new employee     |
| GET    | `/emp/employees/:id`            | Get employee by ID      |
| PUT    | `/emp/employees/:id`            | Update employee         |
| DELETE | `/emp/employees/:id`            | Delete employee         |

All employee routes require authorization:
```
Authorization: Bearer <token>
```

---

## Search Functionality (Not Implemented)

The assignment required the ability to search employees by:
- Department
- Position

Although search logic was explored, this functionality is **not included in the final build** due to time constraints and environment issues.

---

## Frontend UI Summary

The React app includes:
- Clean and consistent UI
- Login and Signup pages
- Reusable header with logout button
- Employee list with action buttons
- Add & Edit Employee forms with image preview
- Protected routes preventing unauthorized access

---

## Known Limitations / Future Enhancements

- Search functionality not implemented
- No pagination or sorting
- No role-based access control
- More advanced UI (sidebar, dashboard) could be added

---

## Instructor Notes

This submission includes:
- Working authentication system
- Employee CRUD with image upload
- Clean React UI
- Fully functional backend
- Docker-compose setup
- MongoDB Atlas integration
- This README as documentation

Search functionality was attempted but not completed.

---

## Final Status

This app fulfills the **core assignment requirements**:

✔ Authentication  
✔ Protected routes  
✔ Employee CRUD  
✔ Image uploads  
✔ React frontend + Node backend  
✔ Docker orchestration  
✔ Atlas integration  
✔ Clean UI  

Search functionality is *not* included in the final submission.
