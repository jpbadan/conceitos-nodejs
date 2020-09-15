const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
// const { v4: uuid } = require('uuid');

const repositories = []; // Functions as a basic DB

const app = express();

app.use(express.json());
app.use(cors());

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body; // Gets data
  const repository = {id: uuid(), title, url, techs, likes: 0}; // Format data

  repositories.push(repository); // Feed to DB

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const {id} = request.params; 

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({error: "id not found"});
  }

  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].techs = techs;

  return response.status(200).json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({error: "id not found"});
  }

  repositories.splice(repositoryIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params; 

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
    return response.status(400).json({error: "id not found"});
  }

  repositories[repositoryIndex].likes += 1;

  return response.status(202).send();
});

module.exports = app;
