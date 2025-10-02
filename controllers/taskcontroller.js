import Task from "../models/Tasks.js";
import { validationResult } from "express-validator";

// Create Task
export const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { title, description } = req.body;
    const task = new Task({ title, description, owner: req.user._id });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks (user only)
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single task
export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task found", task });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin - Get all tasks
export const getAllTasks = async (req, res) => {
  
  try {
    const tasks = await Task.find().populate('owner','name email role');
   
    res.json({ tasks });
  } catch (err) {
    console.log("fuckc",err)
    
    res.status(500).json({ message: err.message });
  }
};

// Admin - Delete any task
export const adminDeleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted by admin successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
