import Qualification from '../models/qualification.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => {
  const qualification = new Qualification(req.body)
  try {
    await qualification.save()
    return res.status(201).json(qualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find()
    res.status(200).json(qualifications)
  } catch (err) {
    return res.status(500).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const qualificationByID = async (req, res, next, id) => {
  try {
    const qualification = await Qualification.findById(id)
    if (!qualification) return res.status(404).json({ error: 'Qualification not found' })
    req.qualification = qualification
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Invalid qualification ID' })
  }
}

const read = (req, res) => {
  return res.status(200).json(req.qualification)
}

const update = async (req, res) => {
  try {
    let qualification = req.qualification
    qualification = extend(qualification, req.body)
    await qualification.save()
    res.status(200).json(qualification)
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const remove = async (req, res) => {
  try {
    const qualification = req.qualification
    await qualification.deleteOne()
    res.status(200).json({ message: 'Qualification deleted successfully', qualification })
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({})
    res.status(200).json({ message: 'All qualifications deleted successfully', deletedCount: result.deletedCount })
  } catch (err) {
    return res.status(500).json({ error: errorHandler.getErrorMessage(err) })
  }
}

export default { create, list, qualificationByID, read, update, remove, removeAll }