# ChainTechAssignment

# **ChainTech Task Management App**

This is a Node.js-based Task Management Application with JWT authentication, task creation, task editing, status updates, and task deletion. Users can sign up, log in, and manage their tasks with due dates and statuses. The app uses MongoDB as a database to store users and tasks.

## **Features**

- **User Signup & Login** with hashed passwords.
- **JWT Authentication** for secured task management routes.
- **Create, Edit, Delete Tasks** with due dates set two days from creation.
- **Task Status Update** with restrictions to avoid completing already completed tasks.
- **Task Validation** ensures tasks have non-empty titles.
- Handles edge cases and returns meaningful error messages.

---

## **Installation**

Follow these steps to set up and run the application on your local device:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Imran2909/ChainTechAssignment.git

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
 - Set up MongoDB and configure environment variables in a .env file:
Create a .env file and keep your variable
    ```bash
    MONGO_URL = // Add your mongodb url here   

## API Reference

#### Signup 

```http
  POST /user/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |

#### Login

```http
  GET /user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**.  |
| `password` | `string` | **Required**.  |


#### Post / create a new task

```http
  POST /task/tasks
```
This require 'Authorization' in headers and as its value you have to put a token which you will get after login.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | **Required**.  |
| `descriptiom` | `string` | **Not compulsary**.  |


#### Get all tasks

```http
  GET /task/tasks
```
This require 'Authorization' in headers and as its value you have to put a token which you will get after login.


#### Change task status

```http
  PATCH /task/changeStatus/:id
```
This require 'Authorization' in headers and as its value you have to put a token which you will get after login.


#### Edit task

```http
  PUT /task/tasks/:id
```
This require 'Authorization' in headers and as its value you have to put a token which you will get after login.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | **Not compulsary**.  |
| `descriptiom` | `string` | **Not compulsary**.  |
| `status` | `string` | **Not compulsary**.  |
| `dueDate` | `string` | **Not compulsary**.  |


#### Delete task

```http
  DELETE /task/tasks/:id
```
This require 'Authorization' in headers and as its value you have to put a token which you will get after login.

## **API Documentation**
The API documentation is created on Swagger you can visualize with /api-docs/
 ```bash
    http://localhost:8080/api-docs/
