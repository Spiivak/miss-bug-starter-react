// import axius from 'axios'

const BASE_URL = '/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter,
    getDefaultSort
}

// Get from server
function query(filterBy, sortBy) {
    const sortFilterBy = { ...filterBy, ...sortBy}
    return axios.get(BASE_URL, { params: sortFilterBy }).then((res) => res.data)
}

// Get by id from server
function getById(bugId) {
    return axios.get(BASE_URL + bugId).then((res) => res.data)
}

// Remove from server
function remove(bugId) {
    return axios.delete(BASE_URL + bugId).then((res) => res.data)
}

// Save to server
function save(bug) {
    if (bug._id) {
        return axios.put(BASE_URL, bug).then((res) => res.data)
    } else {
        return axios.post(BASE_URL, bug).then((res) => res.data)
    }
}

function getEmptyBug(title = '', desc = '', severity = '', labels = '') {
    return { title, desc, severity, labels }
}

function getDefaultFilter() {
    return { title: '', desc: '', pageIdx: 0, severity: 0, labels: '' }
}

function getDefaultSort() {
    return { sortBy: 'createdAt', sortOrder: 1 }
}
