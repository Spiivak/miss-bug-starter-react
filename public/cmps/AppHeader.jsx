const {NavLink} = ReactRouterDOM
const {useEffect} = React

import {UserMsg} from './UserMsg.jsx'

export function AppHeader() {
  useEffect(() => {
    // component did mount when dependancy array is empty
  }, [])

  return (
    <React.Fragment>

    <header className='main-header flex space-between align-center'>
      <h3>Bugs are Forever</h3>
      <nav>
        <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
      <UserMsg />
    </React.Fragment>
  )
}
