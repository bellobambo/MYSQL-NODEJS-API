import express from "express";

const app = express();

app.use(express.json());

import { getNote, getNotes, createNote, updateNote , deleteNote } from "./db.js";

app.get('/', async (req, res) =>{
  res.json({
    "message": "Welcome! Simple & Free MySql CRUD API",
    "contactEmail": "bellobambo21@gmail.com",
    "githubLink": "https://github.com/bellobambo/MYSQL-NODEJS-API"
  })
})

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.send(note);
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const note = await createNote(title, content);
  res.status(201).send(note);
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const result = await deleteNote(id);
  res.send(result);
});

app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;
  const note = await updateNote(id, title, contents);
  res.send(note);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something went Wrong");
});

app.listen(8080, () => {
  console.log("Server is running on Port 8080");
});
