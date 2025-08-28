const express = require("express");
const router = express.Router();
const Task = require('../models/Task');
// const multer = require("multer");

// Get all tasks for a user
router.get('/', async(req, res) =>{
    try{
        const tasks = await Task.find().sort({createdAt:-1});
        res.json(tasks);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Create a new Task
router.post('/', async (req, res) => {
    try{
    const {text, category} =req.body;
    const task = new Task({ text, category});
    const newTask = await task.save();
    res.status(201).json(newTask);
    } catch(err){
        res.status(400).json({message: err.message});
    }
});

// Update task(text, completed, category,dueDate)
router.put('/:id', async(req, res) => {
   try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns updated task
    );
    res.json(task);
  }  catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Delete a Task
router.delete('/:id', async(req, res) =>{
    try {
        const task =await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message : "Task not found"});

        await Task.deleteOne({_id: req.params.id});
        res.json({message: "Task deleted"});
    } catch (err){
        res.status(500).json({message: err.message});
    }
})
//ADD or update due date
router.put("/:id/dueDate", async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {dueDate: req.body.dueDate},
            {new: true}
        );
        res.json(task);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

//Add comment
router.put("/:id/comments", async(req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        task.comments.push(req.body.comment);
        await task.save();
        res.json(task);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});

//Delete comment
router.delete("/:id/comments/:commentsIndex", async (req, res)  => {
    try{
        const task = await Task.findById(req.params.id);
        task.comments.splice(req.params.commentsIndex, 1);
        await task.save();
        res.json(task);
    } catch (err){
        res.status(500).json({error:err.message});
    }
});
module.exports = router;

// Update/Add Due Date
router.put("/:id/dueDate", async (req, res) => {
  try {
    const { dueDate } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { dueDate },
      { new: true }
    );
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete Due Date
router.delete("/:id/dueDate", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $unset: { dueDate: "" } },
      { new: true }
    );
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//file upload
// const upload = multer({ dest: "uploads/" }); // Folder for uploaded files

// router.post("/:id/attachment", upload.single("attachment"), async (req, res) => {
//   try {
//     // Here you can store file info in DB & return its URL
//     const fileUrl = `/uploads/${req.file.filename}`;
//     // Update the task in DB with fileUrl
//     // await Task.findByIdAndUpdate(req.params.id, { attachment: fileUrl });

//     res.json({ fileUrl });
//   } catch (err) {
//     res.status(500).json({ error: "Upload failed" });
//   }
// });
