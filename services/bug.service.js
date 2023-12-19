import fs from 'fs'
import { utilService } from "./utils.service.js"

const PAGE_SIZE = 3

export const bugService = {
    query,
    getById,
    remove,
    save
}

const bugs = utilService.readJsonFile('./data/bugs.json')


// Load bugs from the database
function query(filterBy, { sortBy, sortOrder }) {
    let bugsToReturn = bugs
    if(filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        bugsToReturn = bugsToReturn.filter(bug => regExp.test(bug.title))
    }

    if(filterBy.desc) {
        const regExp = new RegExp(filterBy.desc, 'i')
        bugsToReturn = bugsToReturn.filter(bug => regExp.test(bug.desc))  
    }

    if(filterBy.severity) {
        bugsToReturn = bugsToReturn.filter(bug => bug.severity >= filterBy.severity)
    }

    if(filterBy.pageIdx !== undefined) {
        const startIdx = filterBy.pageIdx * PAGE_SIZE
        bugsToReturn = bugsToReturn.slice(startIdx, startIdx + PAGE_SIZE)
    }

    // Sorting 
    if (sortBy && sortOrder) {
        bugsToReturn.sort((a, b) => {
            if(a[sortBy] < b[sortBy]) return -1 * sortOrder
            if(a[sortBy] > b[sortBy]) return 1 * sortOrder
            return 0
        })
    }
    return Promise.resolve(bugsToReturn)
}

// Get bug by id
function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    if(!bug) return Promise.reject('Bug does not exist!')

    return Promise.resolve(bug)
}

// Remove bug by id
function remove(bugId) {
    const bugIdx = bugs.findIndex(bug => bug._id === bugId)
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}

// Save bug
function save(bug) {
    if (bug._id) {
        const bugIdx = bugs.findIndex(currBug => currBug._id === bug._id)
        bugs[bugIdx] = bug
    } else {
        bug._id = utilService.makeId()
        bugs.unshift(bug)
    }
    return _saveBugsToFile().then(() => bug)

}

// Private function : Save bugs to file
function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 2)
        fs.writeFile('data/bugs.json', data, (err) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            resolve()
        })
    })
}