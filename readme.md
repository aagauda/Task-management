
# Task Management Backend API

This project implements a backend API using Express.js and MongoDB to facilitate the management of tasks and subtasks for users within an application. The API allows users to perform CRUD operations (Create, Retrieve, Update, Delete) on tasks and their associated subtasks, while ensuring soft deletion handling and user record separation in the database.

## Features

- Each user has a dedicated record in the database to store their tasks and subtasks.
- All tasks and their corresponding subtasks for a user are saved within the same user record.
-  Records marked for deletion remain intact within the database and are excluded from GET API responses.
- Endpoints for CRUD operations related to tasks accept one task in the request body.
- Endpoints for CRUD operations related to subtasks accept all subtasks in the request body.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aagauda/Task-management.git
   ```

2. Install dependencies:

   ```bash
   cd assesmentTask
   npm install
   ```

3. Set up MongoDB:

   - Update the MongoDB connection URI in the `.env` file .

4. Start the server:

   ```bash
   npm run dev
   ```

---
### Project layout

```
|- src/
|   |
|   |- api/                              // Folder containing Api
|   |- config/                           // Folder contains the environmen variables object
|   |- database/
|   |    |- connection                   // This contains the db connection
|   |    |- models                       // This contains the schema of db
|   |- routes                            // This contains all hte routes
|   |- service/                          // This contains teh services
|   |- index.js                          // This is the server start file
|
|- postmanCollection                     // This contains the postman collection import to use it
|- .gitignore                            // contains the files to ignore on git push
|- .env                                  // Environment file
|- package.json                          // contains all dependencies
```
---

## Endpoints

- **POST /api/user**: Create new user.
- **POST /api/task**: Add a task
- **GET /api/task**: Retrieve all tasks with associated subtasks for a user.
- **PUT /api/task/:taskId**: Update details of the task.
- **DELETE /api/task/:taskId**: Soft delete a task.
- **POST /api/task/:taskId**: Add a subTask
- **GET /api/task/:taskId/subtasks**: Retrieve all non-deleted subtasks for a specific task.
- **PUT /api/task/:taskId/subtasks**: Update the list of subtasks for a task.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or features you'd like to add.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README according to your project's specific details and requirements.