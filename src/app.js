const express = require("express")
const cors = require("cors")

const { uuid } = require("uuidv4")

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get("/repositories", (request, response) => {
  return response.json(repositories)
})

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const newRepository = {
    id: uuid(),
    likes: 0,
    title,
    url,
    techs,
  }

  repositories.push(newRepository)

  return response.status(201).json(newRepository)
})

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository doesn\'t exist!' })
  }

  const currentRepository = repositories[repoIndex]

  const editedRepository = {
    ...currentRepository,
    title: title ? title : currentRepository.title,
    url: url ? url : currentRepository.url,
    techs: techs ? techs : currentRepository.techs,
  }

  repositories[repoIndex] = editedRepository

  return response.json(editedRepository)
})

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository doesn\'t exist!' })
  }

  repositories.splice(repoIndex, 1)

  return response.status(204).send()
})

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository doesn\'t exist!' })
  }

  const currentRepository = repositories[repoIndex]

  const editedRepository = {
    ...currentRepository,
    likes: currentRepository.likes + 1,
  }

  repositories[repoIndex] = editedRepository

  return response.json(editedRepository)
})

module.exports = app
