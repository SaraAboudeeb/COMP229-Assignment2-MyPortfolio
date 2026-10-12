import Project from '../models/project.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => {
  const project = new Project(req.body)
  try {
    await project.save()
    return res.status(201).json(project)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (req, res) => {
  try {
    const projects = await Project.find()
    res.status(200).json(projects)
  } catch (err) {
    return res.status(500).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    req.project = project
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Invalid project ID' })
  }
}

const read = (req, res) => {
  return res.status(200).json(req.project)
}

const update = async (req, res) => {
  try {
    let project = req.project
    project = extend(project, req.body)
    await project.save()
    res.status(200).json(project)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const project = req.project
    await project.deleteOne()
    res.status(200).json({ message: 'Project deleted successfully', project })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({})
    res.status(200).json({ message: 'All projects deleted successfully', deletedCount: result.deletedCount })
  } catch (err) {
    return res.status(500).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, projectByID, read, update, remove, removeAll }