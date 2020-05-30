const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function verifyIndexExistence(request, response, next) {
  const { id } = request.params;

  const index = repositories.findIndex(rep => rep.id === id);

  if(index < 0) {
    return response.status(400).json();
  }

  request.index = index;

  return next();
}

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const rep = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(rep);

  return response.json(rep);
});

app.put("/repositories/:id", verifyIndexExistence, (request, response) => {
  const { 
    index, 
    params: { id }, 
    body: { title, url, techs }  
  } = request;

  const newRep = {
    id,
    title,
    url,
    techs,
    likes: repositories[index].likes
  }

  repositories[index] = newRep;

  return response.json(newRep);

});

app.delete("/repositories/:id", verifyIndexExistence, (request, response) => {
  const { index } = request;

  repositories.splice(index,1);

  return response.status(204).json();

});

app.post("/repositories/:id/like", verifyIndexExistence, (request, response) => {
  const { index } = request;

  repositories[index].likes += 1;

  return response.json(repositories[index]);

});

module.exports = app;
