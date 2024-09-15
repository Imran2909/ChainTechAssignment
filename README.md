# ChainTechAssignment

# **ChainTech Task Management App**

This is a Node.js-based Task Management Application with JWT authentication, task creation, task editing, status updates, and task deletion. Users can sign up, log in, and manage their tasks with due dates and statuses. The app uses MongoDB as a database to store users and tasks.

## **Table of Contents**

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
   - [User Routes](#user-routes)
   - [Task Routes](#task-routes)
7. [Error Handling](#error-handling)
8. [Bonus Features](#bonus-features)
9. [Folder Structure](#folder-structure)
10. [Code Implementation](#code-implementation)

---

## **Features**

- **User Signup & Login** with hashed passwords.
- **JWT Authentication** for secured task management routes.
- **Create, Edit, Delete Tasks** with due dates set two days from creation.
- **Task Status Update** with restrictions to avoid completing already completed tasks.
- **Task Validation** ensures tasks have non-empty titles.
- Handles edge cases and returns meaningful error messages.

---

## **Prerequisites**

Before you begin, ensure you have met the following requirements:

- **Node.js** (>= 14.x.x) and **npm** installed on your local machine.
- **MongoDB** installed locally or a cloud MongoDB connection string.
- A text editor or IDE (like Visual Studio Code) for writing and viewing code.

---

## **Installation**

Follow these steps to set up and run the application on your local device:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ChainTechAssignment.git

2. **Navigate to the project directory:**

    ```bash
    cd ChainTechAssignment

3. **Install the dependencies:**

    ```bash
    npm install

4. **Set up MongoDB:**
Ensure MongoDB is running locally or use a cloud-based MongoDB connection string (e.g., MongoDB Atlas).

---

## **Environment Variables**


