# Dhaka University IT Society Dashboard

> A comprehensive web-based management system for Dhaka University IT Society. Built with modern full-stack technologies to manage events, achievements, notices, gallery, and organizational content.

**Version:** 1.0.0  
**Last Updated:** December 2024  
**License:** MIT

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Dashboard Features](#dashboard-features)
- [Frontend Pages](#frontend-pages)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

---

## Overview

The **Dhaka University IT Society Dashboard** is a full-stack web application designed to streamline the management of organizational activities, content, and communications for the IT Society. The platform provides both public-facing content and an administrative dashboard for managing society operations.

### Key Benefits

- **Centralized Content Management:** Single platform for all organizational content
- **Event Tracking:** Comprehensive event management with details and scheduling
- **Achievement Showcase:** Display accomplishments and milestones
- **Gallery Management:** Organize and showcase photos and media
- **Notice Board:** Keep members informed with the latest announcements
- **Admin Dashboard:** Powerful CRUD operations for all content types

---

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **ORM:** Sequelize or Raw SQL

### Frontend & Dashboard
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **UI Components:** Tailwind UI

### Development Tools
- **Package Manager:** npm / yarn
- **Version Control:** Git
- **Environment Management:** dotenv

---

## Features

### Public Features
- ✅ View upcoming events
- ✅ Browse society achievements
- ✅ Read important notices
- ✅ Explore photo gallery
- ✅ Learn about the society

### Admin Dashboard Features
- ✅ **Full CRUD Operations** for all content types
- ✅ **Event Management:** Create, read, update, delete events with details
- ✅ **Achievement Management:** Add and manage society accomplishments
- ✅ **Notice Management:** Post and manage organizational notices
- ✅ **Gallery Management:** Upload and organize photos
- ✅ **Dashboard Analytics:** Overview of all content
- ✅ **User Authentication:** Secure login with JWT tokens

---

## Project Structure

```
DU-IT-Society-Dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── eventController.js
│   │   │   ├── achievementController.js
│   │   │   ├── noticeController.js
│   │   │   ├── galleryController.js
│   │   │   └── authController.js
│   │   ├── models/
│   │   │   ├── Event.js
│   │   │   ├── Achievement.js
│   │   │   ├── Notice.js
│   │   │   ├── Gallery.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── eventRoutes.js
│   │   │   ├── achievementRoutes.js
│   │   │   ├── noticeRoutes.js
│   │   │   ├── galleryRoutes.js
│   │   │   └── authRoutes.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorHandler.js
│   │   ├── utils/
│   │   │   └── validators.js
│   │   └── app.js
│   ├── .env.example
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── dashboard/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.js
│   │   │   ├── events/
│   │   │   ├── achievements/
│   │   │   ├── notices/
│   │   │   ├── gallery/
│   │   │   └── settings/
│   │   ├── components/
│   │   │   ├── Sidebar.js
│   │   │   ├── Navbar.js
│   │   │   └── ContentTable.js
│   │   ├── api/
│   │   │   └── client.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   └── utils/
│   │       └── helpers.js
│   ├── public/
│   ├── .env.local.example
│   ├── package.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── index.js (Home)
    │   │   ├── events.js
    │   │   ├── achievements.js
    │   │   ├── notices.js
    │   │   ├── gallery.js
    │   │   └── about.js
    │   ├── components/
    │   │   ├── Navigation.js
    │   │   ├── Footer.js
    │   │   └── EventCard.js
    │   ├── api/
    │   │   └── client.js
    │   ├── styles/
    │   │   └── globals.css
    │   └── utils/
    │       └── helpers.js
    ├── public/
    ├── .env.local.example
    ├── package.json
    ├── tailwind.config.js
    ├── next.config.js
    └── README.md

```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/dippal513/DUITS_FULLSTACK.git
cd frontend
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 3. Install Dashboard Dependencies

```bash
cd ../dashboard
npm install
```

#### 4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Configuration

#### Backend Configuration

1. **Create environment file:**

```bash
cd backend
cp .env.example .env
```

2. **Configure `.env` file:**

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5433
DB_NAME= add your db name
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=*****
JWT_EXPIRE=7d

# API
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
DASHBOARD_URL=http://localhost:3001

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_EXTENSIONS=.jpg,.jpeg,.png,.gif,.pdf
```

3. **Setup PostgreSQL Database:**

```bash
# Create database
createdb duits

# Run migrations (if using migration tool)
npm run migrate
```

#### Dashboard Configuration

1. **Create environment file:**

```bash
cd dashboard
cp .env.local.example .env.local
```

2. **Configure `.env.local` file:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=DU IT Society Dashboard
```

#### Frontend Configuration

1. **Create environment file:**

```bash
cd frontend
cp .env.local.example .env.local
```

2. **Configure `.env.local` file:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=DU IT Society
```

---

## Running the Application

### Development Mode

#### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

#### Terminal 2 - Dashboard

```bash
cd dashboard
npm run dev
```

Dashboard will run on `http://localhost:3001`

#### Terminal 3 - Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

### Production Build

#### Backend
```bash
cd backend
npm run build
npm start
```

#### Dashboard
```bash
cd dashboard
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm start
```

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Endpoints

#### Events

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/events` | Get all events | No |
| GET | `/events/:id` | Get event by ID | No |
| POST | `/events` | Create new event | Yes |
| PUT | `/events/:id` | Update event | Yes |
| DELETE | `/events/:id` | Delete event | Yes |

#### Achievements

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/achievements` | Get all achievements | No |
| GET | `/achievements/:id` | Get achievement by ID | No |
| POST | `/achievements` | Create achievement | Yes |
| PUT | `/achievements/:id` | Update achievement | Yes |
| DELETE | `/achievements/:id` | Delete achievement | Yes |

#### Notices

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/notices` | Get all notices | No |
| GET | `/notices/:id` | Get notice by ID | No |
| POST | `/notices` | Create notice | Yes |
| PUT | `/notices/:id` | Update notice | Yes |
| DELETE | `/notices/:id` | Delete notice | Yes |

#### Gallery

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/gallery` | Get all gallery items | No |
| GET | `/gallery/:id` | Get gallery item by ID | No |
| POST | `/gallery` | Upload new image | Yes |
| PUT | `/gallery/:id` | Update gallery item | Yes |
| DELETE | `/gallery/:id` | Delete gallery item | Yes |

#### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new admin |
| POST | `/auth/login` | Admin login |
| POST | `/auth/refresh` | Refresh JWT token |
| POST | `/auth/logout` | Logout admin |

### Example Requests

#### Get All Events
```bash
curl -X GET http://localhost:5000/api/v1/events
```

#### Create New Event (Protected)
```bash
curl -X POST http://localhost:5000/api/v1/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Tech Workshop",
    "description": "Learn web development",
    "date": "2024-12-15",
    "time": "14:00",
    "location": "Lab 101"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_password"
  }'
```

---

## Database Schema

### Events Table
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  location VARCHAR(255),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);
```

### Achievements Table
```sql
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  category VARCHAR(100),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);
```

### Notices Table
```sql
CREATE TABLE notices (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  priority VARCHAR(50) DEFAULT 'normal',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);
```

### Gallery Table
```sql
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);
```

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);
```

---

## Dashboard Features

### Home/Dashboard
- Overview of all content statistics
- Quick links to manage content
- Recent activities timeline

### Events Management
- Create, read, update, delete events
- Set event date, time, location
- Upload event poster/images
- Publish/unpublish events

### Achievements Management
- Add new achievements
- Categorize achievements
- Upload achievement images
- Edit and delete achievements

### Notices Management
- Create and publish notices
- Set priority levels (Urgent, Normal, Low)
- Edit notice content
- Delete outdated notices

### Gallery Management
- Upload images to gallery
- Organize by categories
- Add titles and descriptions
- Delete images

### Settings
- Update admin profile
- Change password
- Manage permissions
- System settings

---

## Frontend Pages

### Navigation Menu Items

1. **Home** (`/`)
   - Welcome section
   - Featured events
   - Latest achievements
   - Recent notices preview

2. **Events** (`/events`)
   - All events listing
   - Event details modal
   - Upcoming events calendar view
   - Event search and filter

3. **Achievements** (`/achievements`)
   - All achievements gallery
   - Achievement categories
   - Achievement timeline

4. **Notices** (`/notices`)
   - All announcements
   - Urgent notices highlight
   - Notice archive

5. **Gallery** (`/gallery`)
   - Photo gallery
   - Category filter
   - Image lightbox view

6. **About Us** (`/about`)
   - Society information
   - Team members
   - Contact information

---

## Development Guide

### Code Standards

#### Backend (Express.js)
- Follow RESTful API conventions
- Use async/await for asynchronous operations
- Implement proper error handling
- Add validation for all inputs
- Use middleware for authentication and validation

#### Frontend (Next.js)
- Functional components with hooks
- PropTypes for type checking
- Reusable component structure
- Proper error boundaries
- Loading and error states

#### Styling
- Use Tailwind utility classes
- Follow mobile-first approach
- Maintain consistent spacing and typography
- Use design tokens from Tailwind config

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/feature-name

# Create pull request on GitHub
```

### Adding New Content Type

1. **Create Backend Model** (backend/src/models)
2. **Create Backend Controller** (backend/src/controllers)
3. **Create Backend Routes** (backend/src/routes)
4. **Create Frontend Pages** (frontend/src/pages)
5. **Create Dashboard CRUD Pages** (dashboard/src/pages)
6. **Update Navigation** in both frontend and dashboard

---

## Deployment

### Backend Deployment (Heroku/Railway/Render)

```bash
# Build for production
npm run build

# Set environment variables
# DATABASE_URL, JWT_SECRET, etc.

# Deploy using platform CLI
heroku push
# or
railway up
# or
render deploy
```

### Frontend & Dashboard Deployment (Vercel/Netlify)

```bash
# Vercel
vercel deploy --prod

# Netlify
netlify deploy --prod
```

### Database Deployment
- Use managed PostgreSQL service (AWS RDS, Railway, Render, etc.)
- Backup regularly
- Monitor performance and logs

---

### Code Review Process
- All PRs require at least one approval
- Tests must pass before merging
- Follow project coding standards
- Update documentation as needed

---

\

### Project Maintainers
- **Email:** duits.official@gmail.com
- **GitHub:** [Dhaka University IT Society](https://github.com/DipPal513/DUITS_FULLSTACK.gitdu-it-society)
- **Website:** [du-it-society.edu.bd](https://duitsbd.org)

### Report Issues
- Mail to - dip.pal.513@gmail.com
---

## Changelog

### Version 1.0.0 (December 2024)
- Initial release
- Event management system
- Achievement tracking
- Notice board
- Gallery management
- Admin dashboard with full CRUD operations

---

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [JWT Authentication Guide](https://jwt.io/introduction)

---

**Last Updated:** December 2024  
**Maintained by:** Dhaka University IT Society Development Team