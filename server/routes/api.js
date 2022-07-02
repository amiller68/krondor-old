const express = require('express');
const router = express.Router();

const { allowLocalEdits } = require('../middleware/auth');
const query = require('../helpers/mongoQuery');

/* Middlewares */

const auth = allowLocalEdits;

/* Get Methods */

router.get('/projects', (req, res) => {
  console.log("Projects requested.")
  query("projects", "Projects", req.method).then(result => {
    res.json(result);
  });
});

router.get('/tags', (req, res) => {
  console.log("Tags requested.")
  query("tags", "Tags", req.method).then(result => {
    res.json(result);
  });
})

/* Post Methods */

router.post('/projects', auth, (req, res) => {
  let newProject = req.body;
  query("projects", "Projects", req.method, newProject).then(result => {
    res.json({
      data: newProject
    })
  });
});

/* Put Methods */

router.put('/projects', auth, (req, res) => {
  let newProject = req.body;
  query("projects", "Projects", req.method, newProject).then(result => {
    res.json({
      data: newProject
    })
  });
});

/* Delete Methods */

router.delete('/projects/:id', auth, (req, res) => {
  let id = req.params.id;
  query("projects", "Projects", req.method, {_id: id}).then(result => {
    console.log("Project deleted: ", id);
    res.send();
  });
});

module.exports = router;
