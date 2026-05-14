# Feature Flag Management System

A small SaaS-like feature flag management system built with **React**, **Node.js**, **Express**, and **MySQL**.

This system supports three roles:

- Super Admin
- Organization Admin
- End User

The system allows a software host to create organizations, organization admins to manage feature flags, and end users to check whether a feature is enabled or disabled for their organization.

---

## Project Overview

This project contains one backend application and three separate frontend applications.

```txt
feature-flag-system/

    backend/
    super-admin-frontend/
    admin-frontend/
    user-frontend/
```
## Tech Stack

    Frontend
        React.js
        Vite
        Axios
        React Router DOM
        Tailwind CSS
    
    Backend
        Node.js
        Express.js
        MySQL
        JWT Authentication
        bcryptjs
        dotenv
        cors

## Applications

1. Super Admin Frontend

Used by the software host.

Features:

    Super Admin login
    Create organizations
    View organization list

2. Admin Frontend

    Used by organization admins.

    Features:

    Admin signup
    Admin login
    Create feature flags
    Enable or disable feature flags
    Update feature flags
    Delete feature flags
    Feature flags are scoped to the admin's organization

3. User Frontend

    Used by end users.

    Features:

    User login
    Enter feature key
    Check whether the feature is enabled or disabled for the user's organization

## Database Design

    Database Design:

        feature_flag_db

## Tables

    organizations:

        CREATE TABLE organizations (
            id INT(11) NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) DEFAULT NULL,
            email VARCHAR(250) NOT NULL,
            phone_no INT(15) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        );

    users:

        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            role ENUM('SUPER_ADMIN', 'ORG_ADMIN', 'END_USER'),
            organization_id INT,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organization_id) REFERENCES organizations(id)
        );

    feature_flags:

        CREATE TABLE feature_flags (
            id INT PRIMARY KEY AUTO_INCREMENT,
            feature_key VARCHAR(255),
            enabled BOOLEAN DEFAULT false,
            organization_id INT,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organization_id) REFERENCES organizations(id)
        );

## Super Admin Credentials

    Super Admin uses static credentials.

        Email: admin@gmail.com
        Password: 123456

## Backend Setup

    Go to backend folder:

        cd backend

    Install dependencies:

        npm install

    If installing manually, use:

        npm install express mysql2 cors dotenv bcryptjs jsonwebtoken
        npm install --save-dev nodemon

    Backend Scripts

        Add these scripts in backend/package.json:

        {
        "scripts": {
            "start": "node server.js",
            "dev": "nodemon server.js"
         }
        }

    Start backend server:

        npm run dev

    Backend runs on:

        http://localhost:5000


## Frontend Setup

    Each frontend app should be installed and run separately.

    Super Admin Frontend

        cd super-admin-frontend
        npm install
        npm run dev

    Admin Frontend
        cd admin-frontend
        npm install
        npm run dev

    User Frontend
        cd user-frontend
        npm install
        npm run dev

## If installing manually, use:

    npm install axios react-router-dom lucide-react react-toastify
    npm install tailwindcss @tailwindcss/vite


