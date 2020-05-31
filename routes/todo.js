const express = require("express");
const { body, validateResult, matchedData } = require('express-validator')
const { validateRequest } = require("../libs/request-validator");
const { TODO } = require("../libs/validators")
const { Task } = require("../models/task");

const router = express.Router();

// Create
router.post("/create", ...TODO.Create, validateRequest, (req, res) => {
    const task = new Task(res.locals.data);
    task.save().then((doc) => {
      res.send(doc);
    })//.catch((err)=>{
    //   res.status(503).send({message:"Service unavailable. Try Later"})
    // });
  });

  // read
  router.get("/all", (req, res) => {
  Task.find().then((docs) => {
    res.send(docs)
  }).catch((error) => {
    res.status(503).send({ message: 'Service unavailable. Try Later' });
  })
});

router.get("/one", ...TODO.GetTodo, validateRequest, (req, res) => {
  Task.findById(res.locals.data.id).then((doc) => {
    if(!doc){
      return res.status(404).send({ message: 'Todo not found' })
    }
    res.send(doc);
  }).catch((error) => {
    res.status(503).send({ message: 'Service unavailable. Try Later"'});
  })
})

router.patch("/update/:id",...TODO.UpdateTodo, validateRequest, (req, res)=>{
    Task.findByIdAndUpdate(req.params.id,{
      name: res.locals.data.name.trim(),
      done: res.locals.data.done
    }).then((doc)=>{
      if(!doc){
        return res.status(400).send({message:"Todo  not found"})
      }
      return res.status(200).send(doc)
    }).catch((error)=>{
      return res.status(503).send({message:"Service unavailable. Try Later"})
    })
})

router.delete("/delete/:id",...TODO.DeleteTodo, validateRequest, (req, res)=>{
  Task.findByIdAndDelete(req.params.id).then((doc)=>{
    if(!doc){
      return res.status(400).send({message:"Todo  not found"})
    }
    return res.status(200).send(doc)
  }).catch((error)=>{
    return res.status(503).send({message:"Service unavailable. Try Later"})
  })
})

router.delete("/delete", (req, res)=>{
  Task.deleteMany({}).then((doc)=>{
    if(!doc){
      return res.status(400).send({message:"Todo  not found"})
    }
    return res.status(200).send(doc)
  }).catch((error)=>{
    return res.status(503).send({message:"Service unavailable. Try Later"})
  })
})

exports.TodoRouter = router;
