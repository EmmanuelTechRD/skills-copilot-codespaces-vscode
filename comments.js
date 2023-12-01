// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Import model
const { Comment } = require('./models');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    Comment.findAll().then(comments => res.json(comments));
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    Comment.findOne({ where: { id: req.params.id } }).then(comment => res.json(comment));
});

// Create new comment
app.post('/comments', (req, res) => {
    Comment.create(req.body).then(comment => res.json(comment));
});

// Update comment by id
app.put('/comments/:id', (req, res) => {
    Comment.update(req.body, { where: { id: req.params.id } }).then(comment => res.json(comment));
});

// Delete comment by id
app.delete('/comments/:id', (req, res) => {
    Comment.destroy({ where: { id: req.params.id } }).then(comment => res.json(comment));
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}...`));