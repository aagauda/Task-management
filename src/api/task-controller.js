const { UserService } = require("../services");
const router = require("express").Router();

module.exports = () => {
  const service = new UserService();

  // add task
  router.post("/", async (req, res, next) => {
    try {
      const { email, subject, deadline, status } = req.body;
      // get the users
      const user = await service.getUser(email);
      if (!user) return res.status(404).json({
        error: "user not found"
      });
      const newTask = {
        subject: subject,
        deadline: new Date(deadline),
        status: status,
      }
      // push the new task in the tasks array
      user.tasks.push(newTask);
      await user.save();
      return res.status(200).json(newTask);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  });

  // edit task
  router.put("/:taskId", async (req, res, next) => {
    try {
      const { email, subject, deadline, status } = req.body;

      const { taskId } = req.params;
      const user = await service.getUser(email);
      if (!user) return res.status(404).json({
        error: "user not found"
      });
      const task = user.tasks.id(taskId);
      if (!task) return res.status(404).json({ error: 'task not found' })

      task.subject = subject;
      task.deadline = deadline;
      task.status = status;

      await user.save();
      return res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  });

  // get all tasks
  router.get("/", async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await service.getUser(email);
      if (!user) return res.status(404).json({
        error: "user not found"
      });

      let tasks = user.tasks;
      if (tasks.length == 0) return res.status(404).json({ error: 'no task found' });
      // reteruning the not delted tasks
      tasks = user.tasks.filter(task => task.deleted == false)
        .map(tasks => (
          {
            ...tasks.toObject(),
            subtasks: tasks.subtasks.filter(subtask => subtask.deleted == false)
          }
        ));
      return res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }





  });

  // delete task
  router.delete("/:taskId", async (req, res, next) => {
    try {
      const { email } = req.body;
      const { taskId } = req.params;
      const user = await service.getUser(email);
      if (!user) return res.status(404).json({
        error: "user not found"
      });
      const task = user.tasks.id(taskId);
      if (!task) return res.status(404).json({ error: 'task not found' })

      task.deleted = true;

      await user.save();
      return res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  });

  // ****subtasks section

  // add sub tasks
  router.post("/:taskId/subtasks", async (req, res, next) => {
    try {
      const { email, subject, deadline, status } = req.body;
      const { taskId } = req.params;
      const user = await service.getUser(email);
      if (!user) return res.status(404).json({
        error: "user not found"
      });
      const task = user.tasks.id(taskId);
      if (!task) return res.status(404).json({ error: 'task not found' })

      const newSubTask = {
        subject: subject,
        deadline: new Date(deadline),
        status: status,
      }

      // push the new task in the tasks array
      task.subtasks.push(newSubTask);
      await user.save();
      return res.status(200).json(newSubTask);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  });

  // update subtasks
  router.put("/:taskId/subtasks", async (req, res, next) => {
    try {
      const { email,subtasks } = req.body;
      const { taskId } = req.params;
      const user = await service.getUser(email);
      if (!user) return res.status(404).json({
        error: "user not found"
      });
      const task = user.tasks.id(taskId);
      if (!task) return res.status(404).json({ error: 'task not found' });


      // ignoring all the subtask deleted in hte req.body so filterd all false delted
      const filteredSubtasks = subtasks.filter(subtask => subtask.deleted==false);

      // matchign the id of subtassks and
      task.subtasks = task.subtasks.map(subtask => {
        const updatedSubtask = filteredSubtasks.find(st => st._id == subtask._id);
        return updatedSubtask ? { ...subtask, ...updatedSubtask } : subtask;
      });

      await user.save();
      return res.status(200).json(task);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  });

  // list all subtask for a task
  router.get("/:taskId/subtasks", async (req, res, next) => {
    try {
      const { email} = req.body;
      const { taskId } = req.params;
      const user = await service.getUser(email);
      if (!user) return res.status(404).json({
        error: "user not found"
      });
      const task = user.tasks.id(taskId);
      if (!task) return res.status(404).json({ error: 'task not found' })

      // get all the subtasks which are not deleted {false}
      const subtasks = task.subtasks.filter(subtask => subtask.deleted==false)
      return res.status(200).json(subtasks);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  });




  return router;
};
