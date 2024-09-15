const express = require('express');
const { connection } = require('./config/db');
const userRoute = require('./route/userRoute');
const taskRoute = require('./route/taskRoute');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

// Swagger setup
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'ChainTech Task Management API',
        version: '1.0.0',
        description: 'API documentation for the ChainTech Task Management app',
      },
    },
    apis: ['./route/userRoute.js','./route/taskRoute.js'], // Path to the API docs
  };
  
const specs = swaggerJsdoc(swaggerOptions);

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json()); // For parsing application/json

// Home Route
app.get('/', (req, res) => {
    res.send('Home route');
});

// User Routes
app.use('/user', userRoute); // Routes related to user operations like signup and login

// Task Routes
app.use('/task', taskRoute); // Routes related to task operations

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(8080, async () => {
    try {
        await connection;
        console.log('Connected to database');
    } catch (error) {
        console.error('Failed to connect to database', error);
    }
    console.log('Server running at port 8080');
});
