import express from 'express'
import cookieParser from 'cookie-parser'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'



const app = express()

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())


// Get Bugs
app.get('/api/bug', (req, res) => {
  const filterBy = {
    title: req.query.title || '',
    desc: req.query.desc || '',
    labels: req.query.labels || '',
    severity: +req.query.severity || 0,
    pageIdx: req.query.pageIdx
  }

  const allowedSortFields = ['title', 'severity', 'createdAt']
  const sortBy = allowedSortFields.includes(req.query.sortBy) ? req.query.sortBy : 'createdAt'
  const sortOrder = req.query.sortOrder

  bugService.query(filterBy, { sortBy, sortOrder })
    .then(bugs => res.send(bugs))
    .catch(err => {
      loggerService.error('Cannot get bugs', err)
      res.status(404).send('Cannot get bugs')
    })
})

// Add Bug (Create) changed from GET to POST
app.post('/api/bug', (req, res) => {

  const bugToSave = {
    title: req.body.title,
    desc: req.body.desc,
    severity: req.body.severity,
    labels: req.body.labels || ''
  }
  console.log('app.post  bugToSave:', bugToSave)

  bugService.save(bugToSave)
    .then(bug => res.send(bug))
    .catch(err => {
      loggerService.error('Cannot save bug', err)
      res.status(400).send('Cannot save bug')
    })
})

// Edit bug 
app.put('/api/bug/', (req, res) => {
  const bugToSave = {
    title: req.body.title,
    desc: req.body.desc,
    severity: req.body.severity,
    _id: req.body._id
  }

  bugService.save(bugToSave)
    .then(bug => res.send(bug))
    .catch(err => {
      loggerService.error('Cannot save bug', err)
      res.status(400).send('Cannot save bug')
    })
  // bugService.getById(bugId)
  //   .then(bug => {
  //     handleCookies(req, res, bug)
  //   })
  //   .catch(err => {
  //     loggerService.error('Cannot get bug', err)
  //     res.status(400).send('Cannot get bug')
  //   })
})

// Get Bug (READ)
app.get('/api/bug/:id', (req, res) => {
  const bugId = req.params.id
  bugService.getById(bugId)
    .then(bug => {
      handleCookies(req, res, bug)
      res.send(bug)
    })
    .catch(err => {
      loggerService.error('Cannot get bug', err)
      res.status(400).send('Cannot get bug')
    })
})

// Remove Bug (DELETE)

app.delete('/api/bug/:id/', (req, res) => {
  const bugId = req.params.id
  bugService.remove(bugId)
    .then(() => {
      res.send(bugId)
      loggerService.info(`Bug ${bugId} removed`)
    })
    .catch(err => {
      loggerService.error('Cannot remove bug', err)
      res.status(400).send('Cannot remove bug')
    })

})

function handleCookies(req, res, bug) {

  const {bugId } = req.params
  const {visitCountMap = []} = req.cookies
  if(visitCountMap >= 3) return res.status(401).send('Wait for a bit')

  let visitedBugs = req.cookies.visitedBugs ? JSON.parse(req.cookies.visitedBugs) : []

  const idIdx = visitedBugs.indexOf(bug._id)

  if(visitedBugs.length >= 3) return res.status(401).send('Wait for a bit')

  if (idIdx === -1) {
    visitedBugs.push(bug._id)
    visitedBugs = JSON.stringify(visitedBugs)
    res.cookie('visitedBugs', visitedBugs, {maxAge: 7000})
  }
  res.send(bug)
}
// app.get('/', )


const port = 3030
app.listen(port, () => loggerService.info(`Server listening on port http://127.0.0.1:${port}/`))