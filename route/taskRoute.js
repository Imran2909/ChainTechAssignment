const express = require('express');
const User = require('../model/userModel');
const { validateToken } = require('../middleware/authMiddleware');
const moment = require('moment');  // Import moment
const router = express.Router();

// Middleware to validate token
router.use(validateToken);

// Utility function to format due date
const getDueDate = () => {
    const today = new Date();
    const dueDate = new Date(today.setDate(today.getDate() + 2)); // Due date 2 days from now
    const day = String(dueDate.getDate()).padStart(2, '0');
    const month = String(dueDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dueDate.getFullYear();
    return `${day}-${month}-${year}`;
};


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete project
 *               description:
 *                 type: string
 *                 example: Finish the Node.js task management assignment
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *       400:
 *         description: Bad request
 */

router.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    const dueDate = moment().add(2, 'days').toDate(); // Save as Date object (2 days from now)

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Push the new task with generated id, dueDate (as Date object), and default status
        user.tasks.push({ title, description, dueDate, status: 'pending' });
        await user.save();

        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Fetch all tasks for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Complete project
 *                   description:
 *                     type: string
 *                     example: Finish the Node.js task management assignment
 *                   dueDate:
 *                     type: string
 *                     example: 2024-09-17
 *                   status:
 *                     type: string
 *                     example: pending
 *       401:
 *         description: Unauthorized
 */

// Get Tasks Route
router.get('/tasks', async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if tasks array is empty
        if (user.tasks.length === 0) {
            return res.json({ message: 'No tasks found, add a task!' });
        }

        // Return the tasks if not empty
        res.json(user.tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update the status of a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 66e5e32bf7aa9b223bdbd28f
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: completed
 *     responses:
 *       200:
 *         description: Task status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task status updated
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

// Change Status Route
router.patch('/changeStatus/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const task = user.tasks.id(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.status === 'completed') {
            return res.status(400).json({ message: 'Task already completed' });
        }
        task.status = "completed";
        await user.save();
        res.json({ message: 'Task status updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Edit a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 66e5e32bf7aa9b223bdbd28f
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 example: 2024-09-17
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

// Edit Task Route
router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const task = user.tasks.id(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        if (dueDate) task.dueDate = dueDate;

        await user.save();
        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 66e5e32bf7aa9b223bdbd28f
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

// Delete Task Route
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Find the task by its id
        const task = user.tasks.id(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        // Remove the task using pull()
        user.tasks.pull({ _id: id });
        // Save the updated user document
        await user.save();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
