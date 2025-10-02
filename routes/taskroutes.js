import express from "express";
import { body } from "express-validator";
import { 
  getAllTasks,
  adminDeleteTask,
  deleteTask,
  updateTask,
  getTask,
  getTasks,
  createTask 
} from "../controllers/taskcontroller.js";
import { authenticate, authorizee} from "../middleware/authmiddleware.js";

const router = express.Router();

// User routes
router.post('/', authenticate, [body('title').notEmpty().withMessage('Title required')], createTask);
router.get('/', authenticate, getTasks);
router.get('/:id', authenticate, getTask);
router.put('/:id', authenticate, updateTask);
router.delete('/:id', authenticate, deleteTask);

// Admin routes
router.get("/admin/all", authenticate,authorizee, getAllTasks);
router.delete("/admin/:id", authenticate,authorizee, adminDeleteTask);

export default router;
