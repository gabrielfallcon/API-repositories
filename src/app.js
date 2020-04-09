const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require('uuidv4')

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query
  
  return response.json(repositories) 
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  let like = 0

  const repositorie = { id: uuid(), title, url, techs, like }

  repositories.push(repositorie)

  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositorieIndex < 0) {
    return response.status(400).json({ erro: 'Is not id from repositories' })
  }

  const repositorie = {
    id,
    title,
    url,
    techs
  }

  repositories[repositorieIndex] = repositorie

  return response.json(repositorie)
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositorieIndex < 0) {
    return response.status(400).json({ erro: 'Is not id from repositories' })
  }

  repositories.splice(repositorieIndex, 1)

  return res.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositorieLike = repositories.findIndex(repo => repo.id === id ? repo.like = repo.like + 1 : -1)

  if (repositorieLike < 0) {
    return response.status(400).json({ erro: 'Is not a user from Id' })
  }

  return response.status(204).send()
});

module.exports = app;
