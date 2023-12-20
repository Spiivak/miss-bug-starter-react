const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilter, sortBy, onSetSort, onAddBug }) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const [sortByToEdit, setSortByToEdit] = useState(sortBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
    onSetSort(sortByToEdit)
  }, [filterByToEdit, sortByToEdit])

  function handleSort({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break;

      case 'checkbox':
        value = target.checked ? -1 : 1
        break

      default:
        break;
    }
    setSortByToEdit(prevSort => {
      return ({ ...prevSort, [field]: value })
    })
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break;

      case 'checkbox':
        value = target.checked
        break

      default:
        break;
    }
    setFilterByToEdit(prevFilter => {
      return ({ ...prevFilter, [field]: value })
    })
  }

  const { title, desc, severity } = filterByToEdit
  return (
    <section className="filter-container">

    <section className="bug-filter flex justify-center align-center">
      <button onClick={onAddBug}>Add Bug</button>
      <form onSubmit={(ev) => ev.preventDefault}>
        <input value={title} onChange={handleChange} type="text" id="title" name="title" placeholder="Search by title" />

        <input value={desc} onChange={handleChange} type="text" id="desc" name="desc" placeholder="Search by description" />

        <input value={severity || ''} onChange={handleChange} type="number" id="severity" name="severity" placeholder="Search by severity"/>

        <select name="sortBy" id="sortby" onChange={handleSort}>
          <option value="createdAt">Created At</option>
          <option value="title">Title</option>
          <option value="severity">Severity</option>
        </select>
        <input type="checkbox" onChange={handleSort} name="sortOrder" id="sortdir" />
      </form>

    </section>
    </section>
  )
}